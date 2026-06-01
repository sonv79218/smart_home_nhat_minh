// ============================================
// PRODUCTS PAGE - WITH PAGINATION
// ============================================
import { useEffect, useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getProducts } from "../services/productService";
import { getCategories } from "../services/categoryService";
import { getBrands } from "../services/brandService";
import ProductCard from "./home/components/ProductCard";
import Pagination from "../components/common/Pagination";

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
    // Reset page when filter changes
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
      <div className="products-page">
        <div className="products-container">
          <div className="products-loading">
            <div className="loading-spinner" />
            <p>Đang tải sản phẩm...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{productsPageStyles}</style>
      <div className="products-page">
        <div className="products-container">
          {/* Page Header */}
          <div className="page-header">
            <div className="header-content">
              <h1 className="page-title">
                {currentCategory ? currentCategory.name : "Tất cả sản phẩm"}
              </h1>
              <p className="page-subtitle">
                Hiển thị{" "}
                <strong>
                  {Math.min((currentPage - 1) * itemsPerPage + 1, filteredAndSortedProducts.length)}
                  -{Math.min(currentPage * itemsPerPage, filteredAndSortedProducts.length)}
                </strong>{" "}
                trong <strong>{filteredAndSortedProducts.length}</strong> sản phẩm
              </p>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              className="filter-toggle-btn mobile-only"
              onClick={() => setShowFilters(!showFilters)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              Bộ lọc
            </button>
          </div>

          {/* Category Banner */}
          {currentCategory && currentCategory.banner && (
            <div className="category-banner">
              <img
                src={currentCategory.banner.image}
                alt={currentCategory.name}
                className="banner-image"
              />
              <div className="banner-overlay" />
              <div className="banner-content">
                <h2>{currentCategory.banner.title}</h2>
                <p>{currentCategory.banner.subtitle}</p>
              </div>
            </div>
          )}

          {/* Filters Bar */}
          <div className={`filters-bar ${showFilters ? "show" : ""}`}>
            {/* Search */}
            <div className="filter-search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button className="clear-search" onClick={() => setSearchTerm("")}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>

            {/* Category Select */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="filter-select"
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
              className="filter-select"
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
              className="filter-select sort-select"
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
              <button className="clear-filters-btn" onClick={clearAllFilters}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                Xóa lọc
              </button>
            )}
          </div>

          {/* Active Filters Tags */}
          {hasActiveFilters && (
            <div className="active-filters">
              {filterCategory && (
                <span className="filter-tag">
                  {categories.find((c) => c.id === filterCategory)?.name}
                  <button onClick={() => setFilterCategory("")}>×</button>
                </span>
              )}
              {filterBrand && (
                <span className="filter-tag">
                  {brands.find((b) => b.id === filterBrand)?.name}
                  <button onClick={() => setFilterBrand("")}>×</button>
                </span>
              )}
              {searchTerm && (
                <span className="filter-tag">
                  "{searchTerm}"
                  <button onClick={() => setSearchTerm("")}>×</button>
                </span>
              )}
            </div>
          )}

          {/* Products Grid */}
          {filteredAndSortedProducts.length === 0 ? (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <h3>Không tìm thấy sản phẩm</h3>
              <p>Thử thay đổi bộ lọc hoặc tìm kiếm từ khóa khác</p>
              <button onClick={clearAllFilters}>Xóa bộ lọc</button>
            </div>
          ) : (
            <>
              <div className="products-grid">
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
    </>
  );
};

