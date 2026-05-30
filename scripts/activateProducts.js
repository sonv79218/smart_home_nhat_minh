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

async function activateProducts() {
  const snapshot = await db
    .collection("products")
    .where("status", "==", "draft")
    .get();

  let batch = db.batch();

  snapshot.docs.forEach((doc) => {
    batch.update(doc.ref, {
      status: "active",
    });
  });

  await batch.commit();

  console.log(
    `✅ Updated ${snapshot.size} products`
  );
}

activateProducts();