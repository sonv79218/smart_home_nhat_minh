import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const bannersRef = collection(db, "banners");

export const getBanners = async () => {
  const snapshot = await getDocs(bannersRef);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
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
