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
  return Math.floor(Math.random() * 96) + 5;
}

function randomRatingCount() {
  return Math.floor(Math.random() * 80) + 10;
}

async function run() {
  const snapshot = await db
    .collection("products")
    .where("brand", "==", "aqara")
    .get();

  const batch = db.batch();

  snapshot.forEach((doc) => {
    batch.update(doc.ref, {
      status: "active",
      rating: randomRating(),
      sold: randomSold(),
      ratingCount: randomRatingCount(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  });

  await batch.commit();

  console.log(`✅ Updated ${snapshot.size} Aqara products`);
}

run();