
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

const bannersRef = collection(db, "banners");

// ============================================
// GET ACTIVE BANNERS - FIREBASE ONLY
// ============================================
export const getActiveBanners = async () => {
  try {
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
  } catch (error) {
    console.error("[BannerService] getActiveBanners error:", error);
    return [];
  }
};

// ============================================
// GET ALL BANNERS - ADMIN - FIREBASE ONLY
// ============================================
export const getAllBanners = async () => {
  try {
    const q = query(bannersRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("[BannerService] getAllBanners error:", error);
    return [];
  }
};

// ============================================
// GET BANNERS
// ============================================
export const getBanners = async () => {
  return getActiveBanners();
};

// ============================================
// ADD BANNER
// ============================================
export const addBanner = async (data) => {
  return await addDoc(bannersRef, {
    ...data,
    isActive: Boolean(data.isActive),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

// ============================================
// UPDATE BANNER
// ============================================
export const updateBanner = async (id, data) => {
  const bannerDoc = doc(db, "banners", id);

  return await updateDoc(bannerDoc, {
    ...data,
    isActive: Boolean(data.isActive),
    updatedAt: new Date(),
  });
};

// ============================================
// DELETE BANNER
// ============================================
export const deleteBanner = async (id) => {
  return await deleteDoc(doc(db, "banners", id));
};

