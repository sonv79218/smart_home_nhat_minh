import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Calendar,
  User,
  ArrowLeft,
  Tag,
  Lightbulb,
} from "lucide-react";
import TableOfContents from "@/features/blog/components/TableOfContents";
import BlogContentRenderer from "@/features/blog/components/BlogContentRenderer";
import BlogCard from "@/features/blog/components/BlogCard";
import { getBlogBySlug, getRelatedBlogs, extractHeadings, formatDate } from "@/features/blog/services/blogService";

const TYPE_COLORS = {
  solution: "bg-emerald-100 text-emerald-700 border-emerald-200",
  project: "bg-violet-100 text-violet-700 border-violet-200",
  guide: "bg-orange-100 text-orange-700 border-orange-200",
  blog: "bg-blue-100 text-blue-700 border-blue-200",
};

const TYPE_LABELS = {
  solution: "Giai phap",
  project: "Cong trinh",
  guide: "Huong dan",
  blog: "Bai viet",
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          <p className="text-slate-500 text-sm">Đang tải bài viết...</p>
        </div>
      </div>
    );
  }

  if (notFound || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-5">
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
      </div>
    );
  }

  const catColor = CATEGORY_COLORS[blog.category] || "bg-slate-100 text-slate-600 border-slate-200";
  const headings = extractHeadings(blog.content || blog.contentBlocks || []);
  const getBlogPath = (type) => {
    if (type === "guide") return "/guides";
    if (type === "solution") return "/solutions";
    if (type === "project") return "/projects";
    return "/blogs";
  };
  const getTypeLabel = (type) => {
    if (type === "guide") return "Huong dan";
    if (type === "solution") return "Giai phap";
    if (type === "project") return "Cong trinh";
    return "Tu van";
  };
  const blogListPath = getBlogPath(blog.type);

  return (
    <main className="bg-white min-h-screen">
      {/* ─── Breadcrumb ─── */}
      <div className="border-b border-slate-100 bg-white">
        <div className="w-full max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-5 md:px-8">
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
      <div className="w-full max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-5 md:px-8 py-8 md:py-12">
        <div className="grid lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-8 xl:gap-12 items-start">

          {/* ─── Left: Main Content ─── */}
          <article>
            {/* Type badge */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold border ${
                  TYPE_COLORS[blog.type] || TYPE_COLORS.blog
                }`}
              >
                <Tag size={11} strokeWidth={2.5} />
                {TYPE_LABELS[blog.type] || "Bai viet"}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
              {blog.title}
            </h1>

            {/* Excerpt */}
            <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-6">
              {blog.excerpt}
            </p>

            {/* Author + Date */}
            <div className="flex items-center gap-4 pb-6 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                  <User size={16} className="text-blue-600" />
                </div>
                <span className="text-sm font-semibold text-slate-700">{blog.author}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-slate-400">
                <Calendar size={14} strokeWidth={2} />
                <span>{formatDate(blog.createdAt)}</span>
              </div>
            </div>

            {/* Thumbnail */}
            <div className="rounded-2xl overflow-hidden mb-8 shadow-sm justify-center flex">
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full lg:w-[80%] aspect-[2] object-cover "
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80";
                }}
              />
            </div>

            {/* ─── Mobile TOC ─── */}
            {headings.length > 2 && (
              <div className="lg:hidden mb-8">
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
                Quay lai danh sach {blog.type === "guide" ? "huong dan" : blog.type === "solution" ? "tu van" : blog.type === "project" ? "cong trinh" : "bai viet"}
              </Link>
            </div>
          </article>

          {/* ─── Right: Sidebar ─── */}
          <aside className="hidden lg:flex flex-col gap-6 sticky top-24">

            {/* Table of Contents */}
            {headings.length > 2 && (
              <TableOfContents headings={headings} />
            )}

            {/* CTA Box */}
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 to-blue-500 p-6 shadow-lg shadow-blue-200/50 text-white">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                <Lightbulb size={22} strokeWidth={2} className="text-white" />
              </div>
              <h3 className="text-lg font-black leading-snug mb-2">
                Cần tư vấn giải pháp Smart Home?
              </h3>
              <p className="text-sm text-blue-100 leading-relaxed mb-5">
                Liên hệ Nhật Minh Smart Home để được tư vấn miễn phí thiết bị phù hợp với ngôi nhà của bạn.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 w-full py-3 bg-white text-blue-700 font-bold text-sm rounded-xl hover:bg-blue-50 transition-colors"
              >
                Liên hệ tư vấn ngay
              </Link>
            </div>

          </aside>
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
