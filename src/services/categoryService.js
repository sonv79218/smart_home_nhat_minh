// ============================================
// CATEGORY SERVICE - JSON-based with Memory Cache
// ============================================

// Memory cache - persists during app session
let categoriesCache = null;
let cachePromise = null;

// ============================================
// FETCH FROM JSON
// ============================================
const fetchCategoriesFromJson = async () => {
  try {
    const response = await fetch("/data/categories.json");
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn("[CategoryService] Failed to fetch categories.json:", error);
    return null;
  }
};

// ============================================
// PUBLIC API
// ============================================

/**
 * Get all categories - reads from JSON with memory cache
 */
export const getCategories = async () => {
  // Return cached data if available
  if (categoriesCache) {
    return categoriesCache;
  }

  // If already fetching, wait for it
  if (cachePromise) {
    return cachePromise;
  }

  // Start fetching
  cachePromise = fetchCategoriesFromJson()
    .then((data) => {
      if (data && Array.isArray(data)) {
        categoriesCache = data;
        // console.log("[CategoryService] Loaded categories from JSON:", data.length);
        return data;
      }
      console.warn("[CategoryService] Invalid categories data, returning empty array");
      return [];
    })
    .catch((error) => {
      console.error("[CategoryService] Error loading categories:", error);
      return [];
    })
    .finally(() => {
      cachePromise = null;
    });

  return cachePromise;
};

/**
 * Get category by ID
 */
export const getCategoryById = async (categoryId) => {
  const categories = await getCategories();
  return categories.find((cat) => cat.id === categoryId) || null;
};

/**
 * Get categories with product count
 */
export const getCategoriesWithProducts = async (products = []) => {
  const categories = await getCategories();

  return categories
    .map((category) => ({
      ...category,
      products: products.filter((p) => p.category === category.id),
      productCount: products.filter((p) => p.category === category.id).length,
    }))
    .filter((category) => category.productCount > 0);
};

/**
 * Clear cache - useful for testing or data refresh
 */
export const clearCategoriesCache = () => {
  categoriesCache = null;
  cachePromise = null;
};

/**
 * Get category name by ID (synchronous helper)
 * Note: Only works after getCategories() has been called
 */
export const getCategoryName = (categoryId) => {
  if (!categoryId) return "";
  if (!categoriesCache) {
    console.warn("[CategoryService] getCategoryName called before categories loaded");
    return categoryId;
  }
  const category = categoriesCache.find((c) => c.id === categoryId);
  return category?.name || categoryId;
};
