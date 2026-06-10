import { useEffect, useState, useMemo } from "react";
import { Search, LayoutGrid } from "lucide-react";
import BlogCard from "../../components/blog/BlogCard";
import { getBlogsByType } from "../../services/blogService";
import DesktopHeroMenu from "@/features/home/components/hero/DesktopHeroMenu";

const BlogListPage = ({ type = "blog" }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const isGuides = type === "guide";
  const isProjects = type === "project";
  const isSolutions = type === "solution";

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);

      try {
        const data = await getBlogsByType(type);
        setBlogs(data);
      } catch (err) {
        console.error("Lỗi khi tải bài viết:", err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [type]);

  const filtered = useMemo(() => {
    return blogs.filter((b) => {
      const title = b.title || "";
      const excerpt = b.excerpt || "";

      return (
        !searchTerm ||
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [blogs, searchTerm]);

  const getPageMeta = () => {
    if (isSolutions) {
      return {
        title: "Giải pháp Smart Home",
        subtitle:
          "Các giải pháp nhà thông minh được ưa chuộng nhất: chiếu sáng, điều hòa, an ninh, cổng cửa và nhiều tích hợp khác.",
        badge: "Giải pháp",
      };
    }

    if (isGuides) {
      return {
        title: "Hướng dẫn sử dụng & cài đặt",
        subtitle:
          "Tìm hiểu cách thiết lập, cài đặt và sử dụng các thiết bị nhà thông minh Aqara, Lumi, Hunonic.",
        badge: "Hướng dẫn",
      };
    }

    if (isProjects) {
      return {
        title: "Công trình thực tế",
        subtitle:
          "Khám phá các công trình nhà thông minh đã được lắp đặt thành công bởi Nhật Minh Smart Home.",
        badge: "Công trình",
      };
    }

    return {
      title: "Tư vấn giải pháp Smart Home",
      subtitle:
        "Chia sẻ kiến thức, so sánh sản phẩm và cập nhật xu hướng nhà thông minh mới nhất.",
      badge: "Bài viết",
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
     
      <section className="py-0 md:py-0 bg-white border-b border-slate-200">
        
        <div className="w-full max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-5 md:px-8">
          <div className="pt-4"><DesktopHeroMenu /></div>
          
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

      <section className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="w-full max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-5 md:px-8">
          <div className="py-4 flex justify-end">
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

      <section className="py-10 md:py-14">
        <div className="w-full max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-5 md:px-8">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Search size={28} className="text-slate-300" />
              </div>

              <h3 className="text-lg font-bold text-slate-700">
                Không tìm thấy bài viết nào
              </h3>

              <p className="mt-2 text-sm text-slate-500 max-w-xs">
                Thử đổi từ khóa tìm kiếm.
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