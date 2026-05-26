import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase";

const productsRef = collection(
  db,
  "products"
);

export const addProduct = async (
  product
) => {
  return await addDoc(
    productsRef,
    product
  );
};

export const getProducts = async () => {
  const snapshot = await getDocs(
    productsRef
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const deleteProduct = async (
  id
) => {
  return await deleteDoc(
    doc(db, "products", id)
  );
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
    console.log(error);
    return null;
  }
};