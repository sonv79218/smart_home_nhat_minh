import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const serviceAccount = JSON.parse(
  fs.readFileSync(
    new URL("../serviceAccountKey.json", import.meta.url),
    "utf8"
  )
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const collections = [
  "products",
];

/**
 * Clean product data for public export
 * - Remove costPrice (internal use only)
 * - Keep options and variants intact
 */
function cleanProductData(product) {
  const { costPrice, ...rest } = product;
  return rest;
}

async function exportCollection(collectionName) {
  const snapshot = await db.collection(collectionName).get();

  let data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Special handling for products collection
  if (collectionName === "products") {
    data = data.map(cleanProductData);
  }

  // Convert Firestore Timestamps to ISO strings for JSON compatibility
  data = data.map((item) => {
    const cleaned = { ...item };
    for (const key in cleaned) {
      if (
        cleaned[key] &&
        typeof cleaned[key].toDate === "function"
      ) {
        cleaned[key] = cleaned[key].toDate().toISOString();
      }
    }
    return cleaned;
  });

  const outputDir = path.join(__dirname, "../public/data");
  fs.mkdirSync(outputDir, { recursive: true });

  const outputPath = path.join(outputDir, `${collectionName}.json`);

  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf8");

  console.log(`✅ Exported ${collectionName}: ${data.length} items`);
}

async function run() {
  try {
    for (const collectionName of collections) {
      await exportCollection(collectionName);
    }

    console.log("🎉 Backup completed!");
  } catch (error) {
    console.error("❌ Backup failed:", error);
  }
}

run();
