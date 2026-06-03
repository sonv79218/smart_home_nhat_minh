// ============================================
// SOLUTION SERVICE
// Read from JSON or Firebase based on DATA_SOURCE config
// ============================================

import { DATA_SOURCE } from "../config/dataSource";
import { generateSlug } from "../constants/productMeta";

// Firebase imports (only used when DATA_SOURCE = "firebase")
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
} from "firebase/firestore";
import { db } from "../firebase";

// ============================================
// JSON DATA HELPERS
// ============================================

const SOLUTIONS_JSON_URL = "/data/solutions.json";

const fetchJsonData = async () => {
  try {
    const response = await fetch(SOLUTIONS_JSON_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("[SolutionService] Error fetching JSON:", error);
    return [];
  }
};

// ============================================
// FIREBASE HELPERS
// ============================================

const solutionsRef = collection(db, "solutions");

// ============================================
// READ OPERATIONS
// ============================================

/**
 * Get all solutions (no filter)
 */
export const getSolutions = async () => {
  if (DATA_SOURCE.solutions === "json") {
    const data = await fetchJsonData();
    return Array.isArray(data) ? data : [];
  }

  // Firebase
  try {
    const q = query(solutionsRef, orderBy("order", "asc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("[SolutionService] getSolutions error:", error);
    return [];
  }
};

/**
 * Get only active solutions, sorted by order
 */
export const getActiveSolutions = async () => {
  const allSolutions = await getSolutions();
  
  return allSolutions
    .filter((s) => s.status === "active")
    .sort((a, b) => (a.order || 0) - (b.order || 0));
};

/**
 * Get solution by ID
 */
export const getSolutionById = async (id) => {
  if (DATA_SOURCE.solutions === "json") {
    const data = await fetchJsonData();
    return data.find((s) => s.id === id) || null;
  }

  // Firebase
  try {
    const docRef = doc(db, "solutions", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error("[SolutionService] getSolutionById error:", error);
    return null;
  }
};

/**
 * Get solution by slug
 */
export const getSolutionBySlug = async (slug) => {
  if (DATA_SOURCE.solutions === "json") {
    const data = await fetchJsonData();
    return data.find((s) => s.slug === slug) || null;
  }

  // Firebase
  try {
    const q = query(solutionsRef, where("slug", "==", slug));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    }
    return null;
  } catch (error) {
    console.error("[SolutionService] getSolutionBySlug error:", error);
    return null;
  }
};

// ============================================
// WRITE OPERATIONS (Firebase Only)
// ============================================

/**
 * Add new solution
 */
export const addSolution = async (data) => {
  if (DATA_SOURCE.solutions === "json") {
    throw new Error(
      "Đang dùng dữ liệu JSON, không thể ghi từ Admin. " +
      "Hãy sửa public/data/solutions.json hoặc chuyển DATA_SOURCE.solutions sang firebase."
    );
  }

  // Firebase
  try {
    const now = new Date();
    const result = await addDoc(solutionsRef, {
      ...data,
      status: data.status || "active",
      order: data.order || 1,
      createdAt: now,
      updatedAt: now,
    });
    return result;
  } catch (error) {
    console.error("[SolutionService] addSolution error:", error);
    throw error;
  }
};

/**
 * Update solution
 */
export const updateSolution = async (id, data) => {
  if (DATA_SOURCE.solutions === "json") {
    throw new Error(
      "Đang dùng dữ liệu JSON, không thể ghi từ Admin. " +
      "Hãy sửa public/data/solutions.json hoặc chuyển DATA_SOURCE.solutions sang firebase."
    );
  }

  // Firebase
  try {
    const solutionDoc = doc(db, "solutions", id);
    await updateDoc(solutionDoc, {
      ...data,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("[SolutionService] updateSolution error:", error);
    throw error;
  }
};

/**
 * Delete solution
 */
export const deleteSolution = async (id) => {
  if (DATA_SOURCE.solutions === "json") {
    throw new Error(
      "Đang dùng dữ liệu JSON, không thể ghi từ Admin. " +
      "Hãy sửa public/data/solutions.json hoặc chuyển DATA_SOURCE.solutions sang firebase."
    );
  }

  // Firebase
  try {
    const solutionDoc = doc(db, "solutions", id);
    await deleteDoc(solutionDoc);
  } catch (error) {
    console.error("[SolutionService] deleteSolution error:", error);
    throw error;
  }
};

/**
 * Toggle solution status
 */
export const toggleSolutionStatus = async (id, currentStatus) => {
  const newStatus = currentStatus === "active" ? "inactive" : "active";
  await updateSolution(id, { status: newStatus });
};
