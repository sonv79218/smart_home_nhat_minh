// ============================================
// CATEGORY PRODUCT SECTION - ECOMMERCE LAYOUT
// ============================================
import { useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

// ============================================
// SUB-COMPONENTS
// ============================================

// Category Header
const CategoryHeader = ({ category, productCount, viewAllLink }) => (
  <div className="category-header">
    <div className="category-header-left">
      <h2 className="category-title">{category.name}</h2>
      {productCount > 0 && (
        <span className="category-count">{productCount} sản phẩm</span>
      )}
    </div>
    <Link
      to={viewAllLink || `/products?category=${category.id}`}
      className="view-all-link"
    >
      Xem tất cả
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </Link>
  </div>
);

// Category Banner
const CategoryBanner = ({ banner }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!banner || !banner.image) return null;

  return (
    <div
      className={`category-banner ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={banner.image}
        alt={banner.title || "Category Banner"}
        className="banner-image"
      />
      <div className="banner-overlay" />
      <div className="banner-glow" />
      <div className="banner-content">
        <h3 className="banner-title">{banner.title}</h3>
        <p className="banner-subtitle">{banner.subtitle || banner.description}</p>
        <Link
          to={banner.link || "#"}
          className="banner-cta-btn"
        >
          <span>{banner.buttonText || "Khám phá ngay"}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
const CategoryProductSection = ({ category, products, viewAllLink }) => {
  if (!products || products.length === 0) return null;

  const hasBanner = category.banner && category.banner.image;
  const link = viewAllLink || `/products?category=${category.id}`;

  return (
    <>
      <style>{categoryStyles}</style>
      <section className="category-section">
        {/* Category Header - Always visible */}
        <CategoryHeader
          category={category}
          productCount={products.length}
          viewAllLink={link}
        />

        {/* Category Banner - Full width */}
        {hasBanner && (
          <CategoryBanner banner={category.banner} />
        )}

        {/* Products Grid */}
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

// ============================================
// STYLES
// ============================================
const categoryStyles = `
  /* ==================== SECTION ==================== */
  .category-section {
    margin-bottom: 48px;
  }

  /* ==================== HEADER ==================== */
  .category-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 12px;
  }

  .category-header-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .category-icon {
    font-size: 24px;
  }

  .category-title {
    font-size: clamp(20px, 3vw, 26px);
    font-weight: 700;
    margin: 0;
    color: #0f172a;
  }

  .category-count {
    font-size: 13px;
    color: #64748b;
    background: #f1f5f9;
    padding: 4px 10px;
    border-radius: 20px;
  }

  .view-all-link {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #2563eb;
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 0.25s ease;
  }

  .view-all-link:hover {
    background: rgba(37, 99, 235, 0.08);
    transform: translateX(4px);
  }

  .view-all-link svg {
    transition: transform 0.25s ease;
  }

  .view-all-link:hover svg {
    transform: translateX(4px);
  }

  /* ==================== BANNER ==================== */
  .category-banner {
    position: relative;
    height: 300px;
    border-radius: 24px;
    overflow: hidden;
    margin-bottom: 24px;
    cursor: pointer;
    box-shadow: 0 10px 40px rgba(15, 23, 42, 0.12);
  }

  .category-banner .banner-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .category-banner.hovered .banner-image {
    transform: scale(1.03);
  }

  .category-banner .banner-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      rgba(15, 23, 42, 0.82) 0%,
      rgba(15, 23, 42, 0.45) 55%,
      transparent 100%
    );
    z-index: 1;
  }

  .category-banner .banner-glow {
    position: absolute;
    top: 50%;
    left: 20%;
    width: 300px;
    height: 300px;
    background: radial-gradient(
      circle,
      rgba(56, 189, 248, 0.15) 0%,
      transparent 70%
    );
    transform: translateY(-50%);
    z-index: 1;
    pointer-events: none;
  }

  .category-banner .banner-content {
    position: absolute;
    top: 50%;
    left: 48px;
    transform: translateY(-50%);
    z-index: 2;
    max-width: 420px;
  }

  .category-banner .banner-title {
    font-size: 42px;
    font-weight: 800;
    color: #ffffff;
    margin: 0 0 12px;
    line-height: 1.1;
    letter-spacing: -0.5px;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }

  .category-banner .banner-subtitle {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.92);
    margin: 0 0 20px;
    line-height: 1.5;
  }

  .category-banner .banner-cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 28px;
    background: linear-gradient(135deg, #2563eb, #38bdf8);
    color: #ffffff;
    text-decoration: none;
    border-radius: 50px;
    font-size: 15px;
    font-weight: 600;
    box-shadow: 0 8px 24px rgba(37, 99, 235, 0.4);
    transition: all 0.25s ease;
  }

  .category-banner .banner-cta-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(37, 99, 235, 0.5);
  }

  .category-banner .banner-cta-btn svg {
    transition: transform 0.25s ease;
  }

  .category-banner .banner-cta-btn:hover svg {
    transform: translateX(4px);
  }

  /* ==================== PRODUCTS GRID ==================== */
  .products-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: clamp(10px, 2vw, 16px);
  }

  /* ==================== RESPONSIVE ==================== */

  /* Tablet */
  @media (min-width: 768px) {
    .products-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  /* Desktop */
  @media (min-width: 1024px) {
    .products-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  /* Mobile */
  @media (max-width: 768px) {
    .category-section {
      margin-bottom: 32px;
    }

    .category-header {
      margin-bottom: 16px;
    }

    .category-title {
      font-size: 18px;
    }

    .category-icon {
      font-size: 20px;
    }

    .category-count {
      display: none;
    }

    .view-all-link {
      font-size: 13px;
      padding: 6px 12px;
    }

    /* Mobile Banner */
    .category-banner {
      height: 180px;
      border-radius: 18px;
      margin-bottom: 16px;
    }

    .category-banner .banner-overlay {
      background: linear-gradient(
        90deg,
        rgba(15, 23, 42, 0.88) 0%,
        rgba(15, 23, 42, 0.6) 60%,
        rgba(15, 23, 42, 0.3) 100%
      );
    }

    .category-banner .banner-content {
      left: 20px;
      right: 20px;
      max-width: none;
    }

    .category-banner .banner-title {
      font-size: 24px;
      margin-bottom: 8px;
    }

    .category-banner .banner-subtitle {
      font-size: 13px;
      margin-bottom: 12px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .category-banner .banner-cta-btn {
      padding: 10px 18px;
      font-size: 13px;
    }

    .category-banner .banner-glow {
      display: none;
    }
  }

  /* Extra Small */
  @media (max-width: 480px) {
    .category-banner {
      height: 160px;
      border-radius: 14px;
    }

    .category-banner .banner-title {
      font-size: 20px;
    }

    .category-banner .banner-cta-btn {
      padding: 8px 14px;
      font-size: 12px;
    }

    .category-banner .banner-cta-btn svg {
      width: 14px;
      height: 14px;
    }

    .products-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
  }

  /* Large Desktop */
  @media (min-width: 1400px) {
    .category-banner {
      height: 320px;
    }

    .category-banner .banner-title {
      font-size: 48px;
    }

    .category-banner .banner-content {
      left: 60px;
    }
  }

  /* Hover effects disabled on touch */
  @media (hover: none) {
    .category-banner.hovered .banner-image {
      transform: none;
    }
  }
`;

export default CategoryProductSection;