// ============================================
// STYLES
// ============================================
const productsPageStyles = `
  /* ==================== PAGE LAYOUT ==================== */
  .products-page {
    min-height: 100vh;
    background: #f8fafc;
    padding: 24px 0;
  }

  .products-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 24px;
  }

  /* ==================== PAGE HEADER ==================== */
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 16px;
  }

  .header-content {
    flex: 1;
  }

  .page-title {
    font-size: clamp(24px, 4vw, 32px);
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 4px;
  }

  .page-subtitle {
    font-size: 14px;
    color: #64748b;
    margin: 0;
  }

  .page-subtitle strong {
    color: #2563eb;
  }

  /* ==================== CATEGORY BANNER ==================== */
  .category-banner {
    position: relative;
    height: 200px;
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 24px;
  }

  .category-banner .banner-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .category-banner .banner-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      rgba(15, 23, 42, 0.85) 0%,
      rgba(15, 23, 42, 0.4) 60%,
      transparent 100%
    );
  }

  .category-banner .banner-content {
    position: absolute;
    top: 50%;
    left: 40px;
    transform: translateY(-50%);
    color: white;
  }

  .category-banner .banner-content h2 {
    font-size: 32px;
    font-weight: 800;
    margin: 0 0 8px;
  }

  .category-banner .banner-content p {
    font-size: 16px;
    margin: 0;
    opacity: 0.9;
  }

  /* ==================== FILTERS BAR ==================== */
  .filters-bar {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
    flex-wrap: wrap;
    align-items: center;
    padding: 16px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
  }

  .filter-search {
    position: relative;
    flex: 1;
    min-width: 200px;
  }

  .filter-search svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
  }

  .filter-search .search-input {
    width: 100%;
    padding: 10px 36px 10px 40px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 14px;
    transition: all 0.2s ease;
    background: #f8fafc;
  }

  .filter-search .search-input:focus {
    outline: none;
    border-color: #2563eb;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  .filter-search .clear-search {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #94a3b8;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
  }

  .filter-search .clear-search:hover {
    background: #f1f5f9;
    color: #64748b;
  }

  .filter-select {
    padding: 10px 36px 10px 14px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    background: #f8fafc url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E") no-repeat right 12px center;
    appearance: none;
    transition: all 0.2s ease;
    min-width: 150px;
  }

  .filter-select:focus {
    outline: none;
    border-color: #2563eb;
    background-color: #ffffff;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  .sort-select {
    min-width: 180px;
  }

  .clear-filters-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 16px;
    background: #fef2f2;
    color: #dc2626;
    border: 1px solid #fecaca;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .clear-filters-btn:hover {
    background: #fee2e2;
  }

  /* ==================== ACTIVE FILTERS ==================== */
  .active-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 20px;
  }

  .filter-tag {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    background: #2563eb;
    color: white;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
  }

  .filter-tag button {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 14px;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .filter-tag button:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  /* ==================== PRODUCTS GRID ==================== */
  .products-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  /* ==================== EMPTY STATE ==================== */
  .empty-state {
    text-align: center;
    padding: 60px 20px;
    background: white;
    border-radius: 16px;
    border: 1px solid #e2e8f0;
  }

  .empty-state svg {
    color: #cbd5e1;
    margin-bottom: 16px;
  }

  .empty-state h3 {
    font-size: 20px;
    font-weight: 600;
    color: #0f172a;
    margin: 0 0 8px;
  }

  .empty-state p {
    font-size: 14px;
    color: #64748b;
    margin: 0 0 20px;
  }

  .empty-state button {
    padding: 10px 24px;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  .empty-state button:hover {
    background: #1d4ed8;
  }

  /* ==================== LOADING ==================== */
  .products-loading {
    text-align: center;
    padding: 60px 20px;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #e2e8f0;
    border-top-color: #2563eb;
    border-radius: 50%;
    margin: 0 auto 16px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* ==================== FILTER TOGGLE ==================== */
  .filter-toggle-btn {
    display: none;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #0f172a;
    cursor: pointer;
  }

  /* ==================== RESPONSIVE ==================== */

  /* Mobile */
  @media (max-width: 768px) {
    .products-container {
      padding: 0 16px;
    }

    .page-header {
      flex-direction: column;
      align-items: stretch;
    }

    .filter-toggle-btn {
      display: flex;
    }

    .filters-bar {
      display: none;
      flex-direction: column;
    }

    .filters-bar.show {
      display: flex;
    }

    .filter-search {
      width: 100%;
    }

    .filter-select,
    .sort-select {
      width: 100%;
    }

    .products-grid {
      gap: 12px;
    }

    .category-banner {
      height: 160px;
      border-radius: 12px;
    }

    .category-banner .banner-content {
      left: 20px;
    }

    .category-banner .banner-content h2 {
      font-size: 24px;
    }

    .category-banner .banner-content p {
      font-size: 14px;
    }
  }

  /* Tablet */
  @media (min-width: 576px) {
    .products-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 768px) {
    .products-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  /* Desktop */
  @media (min-width: 1024px) {
    .products-grid {
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
    }
  }

  /* Large Desktop */
  @media (min-width: 1280px) {
    .products-grid {
      grid-template-columns: repeat(5, 1fr);
    }
  }

  /* ==================== MOBILE ONLY ==================== */
  .mobile-only {
    display: none;
  }

  @media (max-width: 768px) {
    .mobile-only {
      display: flex;
    }
  }
`;

export default ProductsPage;
