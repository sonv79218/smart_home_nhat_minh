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
  "categories",
  "banners",
  "projects",
  "orders",
];

async function exportCollection(collectionName) {
  const snapshot = await db.collection(collectionName).get();

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

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