// ============================================================
// BLOG/GUIDE/PROJECT SERVICE
// Reads from JSON or Firestore blogs collection (by type field)
// Configurable via DATA_SOURCE.blogs, DATA_SOURCE.guides
// All types: blog | guide | project | solution (solutions use solutionService)
// ============================================================
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { DATA_SOURCE } from "../config/dataSource";
import { getActiveSolutions } from "./solutionService";

// ── JSON URLs ────────────────────────────────────────────────
const BLOGS_JSON_URL = "/data/blogs.json";
const GUIDES_JSON_URL = "/data/guides.json";
const PROJECTS_JSON_URL = "/data/projects.json";
const BLOGS_COLLECTION = "blogs";

// ── JSON fetch helpers ───────────────────────────────────────
const fetchJson = async (url) => {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`[blogService] fetchJson failed for ${url}:`, err.message);
    return null;
  }
};

// ── JSON data readers ─────────────────────────────────────────
const readBlogsJson = async () => {
  const data = await fetchJson(BLOGS_JSON_URL);
  return Array.isArray(data) ? data : [];
};

const readGuidesJson = async () => {
  const data = await fetchJson(GUIDES_JSON_URL);
  return Array.isArray(data) ? data : [];
};

const readProjectsJson = async () => {
  const data = await fetchJson(PROJECTS_JSON_URL);
  return Array.isArray(data) ? data : [];
};

// ── Firebase helpers ─────────────────────────────────────────
const blogsRef = collection(db, BLOGS_COLLECTION);

const normalizeFirebaseDoc = (docSnap) => {
  const data = docSnap.data();
  return {
    id: docSnap.id,
    type: data.type || "blog",
    title: data.title || "",
    slug: data.slug || "",
    excerpt: data.excerpt || data.subtitle || "",
    thumbnail: data.thumbnail || data.image || "",
    image: data.thumbnail || data.image || "",
    subtitle: data.excerpt || data.subtitle || "",
    author: data.author || "Nhật Minh Smart Home",
    tags: data.tags || [],
    status: data.status === "published" ? "active" : data.status === "active" ? "active" : data.status,
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
  };
};

// ── Common data processing ────────────────────────────────────
const isPublished = (item) =>
  item.status === "active" || item.status === "published";

const sortByDate = (arr) =>
  [...arr]
    .filter(isPublished)
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
      const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
      return dateB - dateA;
    });

// ── READ OPERATIONS ──────────────────────────────────────────

/**
 * Get all published blogs (type="blog") - used by BlogListPage (/blogs)
 */
export const getBlogs = async () => {
  if (DATA_SOURCE.blogs === "json") {
    const data = await readBlogsJson();
    const blogs = data.map((item) => ({
      ...item,
      type: "blog",
      status: item.status === "active" ? "active" : item.status,
    }));
    return sortByDate(blogs);
  }

  // Firebase
  try {
    const q = query(
      blogsRef,
      where("type", "==", "blog")
      // ,
      // orderBy("createdAt", "desc")
    );
    const snap = await getDocs(q);
    return snap.docs.map(normalizeFirebaseDoc).filter(isPublished);
  } catch (err) {
    console.error("[blogService] getBlogs Firebase error:", err.message);
    return [];
  }
};

/**
 * Get all published guides (type="guide") - used by BlogListPage (/guides)
 */
export const getGuides = async () => {
  if (DATA_SOURCE.guides === "json") {
    const data = await readGuidesJson();
    const guides = data.map((item) => ({
      ...item,
      type: "guide",
      status: item.status === "active" ? "active" : item.status,
    }));
    return sortByDate(guides);
  }

  // Firebase
  try {
    const q = query(
      blogsRef,
      where("type", "==", "guide"),
      // orderBy("createdAt", "desc")
    );
    const snap = await getDocs(q);
    return snap.docs.map(normalizeFirebaseDoc).filter(isPublished);
  } catch (err) {
    console.error("[blogService] getGuides Firebase error:", err.message);
    return [];
  }
};

/**
 * Get all published projects (type="project") - used by BlogListPage (/projects)
 */
export const getProjects = async () => {
  if (DATA_SOURCE.projects === "json") {
    const data = await readProjectsJson();

    return sortByDate(
      data.map((item) => ({
        ...item,
        type: "project",
      }))
    );
  }

  try {
    const q = query(
      blogsRef,
      where("type", "==", "project")
    );

    const snap = await getDocs(q);

    return snap.docs
      .map(normalizeFirebaseDoc)
      .filter(isPublished);

  } catch (err) {
    console.error("[blogService] getProjects Firebase error:", err.message);
    return [];
  }
};

/**
 * Get all posts of any type - used by getAllBlogs alias
 */
export const getAllPosts = async () => {
  const [blogs, guides, projects] = await Promise.all([
    getBlogs(),
    getGuides(),
    getProjects(),
  ]);
  return sortByDate([...blogs, ...guides, ...projects]);
};

/**
 * Get posts by type - used by BlogListPage for type routing
 */
export const getBlogsByType = async (type) => {
  switch (type) {
    case "guide":
      return getGuides();

    case "project":
      return getProjects();

    case "solution":
      return getActiveSolutions();

    case "blog":
      return getBlogs();

    default:
      return getBlogs();
  }
};
/**
 * Get post by slug across all types - used by BlogDetailPage
 */
