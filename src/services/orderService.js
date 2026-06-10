import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const ordersRef = collection(db, "orders");

export const createOrder = async (order) => {
  return await addDoc(ordersRef, {
    ...order,
    createdAt: new Date(),
  });
};

export const getOrders = async () => {
  const snapshot = await getDocs(ordersRef);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const updateOrderStatus = async (id, status) => {
  const orderDoc = doc(db, "orders", id);
  return await updateDoc(orderDoc, { status });
};

export const deleteOrder = async (id) => {
  return await deleteDoc(doc(db, "orders", id));
};
