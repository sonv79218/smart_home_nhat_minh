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

const solutions = JSON.parse(
  fs.readFileSync(
    new URL("../public/data/solutions.json", import.meta.url),
    "utf8"
  )
);

function cleanSolution(solution) {
  return {
    ...solution,
    type: "solution",
    status: solution.status || "active",
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };
}

async function importSolutionsToBlogs() {
  try {
    const batch = db.batch();

    solutions.forEach((solution) => {
      const docId = solution.id || solution.slug;
      const ref = db.collection("blogs").doc(docId);

      batch.set(ref, cleanSolution(solution), { merge: true });
    });

    await batch.commit();

    console.log(`✅ Imported ${solutions.length} solutions to blogs collection`);
  } catch (error) {
    console.error("❌ Import failed:", error);
  }
}

importSolutionsToBlogs();