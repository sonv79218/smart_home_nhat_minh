import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAllAdminBlogs,
  deleteBlog,
  toggleBlogStatus,
  updateBlog,
} from "../../services/adminBlogService";
import { useToast, useConfirm } from "../../contexts/ToastContext";
import { formatDate } from "../../services/blogService";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Star,
  Eye,
  FileText,
} from "lucide-react";

const STATUS_CONFIG = {
  published: { label: "Xuất bản", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  draft: { label: "Nháp", color: "bg-amber-100 text-amber-700 border-amber-200" },
  hidden: { label: "An", color: "bg-slate-100 text-slate-500 border-slate-200" },
};

const TYPE_CONFIG = {
  solution: { label: "Giai phap", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  guide: { label: "Huong dan", color: "bg-orange-100 text-orange-700 border-orange-200" },
  project: { label: "Cong trinh", color: "bg-violet-100 text-violet-700 border-violet-200" },
  blog: { label: "Bai viet", color: "bg-blue-100 text-blue-700 border-blue-200" },
};

const AdminBlogListPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { confirm } = useConfirm();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await getAllAdminBlogs();
      setBlogs(data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      toast.error("Khong the tai danh sach bai viet.");
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    return blogs.filter((b) => {
      const matchesSearch =
        !searchTerm ||
        b.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "all" || b.status === filterStatus;
      const matchesType = filterType === "all" || b.type === filterType;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [blogs, searchTerm, filterStatus, filterType]);

  const handleDelete = async (blog) => {
    const accepted = await confirm({
      title: "Xoa bai viet",
      message: `Ban co chac muon xoa bai viet "${blog.title}" khong? Hanh dong nay khong the hoan tac.`,
      confirmText: "Xoa bai viet",
      cancelText: "Huy",
    });
    if (!accepted) return;

    try {
      await deleteBlog(blog.id);
      setBlogs((prev) => prev.filter((b) => b.id !== blog.id));
      toast.success(`Da xoa bai viet "${blog.title}".`, { title: "Xoa thanh cong" });
    } catch (err) {
      toast.error("Khong the xoa bai viet luc nay.");
    }
  };

  const handleToggleStatus = async (blog) => {
    try {
      const nextStatus = await toggleBlogStatus(blog.id, blog.status);
      setBlogs((prev) => prev.map((b) => (b.id === blog.id ? { ...b, status: nextStatus } : b)));
      const cfg = STATUS_CONFIG[nextStatus];
      toast.success(`Bai viet da chuyen sang "${cfg.label}".`, { title: "Cap nhat trang thai" });
    } catch (err) {
      toast.error("Khong the cap nhat trang thai bai viet.");
    }
  };

  const handleToggleFeatured = async (blog) => {
    try {
      await updateBlog(blog.id, { featured: !blog.featured });
      setBlogs((prev) => prev.map((b) => (b.id === blog.id ? { ...b, featured: !blog.featured } : b)));
      toast.success(
        blog.featured ? `Da bo noi bat "${blog.title}".` : `Da danh dau noi bat "${blog.title}".`,
        { title: blog.featured ? "Bo noi bat" : "Noi bat" }
      );
    } catch (err) {
      toast.error("Khong the cap nhat noi bat.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quan ly Blog</h1>
          <p className="text-slate-500 mt-1">
            Tong so: <span className="font-semibold text-primary-600">{filtered.length}</span> bai viet
          </p>
        </div>
        <Link
          to="/admin/blogs/add"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white font-semibold rounded-xl shadow-lg hover:bg-primary-700 hover:-translate-y-0.5 transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          Them bai viet
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm mb-6">
        <div className="p-4 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Tim tieu de bai viet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 transition-all"
            />
          </div>
          <div className="flex gap-2">
            {["all", "solution", "guide", "project", "blog"].map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                  filterType === t
                    ? "bg-primary-600 text-white border-primary-600"
                    : "bg-white text-slate-600 border-slate-200 hover:border-primary-300 hover:text-primary-600"
                }`}
              >
                {t === "all" ? "Tat ca" : TYPE_CONFIG[t]?.label || t}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {["all", "published", "draft", "hidden"].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                  filterStatus === s
                    ? "bg-slate-800 text-white border-slate-800"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                }`}
              >
                {s === "all" ? "Tat ca" : STATUS_CONFIG[s]?.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
          <FileText className="w-12 h-12 mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-bold text-slate-700">Chua co bai viet nao</h3>
          <p className="text-sm text-slate-500 mt-1">Bat dau bang cach them bai viet dau tien.</p>
          <Link
            to="/admin/blogs/add"
            className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Them bai viet
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Desktop Table Header */}
          <div className="hidden lg:grid grid-cols-[1fr_100px_120px_120px_100px_140px] gap-4 px-5 py-3 bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wide">
            <div>Bai viet</div>
            <div className="text-center">Loai</div>
            <div className="text-center">Trang thai</div>
            <div className="text-center">Ngay tao</div>
            <div className="text-center">Noi bat</div>
            <div className="text-center">Thao tac</div>
          </div>

          {filtered.map((blog) => {
            const statusCfg = STATUS_CONFIG[blog.status] || STATUS_CONFIG.draft;
            const typeCfg = TYPE_CONFIG[blog.type] || TYPE_CONFIG.blog;
            const getBlogPath = (type, slug) => {
              if (type === "guide") return `/guides/${slug}`;
              if (type === "solution") return `/solutions/${slug}`;
              if (type === "project") return `/projects/${slug}`;
              return `/blogs/${slug}`;
            };
            const blogPath = getBlogPath(blog.type, blog.slug);

            return (
              <div
                key={blog.id}
                className="grid grid-cols-1 lg:grid-cols-[1fr_100px_120px_120px_100px_140px] gap-3 lg:gap-4 px-5 py-4 border-b border-slate-50 hover:bg-slate-50/60 transition-colors items-center"
              >
                {/* Title + thumb */}
                <div className="flex items-start gap-3 min-w-0">
                  <img
                    src={blog.thumbnail || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=60"}
                    alt={blog.title}
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                    onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=60"; }}
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-slate-800 line-clamp-2 leading-snug">{blog.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">{typeCfg.label}</p>
                  </div>
                </div>

                {/* Type (desktop) */}
                <div className="hidden lg:flex justify-center">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold border ${typeCfg.color}`}>
                    {typeCfg.label}
                  </span>
                </div>

                {/* Status toggle (desktop) */}
                <div className="hidden lg:flex justify-center">
                  <button
                    onClick={() => handleToggleStatus(blog)}
                    className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold border cursor-pointer transition-opacity hover:opacity-80 ${statusCfg.color}`}
                    title="Click de chuyen trang thai"
                  >
                    {statusCfg.label}
                  </button>
                </div>

                {/* Date (desktop) */}
                <div className="hidden lg:flex justify-center text-xs text-slate-500">
                  {formatDate(blog.createdAt)}
                </div>

                {/* Featured toggle (desktop) */}
                <div className="hidden lg:flex justify-center">
                  <button
                    onClick={() => handleToggleFeatured(blog)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${
                      blog.featured
                        ? "bg-amber-100 border-amber-300 text-amber-500"
                        : "bg-slate-50 border-slate-200 text-slate-300 hover:border-amber-300 hover:text-amber-400"
                    }`}
                    title={blog.featured ? "Bo noi bat" : "Danh dau noi bat"}
                  >
                    <Star size={15} fill={blog.featured ? "currentColor" : "none"} />
                  </button>
                </div>

                {/* Actions */}
                <div className="hidden lg:flex items-center justify-center gap-2">
                  {blog.status === "published" && blog.slug && (
                    <a
                      href={blogPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:border-blue-300 hover:text-blue-500 hover:bg-blue-50 transition-all"
                      title="Xem bai viet"
                    >
                      <Eye size={14} />
                    </a>
                  )}
                  <button
                    onClick={() => navigate(`/admin/blogs/edit/${blog.id}`)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:border-amber-300 hover:text-amber-500 hover:bg-amber-50 transition-all"
                    title="Sua bai viet"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(blog)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-all"
                    title="Xoa bai viet"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* Mobile row info */}
                <div className="lg:hidden flex items-center justify-between col-span-1">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold border ${typeCfg.color}`}>
                      {typeCfg.label}
                    </span>
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold border ${statusCfg.color}`}>
                      {statusCfg.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {blog.status === "published" && blog.slug && (
                      <a href={blogPath} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400">
                        <Eye size={14} />
                      </a>
                    )}
                    <button onClick={() => navigate(`/admin/blogs/edit/${blog.id}`)} className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400">
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => handleDelete(blog)} className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminBlogListPage;
