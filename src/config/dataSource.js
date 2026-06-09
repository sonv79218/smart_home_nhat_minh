// ============================================
// DATA SOURCE CONFIGURATION
// Control where data is read from for each entity
// Options: "json" | "firebase"
// ============================================

export const DATA_SOURCE = {
  products: "json",   // products.json or Firestore "products" collection
  solutions: "json",  // /data/solutions.json or Firestore blogs (type="solution")
  blogs: "firebase",      // /data/blogs.json or Firestore blogs (type="blog")
  guides: "firebase",     // /data/guides.json or Firestore blogs (type="guide")
  projects : "firebase",    // /data/projects.json or Firestore blogs (type="project")
};
