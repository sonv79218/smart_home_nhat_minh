// ============================================
// ADMIN PRODUCTS PAGE - Fully Responsive
// ============================================
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "../../services/productService";
import { CATEGORIES, BRANDS, PRODUCT_STATUS } from "../../constants/productMeta";

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterBrand, setFilterBrand] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Bạn có chắc muốn xóa sản phẩm "${name}"?`)) {
      return;
    }

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Xóa sản phẩm thất bại");
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp?.seconds) return "N/A";
    return new Date(timestamp.seconds * 1000).toLocaleDateString("vi-VN");
  };

  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString("vi-VN");
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = !filterCategory || product.category === filterCategory;
    const matchesBrand = !filterBrand || product.brand === filterBrand;
    const matchesStatus = !filterStatus || product.status === filterStatus;
    const matchesSearch =
      !searchTerm ||
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesBrand && matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          <p className="text-slate-500 text-sm">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản lý sản phẩm</h1>
          <p className="text-slate-500 mt-1">
            Tổng số: <span className="font-semibold text-primary-600">{products.length}</span> sản phẩm
            {filteredProducts.length !== products.length && (
              <span className="ml-2 text-sm">
                (Đang hiển thị: {filteredProducts.length})
              </span>
            )}
          </p>
        </div>
        <Link
          to="/admin/products/add"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/25 hover:bg-primary-700 hover:-translate-y-0.5 transition-all duration-200"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Thêm sản phẩm</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm mb-6">
        {/* Filter Header - Mobile */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden w-full flex items-center justify-between p-4 border-b border-slate-100"
        >
          <span className="flex items-center gap-2 font-medium text-slate-700">
            <FilterIcon className="w-5 h-5" />
            Bộ lọc
          </span>
          <ChevronIcon className={`w-5 h-5 text-slate-400 transition-transform ${showFilters ? "rotate-180" : ""}`} />
        </button>

        {/* Filter Content */}
        <div className={`${showFilters ? "block" : "hidden"} lg:block p-4`}>
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm theo tên hoặc SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* Category */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm bg-white min-w-[150px]"
            >
              <option value="">Tất cả danh mục</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Brand */}
            <select
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
              className="px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm bg-white min-w-[150px]"
            >
              <option value="">Tất cả thương hiệu</option>
              {BRANDS.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>

            {/* Status */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm bg-white min-w-[150px]"
            >
              <option value="">Tất cả trạng thái</option>
              {PRODUCT_STATUS.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </select>

            {/* Clear Filters */}
            {(searchTerm || filterCategory || filterBrand || filterStatus) && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterCategory("");
                  setFilterBrand("");
                  setFilterStatus("");
                }}
                className="px-4 py-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors text-sm font-medium whitespace-nowrap"
              >
                Xóa bộ lọc
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Products Table */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <EmptyIcon className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-700 mb-2">Không có sản phẩm nào</h3>
          <p className="text-slate-500 mb-4">
            {searchTerm || filterCategory || filterBrand || filterStatus
              ? "Thử thay đổi bộ lọc để xem thêm sản phẩm"
              : "Hãy thêm sản phẩm mới để bắt đầu"}
          </p>
          {!searchTerm && !filterCategory && !filterBrand && !filterStatus && (
            <Link
              to="/admin/products/add"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
            >
              <PlusIcon className="w-5 h-5" />
              Thêm sản phẩm
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Ảnh</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Tên & SKU</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Danh mục</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Thương hiệu</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Giá</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Tồn kho</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Flags</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Trạng thái</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <img
                        src={product.thumbnail || ""}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-800 text-sm line-clamp-2">{product.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">SKU: {product.sku || "N/A"}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {CATEGORIES.find((c) => c.id === product.category)?.name || "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {BRANDS.find((b) => b.id === product.brand)?.name || "-"}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-red-500 text-sm">{formatPrice(product.price)}đ</p>
                      {product.discountPrice > 0 && (
                        <p className="text-xs text-slate-400 line-through">{formatPrice(product.discountPrice)}đ</p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-medium ${product.stock <= (product.minStockAlert || 5) ? "text-red-500" : "text-green-600"}`}>
                        {product.stock || 0}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {product.featured && <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded">Nổi bật</span>}
                        {product.bestSeller && <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded">Bán chạy</span>}
                        {product.newProduct && <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">Mới</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: PRODUCT_STATUS.find((s) => s.id === product.status)?.color || "#999" }}>
                        {PRODUCT_STATUS.find((s) => s.id === product.status)?.name || product.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/product/${product.id}`}
                          target="_blank"
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Xem"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Xóa"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-slate-100">
            {filteredProducts.map((product) => (
              <div key={product.id} className="p-4">
                <div className="flex gap-3">
                  <img
                    src={product.thumbnail || ""}
                    alt={product.name}
                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-slate-800 text-sm line-clamp-2">{product.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">SKU: {product.sku || "N/A"}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="font-semibold text-red-500 text-sm">{formatPrice(product.price)}đ</span>
                      <span className={`text-xs ${product.stock <= (product.minStockAlert || 5) ? "text-red-500" : "text-green-600"}`}>
                        Tồn: {product.stock || 0}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {product.featured && <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded">Nổi bật</span>}
                      {product.bestSeller && <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded">Bán chạy</span>}
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: PRODUCT_STATUS.find((s) => s.id === product.status)?.color || "#999" }}>
                        {PRODUCT_STATUS.find((s) => s.id === product.status)?.name || product.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-3 ml-0">
                  <Link
                    to={`/product/${product.id}`}
                    target="_blank"
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-50 text-blue-600 font-medium text-sm rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <EyeIcon className="w-4 h-4" />
                    Xem
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id, product.name)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 bg-red-50 text-red-600 font-medium text-sm rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <TrashIcon className="w-4 h-4" />
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ========== ICONS ==========
const PlusIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const SearchIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const FilterIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
);

const ChevronIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const EyeIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const TrashIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const EmptyIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

export default AdminProductsPage;
