import admin from "firebase-admin";
import fs from "fs";

const serviceAccount = JSON.parse(
  fs.readFileSync(
    new URL("../serviceAccountKey.json", import.meta.url),
    "utf8"
  )
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const projects = JSON.parse(
  fs.readFileSync(
    new URL("../public/data/projects.json", import.meta.url),
    "utf8"
  )
);

function cleanProject(project) {
  return {
    ...project,
    type: "project",
    status: project.status || "published",
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };
}

async function importProjects() {
  try {
    const batch = db.batch();

    projects.forEach((project) => {
      const docId = project.id || project.slug;
      const ref = db.collection("blogs").doc(docId);

      batch.set(ref, cleanProject(project), { merge: true });
    });

    await batch.commit();

    console.log(`✅ Imported ${projects.length} projects`);
  } catch (error) {
    console.error("❌ Import projects failed:", error);
  }
}

importProjects();