// ============================================
// SOLUTION SERVICE
// Reads from blogs collection (type="solution") with fallback
// Writes to blogs collection
// ============================================
import { DATA_SOURCE } from "../config/dataSource";
import { generateSlug } from "../constants/productMeta";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

// Collections
const SOLUTIONS_COLLECTION = "solutions"; // Legacy
const BLOGS_COLLECTION = "blogs";

// ============================================
// JSON HELPERS (legacy fallback)
// ============================================
const SOLUTIONS_JSON_URL = "/data/solutions.json";
const fetchJsonData = async () => {
  try {
    const response = await fetch(SOLUTIONS_JSON_URL);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("[SolutionService] Error fetching JSON:", error);
    return [];
  }
};

// ============================================
// BLOG HELPERS (primary source for type="solution")
// ============================================
const blogsRef = collection(db, BLOGS_COLLECTION);

const normalizeBlogSolution = (docSnap) => {
  const data = docSnap.data();

  return {
    id: docSnap.id,

    title: data.title || "",
    slug: data.slug || "",
    type: data.type || "solution",

    excerpt: data.excerpt || "",
    subtitle: data.excerpt || data.subtitle || "",
    description: data.excerpt || "",

    image: data.thumbnail || data.image || "",
    thumbnail: data.thumbnail || data.image || "",

    author: data.author || "Nhật Minh Smart Home",

    tags: data.tags || [],
    content: data.content || [],
    relatedProducts: data.relatedProducts || [],

    seoTitle: data.seoTitle || "",
    seoDescription: data.seoDescription || "",

    featured: data.featured || false,
    views: data.views || 0,
    order: data.order || 1,

    status:
      data.status === "published"
        ? "active"
        : data.status === "draft"
        ? "inactive"
        : data.status,

    createdAt: data.createdAt || null,
    updatedAt: data.updatedAt || null,
    publishedAt: data.publishedAt || null,
  };
};

const toBlogSolutionPayload = (formData) => ({
  title: formData.title || "",
  slug: formData.slug || generateSlug(formData.title || ""),
  type: "solution",
  excerpt: formData.subtitle || formData.excerpt || formData.description || "",
  thumbnail: formData.image || formData.thumbnail || "",
  category: formData.category || "",
  status: formData.status === "active" ? "published" : formData.status === "inactive" ? "draft" : formData.status,
  featured: formData.featured || false,
  order: formData.order || 1,
  views: 0,
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp(),
});

// ============================================
// READ OPERATIONS
// ============================================

export const getSolutions = async () => {
  if (DATA_SOURCE.solutions === "json") {
    const data = await fetchJsonData();
    return Array.isArray(data) ? data : [];
  }

  try {
    const q = query(
      blogsRef,
      where("type", "==", "solution")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs
      .map(normalizeBlogSolution)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  } catch (err) {
    console.error("[SolutionService] getSolutions blogs error:", err.message);
    return [];
  }
};

export const getActiveSolutions = async () => {
  const all = await getSolutions();
  return all
    .filter((s) => s.status === "active" || s.status === "published")
    .sort((a, b) => (a.order || 0) - (b.order || 0));
};

export const getSolutionById = async (id) => {
  if (DATA_SOURCE.solutions === "json") {
    const data = await fetchJsonData();
    return data.find((s) => s.id === id) || null;
  }

  // Try blogs collection
  try {
    const ref = doc(db, BLOGS_COLLECTION, id);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return normalizeBlogSolution(snap);
    }
  } catch (err) {
    console.warn("[SolutionService] getSolutionById blogs error:", err.message);
  }

  // Fallback: legacy
  try {
    const ref = doc(db, SOLUTIONS_COLLECTION, id);
    const snap = await getDoc(ref);
    if (snap.exists()) return { id: snap.id, ...snap.data() };
  } catch (err) {
    console.error("[SolutionService] getSolutionById legacy error:", err.message);
  }
  return null;
};

export const getSolutionBySlug = async (slug) => {
  if (!slug) return null;

  if (DATA_SOURCE.solutions === "json") {
    const data = await fetchJsonData();
    return data.find((s) => s.slug === slug) || null;
  }

  try {
    const q = query(
      blogsRef,
      where("type", "==", "solution"),
      where("slug", "==", slug)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      return normalizeBlogSolution(snapshot.docs[0]);
    }
  } catch (err) {
    console.error("[SolutionService] getSolutionBySlug blogs error:", err.message);
  }

  return null;
};

// ============================================
// WRITE OPERATIONS (write to blogs collection)
// ============================================

export const addSolution = async (data) => {
  if (DATA_SOURCE.solutions === "json") {
    throw new Error("Dang dung du lieu JSON, khong the ghi. Chuyen DATA_SOURCE.solutions sang firebase.");
  }
  const payload = toBlogSolutionPayload(data);
  const docRef = await addDoc(blogsRef, payload);
  return docRef;
};

export const updateSolution = async (id, data) => {
  if (DATA_SOURCE.solutions === "json") {
    throw new Error("Dang dung du lieu JSON, khong the ghi. Chuyen DATA_SOURCE.solutions sang firebase.");
  }
  const ref = doc(db, BLOGS_COLLECTION, id);
  const updates = toBlogSolutionPayload(data);
  updates.updatedAt = serverTimestamp();
  await updateDoc(ref, updates);
};

export const deleteSolution = async (id) => {
  if (DATA_SOURCE.solutions === "json") {
    throw new Error("Dang dung du lieu JSON, khong the ghi. Chuyen DATA_SOURCE.solutions sang firebase.");
  }
  await deleteDoc(doc(db, BLOGS_COLLECTION, id));
};

export const toggleSolutionStatus = async (id, currentStatus) => {
  const nextStatus = currentStatus === "active" ? "draft" : "published";
  const ref = doc(db, BLOGS_COLLECTION, id);
  await updateDoc(ref, {
    status: nextStatus,
    updatedAt: serverTimestamp(),
  });
  return nextStatus;
};
