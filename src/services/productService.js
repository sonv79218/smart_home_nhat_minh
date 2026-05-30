import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";

import { db } from "../firebase";
import {
  generateSlug,
  generateSKU,
  sanitizeProductData,
} from "../constants/productMeta";
import { fetchWithFallback, saveCache } from "./fallbackService";

const productsRef = collection(db, "products");

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
// OPTIMIZED: getProducts - Use with filters, always add limit
// ============================================
export const getProducts = async (filters = {}) => {
  const { data, source } = await fetchWithFallback({
    cacheKey: "products",
    firestoreFetch: async () => {
      const constraints = [];

      if (filters.status) {
        constraints.push(where("status", "==", filters.status));
      } else {
        constraints.push(where("status", "==", "active"));
      }

      if (filters.category) {
        constraints.push(where("category", "==", filters.category));
      }

      if (filters.brand) {
        constraints.push(where("brand", "==", filters.brand));
      }

      if (filters.featured) {
        constraints.push(where("featured", "==", true));
      }

      if (filters.bestSeller) {
        constraints.push(where("bestSeller", "==", true));
      }

      if (filters.newProduct) {
        constraints.push(where("newProduct", "==", true));
      }

      constraints.push(orderBy("createdAt", "desc"));

      if (filters.limit) {
        constraints.push(limit(filters.limit));
      }

      const q = query(productsRef, ...constraints);

      const snapshot = await getDocs(q);

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    },
    jsonFile: "products.json",
  });

  return data;
};

// ============================================
// OPTIMIZED: getProductsPaginated - Cursor-based pagination
// ============================================
export const getProductsPaginated = async ({
  category = null,
  brand = null,
  status = "active",
  pageSize = 20,
  lastDoc = null,
} = {}) => {
  const { data, source } = await fetchWithFallback({
    cacheKey: `products_${category}_${brand}_${status}`,
    firestoreFetch: async () => {
      const constraints = [];

      constraints.push(where("status", "==", status));

      if (category) {
        constraints.push(where("category", "==", category));
      }

      if (brand) {
        constraints.push(where("brand", "==", brand));
      }

      constraints.push(orderBy("createdAt", "desc"));

      let q;

      if (lastDoc) {
        q = query(
          productsRef,
          ...constraints,
          startAfter(lastDoc),
          limit(pageSize)
        );
      } else {
        q = query(productsRef, ...constraints, limit(pageSize));
      }

      const snapshot = await getDocs(q);

      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const lastDocument = snapshot.docs[snapshot.docs.length - 1];
      const hasMore = snapshot.docs.length === pageSize;

      return { products, lastDocument, hasMore };
    },
    jsonFile: "products.json",
  });

  // Handle both array and object responses
  if (Array.isArray(data)) {
    return {
      products: data.slice(0, pageSize),
      lastDocument: data.length > pageSize ? data[pageSize - 1] : null,
      hasMore: data.length > pageSize,
    };
  }

  return data || { products: [], lastDocument: null, hasMore: false };
};

// ============================================
// OPTIMIZED: getActiveProducts - Quick fetch for active products
// ============================================
export const getActiveProducts = async (limitCount = 50) => {
  const { data } = await fetchWithFallback({
    cacheKey: "products_active",
    firestoreFetch: async () => {
      const q = query(
        productsRef,
        where("status", "==", "active"),
        orderBy("createdAt", "desc"),
        limit(limitCount)
      );

      const snapshot = await getDocs(q);

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    },
    jsonFile: "products.json",
  });

  return (data || []).slice(0, limitCount);
};

export const getProductById = async (id) => {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      return null;
    }
  } catch (error) {
    console.warn("[Product] Error getting product by ID:", error);
    // Try to get from cache/JSON
    const { data } = await fetchWithFallback({
      cacheKey: "products",
      firestoreFetch: async () => null,
      jsonFile: "products.json",
    });
    return data?.find((p) => p.id === id) || null;
  }
};

export const getProductBySlug = async (slug) => {
  try {
    const q = query(productsRef, where("slug", "==", slug));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data(),
      };
    }
    return null;
  } catch (error) {
    console.warn("[Product] Error getting product by slug:", error);
    return null;
  }
};

export const updateProduct = async (id, updates) => {
  const sanitized = sanitizeProductData(updates);

  if (sanitized.name) {
    sanitized.slug = generateSlug(sanitized.name);
  }

  sanitized.updatedAt = new Date();

  const productDoc = doc(db, "products", id);
  return await updateDoc(productDoc, sanitized);
};

export const deleteProduct = async (id) => {
  return await deleteDoc(doc(db, "products", id));
};

