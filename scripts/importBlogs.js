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

const blogs = JSON.parse(
  fs.readFileSync(
    new URL("../public/data/blogs.json", import.meta.url),
    "utf8"
  )
);

function cleanBlog(blog) {
  return {
    ...blog,
    type: "blog",
    status: blog.status || "published",
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };
}

async function importBlogs() {
  try {
    const batch = db.batch();

    blogs.forEach((blog) => {
      const docId = blog.id || blog.slug;
      const ref = db.collection("blogs").doc(docId);

      batch.set(ref, cleanBlog(blog), { merge: true });
    });

    await batch.commit();

    console.log(`✅ Imported ${blogs.length} blogs`);
  } catch (error) {
    console.error("❌ Import blogs failed:", error);
  }
}

importBlogs();