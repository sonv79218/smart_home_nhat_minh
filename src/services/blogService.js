// ============================================================
// BLOG SERVICE
// Reads from JSON files in public/data/
// Falls back to Firestore blogs collection if JSON unavailable
// ============================================================
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";

const BLOGS_JSON = "/data/blogs.json";
const GUIDES_JSON = "/data/guides.json";
const SOLUTIONS_JSON = "/data/solutions.json";
const COLLECTION = "blogs";

const isPublished = (item) =>
  item.status === "active" || item.status === "published";

const sortByCreatedAt = (arr) =>
  [...arr]
    .filter(isPublished)
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
      const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
      return dateB - dateA;
    });

const fetchJson = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`[blogService] fetchJson failed for ${url}:`, err.message);
    return null;
  }
};

const normalizeBlog = (item) => ({
  ...item,
  type: item.type || "blog",
  status: item.status === "active" ? "published" : item.status,
});

const normalizeBlogSolution = (item) => ({
  ...item,
  image: item.thumbnail || item.image || "",
  subtitle: item.excerpt || item.subtitle || "",
});

export const getBlogs = async () => {
  const data = await fetchJson(BLOGS_JSON);
  if (data && Array.isArray(data)) return sortByCreatedAt(data.map(normalizeBlog));
  return [];
};

export const getGuides = async () => {
  const data = await fetchJson(GUIDES_JSON);
  if (data && Array.isArray(data)) return sortByCreatedAt(data.map((i) => normalizeBlog({ ...i, type: "guide" })));
  return [];
};

export const getSolutions = async () => {
  const data = await fetchJson(SOLUTIONS_JSON);
  if (data && Array.isArray(data)) {
    return sortByCreatedAt(data.map((i) => normalizeBlogSolution(normalizeBlog({ ...i, type: "solution" }))));
  }
  return [];
};

export const getAllPosts = async () => {
  const [blogs, guides, solutions] = await Promise.all([getBlogs(), getGuides(), getSolutions()]);
  return sortByCreatedAt([...blogs, ...guides, ...solutions]);
};

export const getPostBySlug = async (slug) => {
  if (!slug) return null;
  for (const json of [BLOGS_JSON, GUIDES_JSON, SOLUTIONS_JSON]) {
    const data = await fetchJson(json);
    if (data && Array.isArray(data)) {
      const found = data.find((p) => p.slug === slug && isPublished(p));
      if (found) return normalizeBlogSolution(normalizeBlog(found));
    }
  }
  return null;
};

export const getPostByTypeAndSlug = async (type, slug) => {
  if (!slug) return null;
  const jsonMap = { blog: BLOGS_JSON, guide: GUIDES_JSON, solution: SOLUTIONS_JSON };
  const url = jsonMap[type];
  if (!url) return null;
  const data = await fetchJson(url);
  if (data && Array.isArray(data)) {
    const found = data.find((p) => p.slug === slug && isPublished(p));
    return found ? normalizeBlogSolution(normalizeBlog(found)) : null;
  }
  return null;
};

export const getRelatedPosts = async (currentPost, limitCount = 3) => {
  const all = await getAllPosts();
  const related = all.filter(
    (p) =>
      p.id !== currentPost.id &&
      (p.category === currentPost.category || p.type === currentPost.type)
  );
  const sameCat = related.filter((p) => p.category === currentPost.category);
  const sameType = related.filter((p) => p.category !== currentPost.category);
  return [...sameCat, ...sameType].slice(0, limitCount);
};

// ── Backward-compatible aliases ──────────────────────────────────
export const getAllBlogs = () => getAllPosts();
export const getBlogBySlug = (slug) => getPostBySlug(slug);
export const getRelatedBlogs = (current, limitCount) => getRelatedPosts(current, limitCount);

export const getBlogsByType = async (type) => {
  switch (type) {
    case "guide": return getGuides();
    case "solution": return getSolutions();
    case "project": {
      const blogs = await getBlogs();
      return blogs.filter((b) => b.type === "project");
    }
    default: return getBlogs();
  }
};

export const extractHeadings = (content) => {
  if (!content || !Array.isArray(content)) return [];
  return content
    .filter((block) => block.type === "heading")
    .map((block, idx) => {
      const id = (block.text || "")
        .toLowerCase()
        .replace(/[aàáạảãâầấậẩẫăằắặẳẵ]/g, "a")
        .replace(/[eèéẹẻẽêềếệểễ]/g, "e")
        .replace(/[iìíịỉĩ]/g, "i")
        .replace(/[oòóọỏõôồốộổỗơờớợởỡ]/g, "o")
        .replace(/[uùúụủũưừứựửữ]/g, "u")
        .replace(/[yỳýỵỷỹ]/g, "y")
        .replace(/[đ]/g, "d")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 60);
      return { id: `heading-${id}-${idx}`, text: block.text, level: block.level };
    });
};

export const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
