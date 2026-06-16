import { Link } from "react-router-dom";
import  BlogCard from "./BlogCard";

const categories = [
  "Hệ thống công nghệ",
  "Camera an ninh",
  "Kiểm soát quản lý cửa",
  "Khóa cửa",
  "Sản phẩm khác",
];

const SidebarBlog = ({ recentPosts = [] }) => {
  const displayRecent = recentPosts.slice(0, 4);

  return (
    <aside className="hidden lg:block">
      <div className="lg:sticky lg:top-24 space-y-8">
        {/* Danh mục sản phẩm */}
        <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm">
          <div className="bg-slate-900 px-5 py-4">
            <h3 className="text-sm font-bold text-white tracking-wide">
              DANH MỤC SẢN PHẨM
            </h3>
          </div>
          <div className="divide-y divide-slate-100">
            {categories.map((item) => (
              <Link
                key={item}
                to="/products"
                className="block px-5 py-3 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Bài viết mới */}
        <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm">
          <div className="bg-slate-900 px-5 py-4">
            <h3 className="text-sm font-bold text-white tracking-wide">
              BÀI VIẾT MỚI
            </h3>
          </div>
          <div className="p-4">
            {displayRecent.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {displayRecent.map((post) => (
                  <BlogCard key={post.id} blog={post} variant="compact" />
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">Đang cập nhật bài viết mới...</p>
            )}
          </div>
        </div>
        

        {/* Box tư vấn */}
        <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 to-blue-500 p-6 shadow-lg text-white">
          <h3 className="text-lg font-black leading-snug mb-2">
            Cần tư vấn giải pháp Smart Home?
          </h3>
          <p className="text-sm text-blue-50 leading-relaxed mb-5">
            Liên hệ Nhật Minh Smart Home để được tư vấn phù hợp nhất.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 w-full py-3 bg-white text-blue-700 font-bold text-sm rounded-xl hover:bg-blue-50 transition-colors"
          >
            Liên hệ tư vấn ngay
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default SidebarBlog;
