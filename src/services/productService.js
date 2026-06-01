
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import {
  generateSlug,
  generateSKU,
  sanitizeProductData,
} from "../constants/productMeta";

// ============================================
// CONFIG
// ============================================
const DEBUG_MODE = true;
const PRODUCTS_JSON_URL = "/products.json";

const log = (message, data) => {
  if (DEBUG_MODE) {
    console.log(`[ProductService] ${message}`, data);
  }
};

const productsRef = collection(db, "products");

// ============================================
// JSON HELPERS - USER READ
// ============================================
const readProductsJson = async () => {
  try {
    const response = await fetch(PRODUCTS_JSON_URL, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Không đọc được ${PRODUCTS_JSON_URL}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("[ProductService] readProductsJson error:", error);
    return [];
  }
};

const getCreatedAtTime = (product) => {
  if (!product?.createdAt) return 0;

  if (product.createdAt._seconds) {
    return product.createdAt._seconds;
  }

  if (typeof product.createdAt === "string") {
    return new Date(product.createdAt).getTime();
  }

  return 0;
};

const sortByCreatedAtDesc = (products) => {
  return [...products].sort(
    (a, b) => getCreatedAtTime(b) - getCreatedAtTime(a)
  );
};

const applyProductFilters = (products, filters = {}) => {
  let result = [...products];

  result = result.filter((p) =>
    filters.status ? p.status === filters.status : p.status === "active"
  );

  if (filters.category) {
    result = result.filter((p) => p.category === filters.category);
  }

  if (filters.brand) {
    result = result.filter((p) => p.brand === filters.brand);
  }

  if (filters.featured) {
    result = result.filter((p) => p.featured === true);
  }

  if (filters.bestSeller) {
    result = result.filter((p) => p.bestSeller === true);
  }

  if (filters.newProduct) {
    result = result.filter((p) => p.newProduct === true);
  }

  return sortByCreatedAtDesc(result);
};

// ============================================
// FIREBASE HELPER - ADMIN READ
// ============================================
const executeQuery = async (q) => {
  try {
    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    log("Query executed, documents:", snapshot.size);
    return data;
  } catch (error) {
    console.error("[ProductService] Firestore error:", error);
    return [];
  }
};

// ============================================
// ADMIN: ADD PRODUCT
// ============================================
export const addProduct = async (productData) => {
  const sanitized = sanitizeProductData(productData);

  const slug = sanitized.slug || generateSlug(sanitized.name);
  const sku = sanitized.sku || generateSKU(sanitized.name, sanitized.category);

  const dataToSave = {
    ...sanitized,
    slug,
    sku,
    price: Number(sanitized.price) || 0,
    costPrice: Number(sanitized.costPrice) || 0,
    discountPrice: sanitized.discountPrice
      ? Number(sanitized.discountPrice)
      : 0,
    stock: Number(sanitized.stock) || 0,
    sold: Number(sanitized.sold) || 0,
    minStockAlert: Number(sanitized.minStockAlert) || 5,
    rating: Number(sanitized.rating) || 0,
    ratingCount: Number(sanitized.ratingCount) || 0,
    featured: Boolean(sanitized.featured),
    bestSeller: Boolean(sanitized.bestSeller),
    newProduct: Boolean(sanitized.newProduct),
    status: sanitized.status || "active",
    tags: Array.isArray(sanitized.tags) ? sanitized.tags : [],
    specifications: Array.isArray(sanitized.specifications)
      ? sanitized.specifications
      : [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return await addDoc(productsRef, dataToSave);
};

// ============================================
// USER: GET PRODUCTS FROM JSON
// ============================================
export const getProducts = async (filters = {}) => {
  log("getProducts from JSON:", filters);

  let products = await readProductsJson();
  products = applyProductFilters(products, filters);

  if (filters.limit) {
    products = products.slice(0, Number(filters.limit));
  }

  return products;
};

// ============================================
// USER: GET PRODUCTS PAGINATED FROM JSON
// ============================================
export const getProductsPaginated = async ({
  category = null,
  brand = null,
  status = "active",
  pageSize = 20,
  lastDoc = null,
} = {}) => {
  const products = await getProducts({
    category,
    brand,
    status,
  });

  const startIndex = lastDoc?.index || 0;
  const paginatedProducts = products.slice(startIndex, startIndex + pageSize);

  const nextIndex = startIndex + pageSize;
  const hasMore = nextIndex < products.length;

  return {
    products: paginatedProducts,
    lastDocument: hasMore ? { index: nextIndex } : null,
    hasMore,
  };
};

// ============================================
// USER: GET ACTIVE PRODUCTS FROM JSON
// ============================================
export const getActiveProducts = async (limitCount = 50) => {
  return await getProducts({
    status: "active",
    limit: limitCount,
  });
};

// ============================================
// USER: GET PRODUCT BY ID FROM JSON
// ============================================
export const getProductById = async (id) => {
  const products = await readProductsJson();
  return products.find((p) => p.id === id) || null;
};

// ============================================
// USER: GET PRODUCT BY SLUG FROM JSON
// ============================================
export const getProductBySlug = async (slug) => {
  const products = await readProductsJson();
  return products.find((p) => p.slug === slug) || null;
};

// ============================================
// ADMIN: UPDATE PRODUCT
// ============================================
export const updateProduct = async (id, updates) => {
  const sanitized = sanitizeProductData(updates);

  if (sanitized.name) {
    sanitized.slug = generateSlug(sanitized.name);
  }

  sanitized.updatedAt = new Date();

  const productDoc = doc(db, "products", id);
  return await updateDoc(productDoc, sanitized);
};

// ============================================
// ADMIN: DELETE PRODUCT
// ============================================
export const deleteProduct = async (id) => {
  return await deleteDoc(doc(db, "products", id));
};

// ============================================
// USER: SEARCH PRODUCTS FROM JSON
// ============================================
export const searchProducts = async (
  searchTerm,
  { pageSize = 20, lastDoc = null } = {}
) => {
  if (!searchTerm || searchTerm.trim().length === 0) {
    return {
      products: [],
      hasMore: false,
      lastDocument: null,
    };
  }

  const products = await readProductsJson();
  const term = searchTerm.toLowerCase().trim();

  let filteredProducts = products.filter(
    (p) =>
      p.status === "active" &&
      (p.name?.toLowerCase().includes(term) ||
        p.brand?.toLowerCase().includes(term) ||
        p.category?.toLowerCase().includes(term) ||
        p.shortDescription?.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term) ||
        p.tags?.some((tag) => tag.toLowerCase().includes(term)))
  );

  filteredProducts = sortByCreatedAtDesc(filteredProducts);

  const startIndex = lastDoc?.index || 0;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + pageSize
  );

  const nextIndex = startIndex + pageSize;
  const hasMore = nextIndex < filteredProducts.length;

  return {
    products: paginatedProducts,
    lastDocument: hasMore ? { index: nextIndex } : null,
    hasMore,
  };
};

// ============================================
// USER: GET PRODUCTS BY CATEGORY FROM JSON
// ============================================
export const getProductsByCategory = async (categoryId, limitCount = 10) => {
  return await getProducts({
    category: categoryId,
    status: "active",
    limit: limitCount,
  });
};

// ============================================
// USER: GET FEATURED PRODUCTS FROM JSON
// ============================================
export const getFeaturedProducts = async (limitCount = 8) => {
  const products = await getProducts({
    featured: true,
    status: "active",
    limit: limitCount,
  });

  if (products.length > 0) {
    return products;
  }

  return await getProducts({
    status: "active",
    limit: limitCount,
  });
};

// ============================================
// USER: GET NEW PRODUCTS FROM JSON
// ============================================
export const getNewProducts = async (limitCount = 8) => {
  return await getProducts({
    newProduct: true,
    status: "active",
    limit: limitCount,
  });
};

// ============================================
// USER: GET BEST SELLER PRODUCTS FROM JSON
// ============================================
export const getBestSellerProducts = async (limitCount = 8) => {
  return await getProducts({
    bestSeller: true,
    status: "active",
    limit: limitCount,
  });
};

// ============================================
// USER: GET RELATED PRODUCTS FROM JSON
// ============================================
export const getRelatedProducts = async (
  categoryId,
  excludeId,
  limitCount = 5
) => {
  const products = await getProducts({
    category: categoryId,
    status: "active",
  });

  return products.filter((p) => p.id !== excludeId).slice(0, limitCount);
};

// ============================================
// ADMIN: GET ALL PRODUCTS FROM FIREBASE
// ============================================
export const getAllProductsForAdmin = async () => {
  log("getAllProductsForAdmin from Firebase");

  try {
    const q = query(productsRef, orderBy("createdAt", "desc"));
    return await executeQuery(q);
  } catch (error) {
    console.error("[ProductService] getAllProductsForAdmin error:", error);
    return [];
  }
};

// ============================================
// USER: COUNT PRODUCTS FROM JSON
// ============================================
export const getProductsCount = async (filters = {}) => {
  const products = await getProducts(filters);
  return products.length;
};


export const getProductByIdForAdmin = async (id) => {
  try {
    const productRef = doc(db, "products", id);
    const snapshot = await getDoc(productRef);

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: snapshot.id,
      ...snapshot.data(),
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