// ============================================
// OPTIMIZED: searchProducts - Filter by name using Firestore
// ============================================
export const searchProducts = async (searchTerm, { pageSize = 20, lastDoc = null } = {}) => {
  if (!searchTerm || searchTerm.trim().length === 0) {
    return { products: [], hasMore: false, lastDocument: null };
  }

  const { data } = await fetchWithFallback({
    cacheKey: "products",
    firestoreFetch: async () => {
      let q;

      if (lastDoc) {
        q = query(
          productsRef,
          where("status", "==", "active"),
          orderBy("name", "asc"),
          startAfter(lastDoc),
          limit(pageSize)
        );
      } else {
        q = query(
          productsRef,
          where("status", "==", "active"),
          orderBy("name", "asc"),
          limit(pageSize)
        );
      }

      const snapshot = await getDocs(q);

      const allProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Client-side filter for search
      const term = searchTerm.toLowerCase();
      const filteredProducts = allProducts.filter(
        (p) =>
          p.name?.toLowerCase().includes(term) ||
          p.brand?.toLowerCase().includes(term) ||
          p.category?.toLowerCase().includes(term) ||
          p.tags?.some((tag) => tag.toLowerCase().includes(term))
      );

      return {
        products: filteredProducts,
        lastDocument: snapshot.docs[snapshot.docs.length - 1],
        hasMore: snapshot.docs.length === pageSize,
      };
    },
    jsonFile: "products.json",
  });

  // Handle array response (from cache/JSON)
  if (Array.isArray(data)) {
    const term = searchTerm.toLowerCase();
    return {
      products: data.filter(
        (p) =>
          p.name?.toLowerCase().includes(term) ||
          p.brand?.toLowerCase().includes(term) ||
          p.category?.toLowerCase().includes(term)
      ),
      hasMore: false,
      lastDocument: null,
    };
  }

  return data || { products: [], hasMore: false, lastDocument: null };
};

// ============================================
// OPTIMIZED: getProductsByCategory - Firestore query
// ============================================
export const getProductsByCategory = async (categoryId, limitCount = 10) => {
  const { data } = await fetchWithFallback({
    cacheKey: `products_category_${categoryId}`,
    firestoreFetch: async () => {
      const q = query(
        productsRef,
        where("status", "==", "active"),
        where("category", "==", categoryId),
        orderBy("createdAt", "desc"),
        limit(limitCount)
      );

      const snapshot = await getDocs(q);

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    },
    jsonFile: "products.json",
  });

  return (data || []).filter((p) => p.category === categoryId).slice(0, limitCount);
};

// ============================================
// OPTIMIZED: getFeaturedProducts - Firestore query
// ============================================
export const getFeaturedProducts = async (limitCount = 8) => {
  const { data } = await fetchWithFallback({
    cacheKey: "products_featured",
    firestoreFetch: async () => {
      const q = query(
        productsRef,
        where("status", "==", "active"),
        where("featured", "==", true),
        orderBy("createdAt", "desc"),
        limit(limitCount)
      );

      const snapshot = await getDocs(q);

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    },
    jsonFile: "products.json",
  });

  return (data || []).filter((p) => p.featured).slice(0, limitCount);
};

// ============================================
// OPTIMIZED: getNewProducts - For "New" products section
// ============================================
export const getNewProducts = async (limitCount = 8) => {
  const { data } = await fetchWithFallback({
    cacheKey: "products_new",
    firestoreFetch: async () => {
      const q = query(
        productsRef,
        where("status", "==", "active"),
        where("newProduct", "==", true),
        orderBy("createdAt", "desc"),
        limit(limitCount)
      );

      const snapshot = await getDocs(q);

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    },
    jsonFile: "products.json",
  });

  return (data || []).filter((p) => p.newProduct).slice(0, limitCount);
};

// ============================================
// OPTIMIZED: getBestSellerProducts - For "Best Seller" section
// ============================================
export const getBestSellerProducts = async (limitCount = 8) => {
  const { data } = await fetchWithFallback({
    cacheKey: "products_bestseller",
    firestoreFetch: async () => {
      const q = query(
        productsRef,
        where("status", "==", "active"),
        where("bestSeller", "==", true),
        orderBy("createdAt", "desc"),
        limit(limitCount)
      );

      const snapshot = await getDocs(q);

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    },
    jsonFile: "products.json",
  });

  return (data || []).filter((p) => p.bestSeller).slice(0, limitCount);
};

// ============================================
// OPTIMIZED: getRelatedProducts - For product detail page
// ============================================
export const getRelatedProducts = async (categoryId, excludeId, limitCount = 5) => {
  const { data } = await fetchWithFallback({
    cacheKey: `products_related_${categoryId}`,
    firestoreFetch: async () => {
      const q = query(
        productsRef,
        where("status", "==", "active"),
        where("category", "==", categoryId),
        orderBy("createdAt", "desc"),
        limit(limitCount + 1)
      );

      const snapshot = await getDocs(q);

      return snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((p) => p.id !== excludeId)
        .slice(0, limitCount);
    },
    jsonFile: "products.json",
  });

  return (data || [])
    .filter((p) => p.category === categoryId && p.id !== excludeId)
    .slice(0, limitCount);
};

// ============================================
// ADMIN: getAllProductsForAdmin - For admin pages
// ============================================
export const getAllProductsForAdmin = async () => {
  const { data } = await fetchWithFallback({
    cacheKey: "products_admin",
    firestoreFetch: async () => {
      const q = query(productsRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    },
    jsonFile: "products.json",
  });

  return data || [];
};

// ============================================
// COUNT: getProductsCount - Get total count
// ============================================
export const getProductsCount = async (filters = {}) => {
  const { data } = await fetchWithFallback({
    cacheKey: `products_count_${filters.category || ""}_${filters.brand || ""}`,
    firestoreFetch: async () => {
      const constraints = [];

      if (filters.status) {
        constraints.push(where("status", "==", filters.status));
      } else {
        constraints.push(where("status", "==", "active"));
      }

      if (filters.category) {
        constraints.push(where("category", "==", filters.category));
      }

      if (filters.brand) {
        constraints.push(where("brand", "==", filters.brand));
      }

      const q = query(productsRef, ...constraints);
      const snapshot = await getDocs(q);

      return snapshot.size;
    },
    jsonFile: "products.json",
  });

  return Array.isArray(data) ? data.length : (data || 0);
};
