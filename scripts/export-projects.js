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

function convertFirestoreValues(value) {
  if (value && typeof value.toDate === "function") {
    return value.toDate().toISOString();
  }

  if (Array.isArray(value)) {
    return value.map(convertFirestoreValues);
  }

  if (value && typeof value === "object") {
    const obj = {};
    for (const key in value) {
      obj[key] = convertFirestoreValues(value[key]);
    }
    return obj;
  }

  return value;
}

async function exportProjects() {
  const snapshot = await db
    .collection("blogs")
    .where("type", "==", "project")
    .get();

  let projects = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  projects = projects.map(convertFirestoreValues);

  const outputDir = path.join(__dirname, "../public/data");
  fs.mkdirSync(outputDir, { recursive: true });

  const outputPath = path.join(outputDir, "projects.json");

  fs.writeFileSync(
    outputPath,
    JSON.stringify(projects, null, 2),
    "utf8"
  );

  console.log(`✅ Exported ${projects.length} projects`);
  console.log(`📁 ${outputPath}`);
}

exportProjects().catch((err) => {
  console.error("❌ Export failed:", err);
});