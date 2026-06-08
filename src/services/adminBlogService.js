import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  increment,
} from "firebase/firestore";
import { db } from "../firebase";

const COLLECTION = "blogs";
const blogsRef = collection(db, COLLECTION);

// ADMIN: lấy tất cả bài viết
export const getAllAdminBlogs = async () => {
  const q = query(blogsRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
};

// USER: lấy bài đã xuất bản
export const getPublishedBlogs = async () => {
  const q = query(
    blogsRef,
    where("status", "==", "published"),
    orderBy("publishedAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
};

// USER: lấy bài nổi bật / mới nhất
export const getLatestPublishedBlogs = async (limitCount = 6) => {
  const q = query(
    blogsRef,
    where("status", "==", "published"),
    orderBy("publishedAt", "desc"),
    limit(limitCount)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
};

// ADMIN: lấy bài theo ID
export const getBlogById = async (id) => {
  if (!id) return null;

  const ref = doc(db, COLLECTION, id);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...snap.data(),
  };
};

// USER: lấy bài theo slug
export const getBlogBySlug = async (slug) => {
  if (!slug) return null;

  const q = query(
    blogsRef,
    where("slug", "==", slug),
    where("status", "==", "published"),
    limit(1)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  const docSnap = snapshot.docs[0];

  return {
    id: docSnap.id,
    ...docSnap.data(),
  };
};

// ADMIN: tạo bài viết
export const createBlog = async (data) => {
  const isPublished = data.status === "published";

  const payload = {
    title: data.title || "",
    slug: data.slug || "",
    excerpt: data.excerpt || "",
    content: data.content || "",
    thumbnail: data.thumbnail || "",
    category: data.category || "",
    tags: data.tags || [],
    author: data.author || "Nhật Minh Smart Home",
    status: data.status || "draft",
    featured: data.featured || false,
    views: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    publishedAt: isPublished ? serverTimestamp() : null,
  };

  const docRef = await addDoc(blogsRef, payload);
  return docRef.id;
};

// ADMIN: cập nhật bài viết
export const updateBlog = async (id, data) => {
  if (!id) return;

  const ref = doc(db, COLLECTION, id);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    throw new Error("Blog không tồn tại");
  }

  const current = snap.data();
  const updates = {
    ...data,
    updatedAt: serverTimestamp(),
  };

  if (data.status === "published" && current.status !== "published") {
    updates.publishedAt = serverTimestamp();
  }

  if (data.status === "draft") {
    updates.publishedAt = current.publishedAt || null;
  }

  await updateDoc(ref, updates);
};

// ADMIN: xóa bài viết
export const deleteBlog = async (id) => {
  if (!id) return;

  await deleteDoc(doc(db, COLLECTION, id));
};

// ADMIN: bật / tắt xuất bản
export const toggleBlogStatus = async (id, currentStatus) => {
  if (!id) return null;

  const nextStatus = currentStatus === "published" ? "draft" : "published";
  const ref = doc(db, COLLECTION, id);

  const updates = {
    status: nextStatus,
    updatedAt: serverTimestamp(),
  };

  if (nextStatus === "published") {
    updates.publishedAt = serverTimestamp();
  }

  await updateDoc(ref, updates);

  return nextStatus;
};

// ADMIN: kiểm tra slug trùng
export const checkSlugExists = async (slug, excludeId = null) => {
  if (!slug) return false;

  const q = query(blogsRef, where("slug", "==", slug));
  const snapshot = await getDocs(q);

  if (excludeId) {
    return snapshot.docs.some((d) => d.id !== excludeId);
  }

  return !snapshot.empty;
};

// USER: tăng lượt xem
export const increaseBlogView = async (id) => {
  if (!id) return;

  const ref = doc(db, COLLECTION, id);

  await updateDoc(ref, {
    views: increment(1),
  });
};

// USER: lấy bài liên quan
export const getRelatedBlogs = async ({
  category,
  currentBlogId,
  limitCount = 3,
}) => {
  if (!category) return [];

  const q = query(
    blogsRef,
    where("status", "==", "published"),
    where("category", "==", category),
    orderBy("publishedAt", "desc"),
    limit(limitCount + 1)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs
    .map((d) => ({
      id: d.id,
      ...d.data(),
    }))
    .filter((blog) => blog.id !== currentBlogId)
    .slice(0, limitCount);
};