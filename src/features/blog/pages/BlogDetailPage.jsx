import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Calendar,
  User,
  ArrowLeft,
  Tag,
  Lightbulb,
  Clock,
} from "lucide-react";
import TableOfContents from "@/features/blog/components/TableOfContents";
import BlogContentRenderer from "@/features/blog/components/BlogContentRenderer";
import BlogCard from "@/features/blog/components/BlogCard";
import SidebarBlog from "@/features/blog/components/SidebarBlog";
import { getBlogBySlug, getRelatedBlogs, extractHeadings, formatDate, calculateReadingTime } from "@/features/blog/services/blogService";

const TYPE_COLORS = {
  solution: "bg-emerald-100 text-emerald-700 border-emerald-200",
  project: "bg-violet-100 text-violet-700 border-violet-200",
  guide: "bg-orange-100 text-orange-700 border-orange-200",
  blog: "bg-blue-100 text-blue-700 border-blue-200",
};

const TYPE_LABELS = {
  solution: "Giải pháp",
  project: "Công trình",
  guide: "Hướng dẫn",
  blog: "Bài viết",
};

const CATEGORY_COLORS = {
  "Tư vấn giải pháp":
    "bg-blue-100 text-blue-700 border-blue-200",

  "Kiến thức nhà thông minh":
    "bg-emerald-100 text-emerald-700 border-emerald-200",

  "So sánh thiết bị":
    "bg-amber-100 text-amber-700 border-amber-200",

  "Công trình thực tế":
    "bg-violet-100 text-violet-700 border-violet-200",
};

const BlogDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const data = await getBlogBySlug(slug);
        if (!data) {
          setNotFound(true);
          return;
        }
        setBlog(data);

        const relatedData = await getRelatedBlogs(data, 3);
        setRelated(relatedData);
        setRecentPosts(relatedData);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          <p className="text-slate-500 text-sm">Đang tải bài viết...</p>
        </div>
      </main>
    );
  }

  if (notFound || !blog) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-center px-5 bg-white">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1.5"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>
        <h2 className="text-2xl font-black text-slate-800 mb-2">Không tìm thấy bài viết</h2>
        <p className="text-slate-500 mb-8 max-w-sm">
          Bài viết bạn đang tìm kiếm có thể đã bị xóa hoặc không tồn tại.
        </p>
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors"
        >
          <ArrowLeft size={16} />
          Quay lại danh sách
        </Link>
      </main>
    );
  }

  const catColor = CATEGORY_COLORS[blog.category] || "bg-slate-100 text-slate-600 border-slate-200";
  const headings = extractHeadings(blog.content || blog.contentBlocks || []);
  const readingTime = calculateReadingTime(blog.content || blog.contentBlocks || []);
  const getBlogPath = (type) => {
    if (type === "guide") return "/guides";
    if (type === "solution") return "/solutions";
    if (type === "project") return "/projects";
    return "/blogs";
  };
  const getTypeLabel = (type) => {
    if (type === "guide") return "Hướng dẫn";
    if (type === "solution") return "Giải pháp";
    if (type === "project") return "Công trình";
    return "Bài viết";
  };
  const blogListPath = getBlogPath(blog.type);

  return (
    <main className="bg-white min-h-screen">
      {/* ─── Breadcrumb ─── */}
      <div className="border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <nav className="flex items-center gap-1.5 py-3 text-sm text-slate-500">
            <Link to="/" className="hover:text-primary-600 transition-colors">
              Trang chủ
            </Link>
            <ChevronRight size={13} strokeWidth={2} className="text-slate-300" />
            <Link
              to={blogListPath}
              className="hover:text-primary-600 transition-colors"
            >
              {getTypeLabel(blog.type)}
            </Link>
            <ChevronRight size={13} strokeWidth={2} className="text-slate-300" />
            <span className="text-slate-700 font-medium truncate max-w-[200px] sm:max-w-xs">
              {blog.title}
            </span>
          </nav>
        </div>
      </div>

      {/* ─── Article Layout ─── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-8 xl:gap-10 items-start">

          {/* ─── Left: Main Content ─── */}
          <article>
            {/* Category + Type badge */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {blog.category && (
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${catColor}`}
                >
                  {blog.category}
                </span>
              )}
              <span
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold border ${
                  TYPE_COLORS[blog.type] || TYPE_COLORS.blog
                }`}
              >
                <Tag size={11} strokeWidth={2.5} />
                {TYPE_LABELS[blog.type] || "Bài viết"}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
              {blog.title}
            </h1>

            {/* Excerpt */}
            {blog.excerpt && (
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                {blog.excerpt}
              </p>
            )}

            {/* Author + Date + Reading Time */}
            <div className="flex flex-wrap items-center gap-4 pb-6 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                  <User size={16} className="text-blue-600" />
                </div>
                <span className="text-sm font-semibold text-slate-700">{blog.author || "Nhật Minh Smart Home"}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-slate-400">
                <Calendar size={14} strokeWidth={2} />
                <span>{formatDate(blog.createdAt)}</span>
              </div>
              {readingTime > 0 && (
                <div className="flex items-center gap-1.5 text-sm text-slate-400">
                  <Clock size={14} strokeWidth={2} />
                  <span>{readingTime} phút đọc</span>
                </div>
              )}
            </div>

            {/* Thumbnail full width */}
            <div className="rounded-2xl overflow-hidden mb-8 shadow-sm">
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full aspect-[2] object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80";
                }}
              />
            </div>

            {/* Table of Contents */}
            {headings.length > 2 && (
              <div className="mb-8">
                <TableOfContents headings={headings} />
              </div>
            )}

            {/* Content */}
            <div className="max-w-none">
              <BlogContentRenderer content={blog.content || blog.contentBlocks || []} />
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-10 pt-6 border-t border-slate-100">
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full hover:bg-slate-200 transition-colors cursor-default"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Back link */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <Link
                to={blogListPath}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary-600 transition-colors"
              >
                <ArrowLeft size={15} strokeWidth={2} />
                Quay lại danh sách {getTypeLabel(blog.type).toLowerCase()}
              </Link>
            </div>
          </article>

          {/* ─── Right: Sidebar ─── */}
          <SidebarBlog recentPosts={recentPosts} />
        </div>

        {/* ─── Related Articles ─── */}
        {related.length > 0 && (
          <section className="mt-16 pt-10 border-t border-slate-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-blue-500 rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-slate-900">
                Bài viết liên quan
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((rBlog) => (
                <BlogCard key={rBlog.id} blog={rBlog} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default BlogDetailPage;
