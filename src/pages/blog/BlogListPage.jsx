import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, LayoutGrid } from "lucide-react";
import BlogCard from "../../components/blog/BlogCard";
import { getAllBlogs, getBlogsByType } from "../../services/blogService";
import { BLOG_CATEGORIES, BLOG_CATEGORY_LABELS } from "../../constants/blogCategories";

const BlogListPage = ({ type = "blog" }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tat ca");

  const isGuides = type === "guide";
  const isProjects = type === "project";
  const isSolutions = type === "solution";

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const data = isGuides
          ? await getBlogsByType("guide")
          : isProjects
          ? await getBlogsByType("project")
          : isSolutions
          ? await getBlogsByType("solution")
          : await getAllBlogs();
        setBlogs(data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [isGuides, isProjects, isSolutions]);

  const filtered = useMemo(() => {
    return blogs.filter((b) => {
      const matchesCat =
        activeCategory === "Tat ca" ||
        b.category === BLOG_CATEGORY_LABELS[activeCategory] ||
        b.category === activeCategory;
      const matchesSearch =
        !searchTerm ||
        b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [blogs, activeCategory, searchTerm]);

  const getPageMeta = () => {
    if (isSolutions) return {
      title: "Giai phap Smart Home",
      subtitle: "Cac giai phap nha thong minh duoc ua chuong nhat — chieu sang, dieu hoa, bao mat, cong cua va hon 30+ tich hop.",
      badge: "Giai phap",
      categories: [
        { value: "Tat ca", label: "Tất cả" },
        { value: "Tu van giai phap", label: "Tư vấn giải pháp" },
      ],
    };
    if (isGuides) return {
      title: "Huong dan su dung & cai dat",
      subtitle: "Tim hieu cach thiet lap, cai dat va su dung cac thiet bi nha thong minh Aqara, Lumi, Hunonic.",
      badge: "Huong dan",
      categories: [
        { value: "Tat ca", label: "Tất cả" },
        { value: "Kien thuc nha thong minh", label: "Kiến thức nhà thông minh" },
      ],
    };
    if (isProjects) return {
      title: "Cong trinh thuc te",
      subtitle: "Kham pha cac cong trinh nha thong minh da duoc lap dat thanh cong boi Nhat Minh Smart Home.",
      badge: "Cong trinh",
      categories: [
        { value: "Tat ca", label: "Tất cả" },
        { value: "Cong trinh thuc te", label: "Công trình thực tế" },
      ],
    };
    return {
      title: "Tu van giai phap Smart Home",
      subtitle: "Chia se kien thuc, so sanh san pham va cap nhat xu huong nha thong minh moi nhat.",
      badge: "Blog",
      categories: [
        { value: "Tat ca", label: "Tất cả" },
        { value: "Tu van giai phap", label: "Tư vấn giải pháp" },
        { value: "Kien thuc nha thong minh", label: "Kiến thức nhà thông minh" },
        { value: "So sanh thiet bi", label: "So sánh thiết bị" },
        { value: "Cong trinh thuc te", label: "Công trình thực tế" },
      ],
    };
  };
  const meta = getPageMeta();

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

  return (
    <main className="bg-slate-50">
      {/* ─── Page Header ─── */}
      <section className="py-12 md:py-16 bg-white border-b border-slate-200">
        <div className="w-full max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-5 md:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-5">
              <LayoutGrid size={13} strokeWidth={2.5} />
              {meta.badge}
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
              {meta.title}
            </h1>
            <p className="mt-3 text-base md:text-lg text-slate-600 leading-relaxed">
              {meta.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Filters + Search ─── */}
      <section className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="w-full max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-5 md:px-8">
          <div className="py-4 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {meta.categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setActiveCategory(cat.value)}
                  className={`
                    px-4 py-1.5 rounded-full text-xs font-bold border transition-all duration-150
                    ${
                      activeCategory === cat.value
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-200"
                        : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                    }
                  `}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-64 shrink-0">
              <Search
                size={15}
                strokeWidth={2}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Tìm bài viết..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Blog Grid ─── */}
      <section className="py-10 md:py-14">
        <div className="w-full max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-5 md:px-8">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Search size={28} className="text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-700">Không tìm thấy bài viết nào</h3>
              <p className="mt-2 text-sm text-slate-500 max-w-xs">
                Thử thay đổi từ khóa tìm kiếm hoặc danh mục khác.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default BlogListPage;
