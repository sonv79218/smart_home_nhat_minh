// ============================================
// PRODUCTS PAGE - TAILWIND CSS
// ============================================
import { useEffect, useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getProducts } from "../services/productService";
import { getCategories } from "../services/categoryService";
import { getBrands } from "../services/brandService";
import ProductCard from "@/features/home/components/category/ProductCard";
import Pagination from "../components/common/Pagination";
import { Search, X, SlidersHorizontal } from "lucide-react";

// ============================================
// CONSTANTS
// ============================================
const ITEMS_PER_PAGE = {
  mobile: 6,
  tablet: 8,
  desktop: 10,
};

// ============================================
// HELPER FUNCTIONS
// ============================================
const getItemsPerPage = (width) => {
  if (width < 576) return ITEMS_PER_PAGE.mobile;
  if (width < 768) return ITEMS_PER_PAGE.tablet;
  return ITEMS_PER_PAGE.desktop;
};

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  const navigate = useNavigate();

  // Filter states
  const [filterCategory, setFilterCategory] = useState(searchParams.get("category") || "");
  const [filterBrand, setFilterBrand] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");

  // Track window width for responsive items per page
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Items per page based on screen size
  const itemsPerPage = useMemo(() => getItemsPerPage(windowWidth), [windowWidth]);

  // Fetch categories and brands
  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const [cats, brds] = await Promise.all([
          getCategories(),
          getBrands()
        ]);
        setCategories(cats);
        setBrands(brds);
      } catch (error) {
        console.error("Error fetching categories/brands:", error);
      }
    };
    fetchMeta();
  }, []);

  // Update URL when category changes
  useEffect(() => {
    if (filterCategory) {
      setSearchParams({ category: filterCategory });
    } else {
      setSearchParams({});
    }
    setCurrentPage(1);
  }, [filterCategory, setSearchParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Sync with URL params
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      setFilterCategory(categoryFromUrl);
    }
  }, [searchParams]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterBrand, sortBy, searchTerm]);

  // Get current category info
  const getCurrentCategoryInfo = () => {
    if (!filterCategory) return null;
    return categories.find((c) => c.id === filterCategory);
  };

  const currentCategory = getCurrentCategoryInfo();

  // ============================================
  // FILTERED & SORTED PRODUCTS (Memoized)
  // ============================================
  const filteredAndSortedProducts = useMemo(() => {
    return (products || [])
      .filter((product) => {
        const matchesCategory = !filterCategory || product.category === filterCategory;
        const matchesBrand = !filterBrand || product.brand === filterBrand;
        const matchesSearch =
          !searchTerm ||
          product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesActive = product.status === "active";
        return matchesCategory && matchesBrand && matchesSearch && matchesActive;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "newest":
            return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
          case "price-low":
            return (a.discountPrice || a.price) - (b.discountPrice || b.price);
          case "price-high":
            return (b.discountPrice || b.price) - (a.discountPrice || a.price);
          case "best-seller":
            return (b.sold || 0) - (a.sold || 0);
          case "rating":
            return (b.rating || 0) - (a.rating || 0);
          case "name":
            return (a.name || "").localeCompare(b.name || "");
          default:
            return 0;
        }
      });
  }, [products, filterCategory, filterBrand, sortBy, searchTerm]);

  // ============================================
  // PAGINATED PRODUCTS (Memoized)
  // ============================================
  const totalPages = useMemo(
    () => Math.ceil(filteredAndSortedProducts.length / itemsPerPage),
    [filteredAndSortedProducts.length, itemsPerPage]
  );

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredAndSortedProducts.slice(start, end);
  }, [filteredAndSortedProducts, currentPage, itemsPerPage]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilterCategory("");
    setFilterBrand("");
    setSearchTerm("");
    setCurrentPage(1);
  };

  const hasActiveFilters = filterCategory || filterBrand || searchTerm;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-6 md:py-8">
      <div className="w-full mx-auto w-full max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1800px] xl:max-w-[1500px] 2xl:max-w-[1800px] px-4 md:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              {currentCategory ? currentCategory.name : "Tất cả sản phẩm"}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Hiển thị{" "}
              <strong className="text-blue-600">
                {Math.min((currentPage - 1) * itemsPerPage + 1, filteredAndSortedProducts.length)}
                -{Math.min(currentPage * itemsPerPage, filteredAndSortedProducts.length)}
              </strong>{" "}
              trong <strong className="text-blue-600">{filteredAndSortedProducts.length}</strong> sản phẩm
            </p>
          </div>

          {/* Mobile Filter Toggle */}
          <button
            className="md:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-900"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={18} />
            Bộ lọc
          </button>
        </div>

        {/* Category Banner */}
        {currentCategory && currentCategory.banner && (
          <div className="relative w-full     aspect-[6/1]
    md:aspect-[6/1] rounded-2xl overflow-hidden mb-6">
            <img
              src={currentCategory.banner.image}
              alt={currentCategory.name}
              className="w-full h-full object-cover"
            />
 
          </div>
        )}

        {/* Filters Bar */}
        <div className={`
          flex flex-col md:flex-row flex-wrap items-stretch md:items-center gap-3 p-4 md:p-5
          bg-white rounded-2xl border border-slate-200 shadow-sm
          mb-5 transition-all
          ${showFilters ? "block" : "hidden md:flex"}
        `}>
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" size={18} />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
                w-full pl-10 pr-10 py-2.5
                bg-slate-50 border border-slate-200 rounded-xl
                text-sm text-slate-900 placeholder:text-slate-400
                focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100
                transition-all
              "
            />
            {searchTerm && (
              <button
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                onClick={() => setSearchTerm("")}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category Select */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="
              px-4 py-2.5 pr-10
              bg-slate-50 border border-slate-200 rounded-xl
              text-sm text-slate-700
              focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100
              cursor-pointer
              bg-no-repeat bg-[right_12px_center]
              appearance-none
            "
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`
            }}
          >
            <option value="">Tất cả danh mục</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Brand Select */}
          <select
            value={filterBrand}
            onChange={(e) => setFilterBrand(e.target.value)}
            className="
              px-4 py-2.5 pr-10
              bg-slate-50 border border-slate-200 rounded-xl
              text-sm text-slate-700
              focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100
              cursor-pointer
              bg-no-repeat bg-[right_12px_center]
              appearance-none
            "
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`
            }}
          >
            <option value="">Tất cả thương hiệu</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>

          {/* Sort Select */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="
              px-4 py-2.5 pr-10
              bg-slate-50 border border-slate-200 rounded-xl
              text-sm text-slate-700
              focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100
              cursor-pointer
              bg-no-repeat bg-[right_12px_center]
              appearance-none min-w-[160px]
            "
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`
            }}
          >
            <option value="newest">Mới nhất</option>
            <option value="price-low">Giá: Thấp → Cao</option>
            <option value="price-high">Giá: Cao → Thấp</option>
            <option value="best-seller">Bán chạy</option>
            <option value="rating">Đánh giá cao</option>
            <option value="name">Tên A → Z</option>
          </select>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              className="flex items-center gap-2 px-4 py-2.5 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors"
              onClick={clearAllFilters}
            >
              <X size={16} />
              Xóa lọc
            </button>
          )}
        </div>

        {/* Active Filters Tags */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mb-5">
            {filterCategory && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg">
                {categories.find((c) => c.id === filterCategory)?.name}
                <button onClick={() => setFilterCategory("")} className="w-4 h-4 bg-white/20 rounded-full text-xs">×</button>
              </span>
            )}
            {filterBrand && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg">
                {brands.find((b) => b.id === filterBrand)?.name}
                <button onClick={() => setFilterBrand("")} className="w-4 h-4 bg-white/20 rounded-full text-xs">×</button>
              </span>
            )}
            {searchTerm && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg">
                "{searchTerm}"
                <button onClick={() => setSearchTerm("")} className="w-4 h-4 bg-white/20 rounded-full text-xs">×</button>
              </span>
            )}
          </div>
        )}

        {/* Products Grid */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-16 px-6 bg-white rounded-2xl border border-slate-200">
            <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Không tìm thấy sản phẩm</h3>
            <p className="text-slate-500 mb-6">Thử thay đổi bộ lọc hoặc tìm kiếm từ khóa khác</p>
            <button
              onClick={clearAllFilters}
              className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              Xóa bộ lọc
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-5">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
