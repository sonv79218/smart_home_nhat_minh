// ============================================
// DATA SOURCE CONFIGURATION
// Control where data is read from
// ============================================

export const DATA_SOURCE = {
  // Options: "json" | "firebase"
  // - "json": Read data from public/data/*.json files
  // - "firebase": Read data from Firestore collections
  products: "json",
  solutions: "firebase",
};
