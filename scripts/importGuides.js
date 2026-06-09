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

const guides = JSON.parse(
  fs.readFileSync(
    new URL("../public/data/guides.json", import.meta.url),
    "utf8"
  )
);

function cleanGuide(guide) {
  return {
    ...guide,
    type: "guide",
    status: guide.status || "published",
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };
}

async function importGuides() {
  try {
    const batch = db.batch();

    guides.forEach((guide) => {
      const docId = guide.id || guide.slug;
      const ref = db.collection("blogs").doc(docId);

      batch.set(ref, cleanGuide(guide), { merge: true });
    });

    await batch.commit();

    console.log(`✅ Imported ${guides.length} guides`);
  } catch (error) {
    console.error("❌ Import guides failed:", error);
  }
}

importGuides();