export const getPostBySlug = async (slug) => {
  if (!slug) return null;

  if (DATA_SOURCE.blogs === "json") {
    const [blogsData, guidesData] = await Promise.all([
      readBlogsJson(),
      readGuidesJson(),
    ]);

    const allData = [
      ...blogsData.map((i) => ({ ...i, type: i.type || "blog" })),
      ...guidesData.map((i) => ({ ...i, type: "guide" })),
    ];

    const found = allData.find((p) => p.slug === slug && isPublished(p));
    return found || null;
  }

  // Firebase: search across all types
  try {
    const q = query(
      blogsRef,
      where("slug", "==", slug),
      where("status", "in", ["published", "active"]),
      limit(1)
    );
    const snap = await getDocs(q);
    if (!snap.empty) {
      const normalized = normalizeFirebaseDoc(snap.docs[0]);
      if (isPublished(normalized)) return normalized;
    }
  } catch (err) {
    console.warn("[blogService] getPostBySlug error:", err.message);
  }
  return null;
};

/**
 * Get post by type and slug - used by type-specific detail pages
 */
export const getPostByTypeAndSlug = async (type, slug) => {
  if (!slug) return null;

  if (DATA_SOURCE.blogs === "json") {
    let data;
    if (type === "guide") {
      data = await readGuidesJson();
      data = data.map((i) => ({ ...i, type: "guide" }));
    } else if (type === "project") {
      data = await readBlogsJson();
      data = data.filter((i) => i.type === "project");
    } else {
      data = await readBlogsJson();
      data = data
        .filter((i) => !i.type || i.type === "blog")
        .map((i) => ({ ...i, type: "blog" }));
    }
    const found = data.find((p) => p.slug === slug && isPublished(p));
    return found || null;
  }

  // Firebase
  try {
    const q = query(
      blogsRef,
      where("type", "==", type),
      where("slug", "==", slug),
      where("status", "in", ["published", "active"]),
      limit(1)
    );
    const snap = await getDocs(q);
    if (!snap.empty) return normalizeFirebaseDoc(snap.docs[0]);
  } catch (err) {
    console.warn(`[blogService] getPostByTypeAndSlug(${type}, ${slug}) error:`, err.message);
  }
  return null;
};

/**
 * Get related posts by type + tag scoring (no category)
 * Priority:
 *   1. Same type
 *   2. Same tags (tag intersection)
 *   3. Newer created/published date
 */
// export const getRelatedPosts = async (currentPost, limitCount = 3) => {
//   const all = await getAllPosts();
//   const currentTags = new Set((currentPost.tags || []).map((t) => t.toLowerCase()));
//   const currentType = currentPost.type;
//   const currentDate = currentPost.publishedAt || currentPost.createdAt || "";

//   const getTagScore = (post) => {
//     if (!currentTags.size) return 0;
//     return (post.tags || [])
//       .map((t) => t.toLowerCase())
//       .filter((t) => currentTags.has(t)).length;
//   };

//   const getDateValue = (post) => {
//     const d = post.publishedAt || post.createdAt || "";
//     return d ? new Date(d).getTime() : 0;
//   };

//   const published = all.filter(
//     (p) => p.id !== currentPost.id && (p.status === "active" || p.status === "published")
//   );

//   const scored = published.map((p) => ({
//     post: p,
//     score:
//       (p.type === currentType ? 100 : 0) +
//       getTagScore(p) * 10 +
//       (getDateValue(p) >= getDateValue(currentPost) ? 1 : 0),
//   }));

//   scored.sort((a, b) => b.score - a.score || getDateValue(b.post) - getDateValue(a.post));

//   return scored.slice(0, limitCount).map((s) => s.post);
// };

// ── BACKWARD-COMPATIBLE ALIASES ──────────────────────────────
export const getRelatedPosts = async (currentPost, limitCount = 3) => {
  const currentType = currentPost.type || "blog";

  const all =
    currentType === "solution"
      ? await getActiveSolutions()
      : await getBlogsByType(currentType);

  const currentTags = new Set(
    (currentPost.tags || []).map((t) => t.toLowerCase())
  );

  const getTagScore = (post) => {
    if (!currentTags.size) return 0;

    return (post.tags || [])
      .map((t) => t.toLowerCase())
      .filter((t) => currentTags.has(t)).length;
  };

  const getDateValue = (post) => {
    const d = post.publishedAt || post.createdAt || "";
    return d ? new Date(d).getTime() : 0;
  };

  return all
    .filter((p) => p.id !== currentPost.id)
    .map((p) => ({
      post: p,
      score: getTagScore(p) * 10 + getDateValue(p) / 1000000000000,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limitCount)
    .map((s) => s.post);
};
export const getAllBlogs = () => getAllPosts();
export const getBlogBySlug = (slug) => getPostBySlug(slug);
export const getRelatedBlogs = (current, limitCount) => getRelatedPosts(current, limitCount);

// ── UTILITY ──────────────────────────────────────────────────

export const extractHeadings = (content) => {
  if (!content || !Array.isArray(content)) return [];
  return content
    .filter((block) => block.type === "heading")
    .map((block, idx) => {
      const id = (block.text || "")
        .toLowerCase()
        .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a")
        .replace(/[èéẹẻẽêềếệểễ]/g, "e")
        .replace(/[ìíịỉĩ]/g, "i")
        .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o")
        .replace(/[ùúụủũưừứựửữ]/g, "u")
        .replace(/[ỳýỵỷỹ]/g, "y")
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
