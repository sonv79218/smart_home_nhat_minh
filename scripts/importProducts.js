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

const products = JSON.parse(
  fs.readFileSync(
    new URL("../public/data/aqara_products_firestore_import.json", import.meta.url),
    "utf8"
  )
);

async function importProducts() {
  const batchSize = 400;
  let batch = db.batch();
  let count = 0;

  for (const product of products) {
    const { id, ...data } = product;

    const docRef = id
      ? db.collection("products").doc(id)
      : db.collection("products").doc();

    batch.set(docRef, {
      ...data,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    count++;

    if (count % batchSize === 0) {
      await batch.commit();
      batch = db.batch();
      console.log(`Imported ${count} products`);
    }
  }

  await batch.commit();
  console.log(`Done. Imported ${count} products to products collection`);
}

importProducts();