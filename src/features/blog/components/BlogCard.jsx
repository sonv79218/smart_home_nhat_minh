import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { formatDate } from "@/features/blog/services/blogService";

const TYPE_BADGES = {
  solution: "bg-emerald-100 text-emerald-700 border-emerald-200",
  project: "bg-violet-100 text-violet-700 border-violet-200",
  guide: "bg-orange-100 text-orange-700 border-orange-200",
  blog: "bg-slate-100 text-slate-600 border-slate-200",
};

const TYPE_LABELS = {
  solution: "Giai phap",
  project: "Cong trinh",
  guide: "Huong dan",
  blog: "Bai viet",
};

const BlogCard = ({ blog, variant = "default" }) => {
  if (!blog) return null;

  const typeBadge = TYPE_BADGES[blog.type] || TYPE_BADGES.blog;
  const typeLabel = TYPE_LABELS[blog.type] || "Bai viet";
  const getBlogPath = (type, slug) => {
    if (type === "guide") return `/guides/${slug}`;
    if (type === "solution") return `/solutions/${slug}`;
    if (type === "project") return `/projects/${slug}`;
    return `/blogs/${slug}`;
  };
  const blogPath = getBlogPath(blog.type, blog.slug);

  if (variant === "compact") {
    return (
      <Link
        to={blogPath}
        className="group flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
      >
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-16 h-16 rounded-lg object-cover shrink-0"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=60";
          }}
        />
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-bold text-slate-800 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
            {blog.title}
          </h4>
          <p className="mt-1 text-xs text-slate-400 line-clamp-1">{formatDate(blog.createdAt)}</p>
        </div>
      </Link>
    );
  }

  return (
    <article className="group bg-white rounded-[1.5rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80";
          }}
        />

        {/* Type badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border ${typeBadge}`}
          >
            {typeLabel}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 md:p-6">
        {/* Title */}
        <h3 className="text-base md:text-lg font-black text-slate-900 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors flex-none">
          {blog.title}
        </h3>

        {/* Excerpt */}
        <p className="mt-2 text-sm text-slate-500 leading-relaxed line-clamp-2 flex-1">
          {blog.excerpt}
        </p>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Calendar size={12} strokeWidth={2} />
            <span>{formatDate(blog.createdAt)}</span>
          </div>

          <Link
            to={blogPath}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 hover:gap-2.5 transition-all"
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
