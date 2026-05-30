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

function randomRating() {
  return Number((Math.random() * 0.5 + 4.5).toFixed(1));
}

function randomSold() {
  return Math.floor(Math.random() * 400) + 20;
}

function randomRatingCount() {
  return Math.floor(Math.random() * 200) + 15;
}

function randomStock() {
  return Math.floor(Math.random() * 46) + 20;
}

async function run() {
  const snapshot = await db
    .collection("products")
    .where("brand", "==", "aqara")
    .get();

  if (snapshot.empty) {
    console.log("Không tìm thấy sản phẩm Aqara");
    return;
  }

  let batch = db.batch();
  let count = 0;

  snapshot.forEach((doc) => {
    batch.update(doc.ref, {
      status: "active",

      stock: randomStock(),

      rating: randomRating(),

      sold: randomSold(),

      ratingCount: randomRatingCount(),

      updatedAt:
        admin.firestore.FieldValue.serverTimestamp(),
    });

    count++;
  });

  await batch.commit();

  console.log(
    `✅ Updated ${count} Aqara products`
  );
}

run().catch(console.error);