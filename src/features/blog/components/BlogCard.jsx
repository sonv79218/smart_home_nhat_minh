import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { formatDate } from "@/features/blog/services/blogService";

const TYPE_BADGES = {
  solution: "bg-emerald-50 text-emerald-700 border-emerald-200",
  project: "bg-violet-50 text-violet-700 border-violet-200",
  guide: "bg-orange-50 text-orange-700 border-orange-200",
  blog: "bg-blue-50 text-blue-700 border-blue-200",
};

const TYPE_LABELS = {
  solution: "Giải pháp",
  project: "Công trình",
  guide: "Hướng dẫn",
  blog: "Bài viết",
};

const getBlogPath = (type, slug) => {
  if (type === "guide") return `/guides/${slug}`;
  if (type === "solution") return `/solutions/${slug}`;
  if (type === "project") return `/projects/${slug}`;
  return `/blogs/${slug}`;
};

const BlogCard = ({ blog, variant = "default" }) => {
  if (!blog) return null;

  const typeBadge = TYPE_BADGES[blog.type] || TYPE_BADGES.blog;
  const typeLabel = TYPE_LABELS[blog.type] || "Bài viết";
  const blogPath = getBlogPath(blog.type, blog.slug);

  if (variant === "compact") {
    return (
      <Link
        to={blogPath}
        className="
          group block overflow-hidden bg-white
          border border-slate-200
          hover:border-blue-300
          transition-all duration-300
        "
      >
        <div className="aspect-[4/3] overflow-hidden bg-slate-100">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="
              w-full h-full object-cover
              transition-transform duration-500
              group-hover:scale-105
            "
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=70";
            }}
          />
        </div>

        <div className="p-3">
          <h4
            className="
              text-[15px] leading-6 font-semibold
              text-slate-800
              line-clamp-4
              group-hover:text-blue-600
              transition-colors
            "
          >
            {blog.title}
          </h4>

          <div className="mt-2 flex items-center gap-1.5 text-[12px] text-slate-400">
            <Calendar size={12} />
            <span>{formatDate(blog.createdAt)}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <article
      className="
        group bg-white border border-slate-200 overflow-hidden
        rounded-2xl shadow-sm
        hover:shadow-lg hover:-translate-y-1
        transition-all duration-300 flex flex-col
      "
    >
      <Link to={blogPath} className="block">
        <div className="relative aspect-video overflow-hidden bg-slate-100">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="
              w-full h-full object-cover
              group-hover:scale-105
              transition-transform duration-500
            "
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80";
            }}
          />

          <div className="absolute top-3 left-3">
            <span
              className={`
                inline-flex items-center px-2.5 py-1 rounded-full
                text-[10px] font-bold border
                ${typeBadge}
              `}
            >
              {typeLabel}
            </span>
          </div>
        </div>
      </Link>

      <div className="flex flex-col flex-1 p-5">
        <Link to={blogPath}>
          <h3
            className="
              text-base md:text-lg font-extrabold
              text-slate-900 leading-snug line-clamp-2
              group-hover:text-blue-600 transition-colors
            "
          >
            {blog.title}
          </h3>
        </Link>

        <p className="mt-2 text-sm text-slate-500 leading-relaxed line-clamp-2 flex-1">
          {blog.excerpt}
        </p>

        <div className="mt-5 flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Calendar size={12} strokeWidth={2} />
            <span>{formatDate(blog.createdAt)}</span>
          </div>

          <Link
            to={blogPath}
            className="
              inline-flex items-center gap-1.5
              text-sm font-bold text-blue-600
              hover:text-blue-700 hover:gap-2.5
              transition-all
            "
          >
            Đọc tiếp
            <ArrowRight size={14} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;