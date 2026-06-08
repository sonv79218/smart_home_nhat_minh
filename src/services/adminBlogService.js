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

// ── Shared normalizer ──────────────────────────────────────
const normalizeBlogDoc = (docSnap) => {
  const data = docSnap.data();
  return {
    id: docSnap.id,
    type: data.type || "blog",
    title: data.title || "",
    slug: data.slug || "",
    category: data.category || "",
    excerpt: data.excerpt || data.subtitle || "",
    thumbnail: data.thumbnail || data.image || "",
    image: data.thumbnail || data.image || "",
    subtitle: data.excerpt || data.subtitle || "",
    author: data.author || "Nhật Minh Smart Home",
    tags: data.tags || [],
    status: data.status || "draft",
    featured: data.featured || false,
    views: data.views || 0,
    order: data.order || 0,
    relatedProducts: data.relatedProducts || [],
    content: data.content || data.contentBlocks || [],
    createdAt: data.createdAt?._seconds
      ? new Date(data.createdAt._seconds * 1000).toISOString().split("T")[0]
      : data.createdAt instanceof Date
      ? data.createdAt.toISOString().split("T")[0]
      : data.createdAt || "",
    publishedAt: data.publishedAt?._seconds
      ? new Date(data.publishedAt._seconds * 1000).toISOString().split("T")[0]
      : data.publishedAt instanceof Date
      ? data.publishedAt.toISOString().split("T")[0]
      : data.publishedAt || "",
    updatedAt: data.updatedAt?._seconds
      ? new Date(data.updatedAt._seconds * 1000).toISOString().split("T")[0]
      : data.updatedAt || "",
    seoTitle: data.seoTitle || "",
    seoDescription: data.seoDescription || "",
  };
};

// ── ADMIN: lấy tất cả bài viết (all types) ────────────────
export const getAllAdminBlogs = async () => {
  const q = query(blogsRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(normalizeBlogDoc);
};

// ── USER: lấy bài đã xuất bản (all types) ─────────────────
export const getPublishedBlogs = async () => {
  const q = query(
    blogsRef,
    where("status", "==", "published"),
    orderBy("publishedAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(normalizeBlogDoc);
};

// ── USER: lấy bài nổi bật / mới nhất ──────────────────────
export const getLatestPublishedBlogs = async (limitCount = 6) => {
  const q = query(
    blogsRef,
    where("status", "==", "published"),
    orderBy("publishedAt", "desc"),
    limit(limitCount)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(normalizeBlogDoc);
};

// ── ADMIN: lấy bài theo ID ─────────────────────────────────
export const getBlogById = async (id) => {
  if (!id) return null;
  const ref = doc(db, COLLECTION, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return normalizeBlogDoc(snap);
};

// ── USER: lấy bài theo slug (all types) ────────────────────
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
  return normalizeBlogDoc(snapshot.docs[0]);
};

// ── ADMIN: tạo bài viết (preserves type from form) ─────────
export const createBlog = async (data) => {
  const isPublished = data.status === "published";

  const payload = {
    title: data.title || "",
    slug: data.slug || "",
    type: data.type || "blog",
    excerpt: data.excerpt || "",
    content: data.content || "",
    thumbnail: data.thumbnail || "",
    category: data.category || "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    author: data.author || "Nhật Minh Smart Home",
    status: data.status || "draft",
    featured: data.featured || false,
    seoTitle: data.seoTitle || "",
    seoDescription: data.seoDescription || "",
    relatedProducts: Array.isArray(data.relatedProducts) ? data.relatedProducts : [],
    views: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    publishedAt: isPublished ? serverTimestamp() : null,
  };

  const docRef = await addDoc(blogsRef, payload);
  return docRef.id;
};

// ── ADMIN: cập nhật bài viết ───────────────────────────────
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

// ── ADMIN: xóa bài viết ────────────────────────────────────
export const deleteBlog = async (id) => {
  if (!id) return;
  await deleteDoc(doc(db, COLLECTION, id));
};

// ── ADMIN: bật / tắt xuất bản ─────────────────────────────
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

// ── ADMIN: kiểm tra slug trùng ─────────────────────────────
export const checkSlugExists = async (slug, excludeId = null) => {
  if (!slug) return false;

  const q = query(blogsRef, where("slug", "==", slug));
  const snapshot = await getDocs(q);

  if (excludeId) {
    return snapshot.docs.some((d) => d.id !== excludeId);
  }

  return !snapshot.empty;
};

// ── USER: tăng lượt xem ────────────────────────────────────
export const increaseBlogView = async (id) => {
  if (!id) return;
  const ref = doc(db, COLLECTION, id);
  await updateDoc(ref, {
    views: increment(1),
  });
};

// ── USER: lấy bài liên quan ────────────────────────────────
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
    .map(normalizeBlogDoc)
    .filter((blog) => blog.id !== currentBlogId)
    .slice(0, limitCount);
};
