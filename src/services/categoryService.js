// ============================================
// CATEGORY SERVICE - Static Data with Fallback
// ============================================
import { CATEGORIES } from "../constants/productMeta";
import { fetchWithFallback } from "./fallbackService";

// Cache key
const CACHE_KEY = "categories";

// ============================================
// PRIMARY: Static data from constants (no Firestore needed)
// ============================================

export const getCategories = async () => {
  const { data, source } = await fetchWithFallback({
    cacheKey: CACHE_KEY,
    firestoreFetch: async () => {
      // Categories are static, but we can try Firestore if needed
      // For now, return static data
      return CATEGORIES;
    },
    jsonFile: "categories.json",
  });

  // Always prefer static data for categories
  if (source === "none" || source === "firestore" || source === "cache") {
    return { data: CATEGORIES, source: "static" };
  }

  return { data, source };
};

export const getCategoryById = async (categoryId) => {
  const { data } = await getCategories();
  return data.find((cat) => cat.id === categoryId) || null;
};

export const getCategoriesWithProducts = async (products) => {
  const { data } = await getCategories();

  return data
    .map((category) => ({
      ...category,
      products: products.filter((p) => p.category === category.id),
      productCount: products.filter((p) => p.category === category.id).length,
    }))
    .filter((category) => category.productCount > 0);
};
