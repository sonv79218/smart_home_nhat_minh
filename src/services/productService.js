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
} from "firebase/firestore";

import { db } from "../firebase";
import {
  generateSlug,
  generateSKU,
  sanitizeProductData,
} from "../constants/productMeta";

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

export const getProducts = async (filters = {}) => {
  let q = productsRef;

  const constraints = [];

  if (filters.status) {
    constraints.push(where("status", "==", filters.status));
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

  q = query(productsRef, ...constraints);

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
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
    console.error("Error getting product:", error);
    return null;
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
    console.error("Error getting product by slug:", error);
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

export const searchProducts = async (searchTerm) => {
  const snapshot = await getDocs(productsRef);
  const allProducts = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const term = searchTerm.toLowerCase();
  return allProducts.filter(
    (p) =>
      p.name?.toLowerCase().includes(term) ||
      p.brand?.toLowerCase().includes(term) ||
      p.category?.toLowerCase().includes(term) ||
      p.tags?.some((tag) => tag.toLowerCase().includes(term))
  );
};

export const getProductsByCategory = async (categoryId, limitCount = 4) => {
  const snapshot = await getDocs(productsRef);
  const allProducts = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return allProducts
    .filter(
      (p) => p.status === "active" && p.category === categoryId
    )
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
    })
    .slice(0, limitCount);
};

export const getFeaturedProducts = async (limitCount = 8) => {
  const snapshot = await getDocs(productsRef);
  const allProducts = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return allProducts
    .filter((p) => p.status === "active")
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
    })
    .slice(0, limitCount);
};