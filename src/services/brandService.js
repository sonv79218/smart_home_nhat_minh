// ============================================
// BRAND SERVICE - JSON-based with Memory Cache
// ============================================

// Memory cache - persists during app session
let brandsCache = null;
let cachePromise = null;

// ============================================
// FETCH FROM JSON
// ============================================
const fetchBrandsFromJson = async () => {
  try {
    const response = await fetch("/data/brands.json");
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn("[BrandService] Failed to fetch brands.json:", error);
    return null;
  }
};

// ============================================
// PUBLIC API
// ============================================

/**
 * Get all brands - reads from JSON with memory cache
 */
export const getBrands = async () => {
  // Return cached data if available
  if (brandsCache) {
    return brandsCache;
  }

  // If already fetching, wait for it
  if (cachePromise) {
    return cachePromise;
  }

  // Start fetching
  cachePromise = fetchBrandsFromJson()
    .then((data) => {
      if (data && Array.isArray(data)) {
        brandsCache = data;
        console.log("[BrandService] Loaded brands from JSON:", data.length);
        return data;
      }
      console.warn("[BrandService] Invalid brands data, returning empty array");
      return [];
    })
    .catch((error) => {
      console.error("[BrandService] Error loading brands:", error);
      return [];
    })
    .finally(() => {
      cachePromise = null;
    });

  return cachePromise;
};

/**
 * Get brand by ID
 */
export const getBrandById = async (brandId) => {
  const brands = await getBrands();
  return brands.find((brand) => brand.id === brandId) || null;
};

/**
 * Get brand name by ID (synchronous helper)
 * Note: Only works after getBrands() has been called
 */
export const getBrandName = (brandId) => {
  if (!brandId) return "";
  if (!brandsCache) {
    console.warn("[BrandService] getBrandName called before brands loaded");
    return brandId;
  }
  const brand = brandsCache.find((b) => b.id === brandId);
  return brand?.name || brandId;
};

/**
 * Get category name by ID (synchronous helper)
 * Note: Only works after getCategories() has been called
 */
export const getCategoryName = (categoryId) => {
  if (!categoryId) return "";
  // Import dynamically to avoid circular dependency
  const categories = categoriesCache || [];
  const category = categories.find((c) => c.id === categoryId);
  return category?.name || categoryId;
};

/**
 * Clear cache - useful for testing or data refresh
 */
export const clearBrandsCache = () => {
  brandsCache = null;
  cachePromise = null;
};
