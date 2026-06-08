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

function convertTimestamps(item) {
  const cleaned = { ...item };

  for (const key in cleaned) {
    if (cleaned[key] && typeof cleaned[key].toDate === "function") {
      cleaned[key] = cleaned[key].toDate().toISOString();
    }
  }

  return cleaned;
}

async function exportBlogSolutions() {
  try {
    const snapshot = await db
      .collection("blogs")
      .where("type", "==", "solution")
      .get();

    let solutions = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    solutions = solutions
      .filter(
        (item) =>
          item.status === "active" || item.status === "published"
      )
      .map(convertTimestamps)
      .sort((a, b) => {
        const orderA = a.order ?? 999;
        const orderB = b.order ?? 999;
        return orderA - orderB;
      });

    const outputDir = path.join(__dirname, "../public/data");
    fs.mkdirSync(outputDir, { recursive: true });

    const outputPath = path.join(outputDir, "solutions.json");

    fs.writeFileSync(
      outputPath,
      JSON.stringify(solutions, null, 2),
      "utf8"
    );

    console.log(`✅ Exported blog type=solution: ${solutions.length} items`);
    console.log(`📁 Saved to: ${outputPath}`);
  } catch (error) {
    console.error("❌ Export blog solutions failed:", error);
  }
}

exportBlogSolutions();