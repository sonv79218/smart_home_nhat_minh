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
} from "firebase/firestore";
import { db } from "../firebase";
import { fetchWithFallback } from "./fallbackService";

const bannersRef = collection(db, "banners");

// ============================================
// OPTIMIZED: getActiveBanners - Only fetch active banners
// ============================================
export const getActiveBanners = async () => {
  const { data } = await fetchWithFallback({
    cacheKey: "banners_active",
    firestoreFetch: async () => {
      const q = query(
        bannersRef,
        where("isActive", "==", true),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    },
    jsonFile: "banners.json",
  });

  // Filter for active banners from JSON
  if (Array.isArray(data)) {
    return data.filter((b) => b.isActive);
  }

  return data || [];
};

// ============================================
// OPTIMIZED: getAllBanners - For admin page (all banners)
// ============================================
export const getAllBanners = async () => {
  const { data } = await fetchWithFallback({
    cacheKey: "banners_all",
    firestoreFetch: async () => {
      const q = query(bannersRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    },
    jsonFile: "banners.json",
  });

  return data || [];
};

// ============================================
// DEPRECATED: getBanners - Use getActiveBanners or getAllBanners instead
// ============================================
export const getBanners = async () => {
  console.warn("getBanners is deprecated. Use getActiveBanners (homepage) or getAllBanners (admin) instead.");
  return getAllBanners();
};

export const addBanner = async (data) => {
  return await addDoc(bannersRef, {
    ...data,
    createdAt: new Date(),
  });
};

export const updateBanner = async (id, data) => {
  const bannerDoc = doc(db, "banners", id);
  return await updateDoc(bannerDoc, data);
};

export const deleteBanner = async (id) => {
  return await deleteDoc(doc(db, "banners", id));
};
