// ============================================
// FEATURED PRODUCTS SECTION COMPONENT
// ============================================
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

// Skeleton loader
const Skeleton = () => (
  <div className="product-card-skeleton">
    <div className="skeleton-image" />
    <div className="skeleton-info">
      <div className="skeleton-line w-90" />
      <div className="skeleton-line w-60" />
      <div className="skeleton-line w-40" />
    </div>
  </div>
);

const FeaturedProductsSection = ({ products, loading }) => {
  if (!products || products.length === 0) return null;

  return (
    <>
      <style>{featuredStyles}</style>
      <section className="featured-section">
        <div className="section-header">
          <div className="section-title-wrapper">
            <span className="section-icon">⭐</span>
            <h2 className="section-title">Sản phẩm nổi bật</h2>
          </div>
          <Link to="/products" className="view-all-link">
            Xem tất cả
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {loading ? (
          <div className="products-grid">
            {[...Array(8)].map((_, index) => (
              <Skeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

const featuredStyles = `
  .featured-section {
    margin-bottom: 48px;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 12px;
  }

  .section-title-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .section-icon {
    font-size: 24px;
  }

  .section-title {
    font-size: clamp(18px, 3vw, 24px);
    font-weight: 700;
    margin: 0;
    color: #0f172a;
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
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  /* Skeleton */
  .product-card-skeleton {
    background: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #f0f0f0;
  }

  .skeleton-image {
    aspect-ratio: 1 / 1;
    background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }

  .skeleton-info {
    padding: 12px 14px 16px;
  }

  .skeleton-line {
    height: 14px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 4px;
    margin-bottom: 8px;
  }

  .skeleton-line.w-90 { width: 90%; }
  .skeleton-line.w-60 { width: 60%; }
  .skeleton-line.w-40 { width: 40%; }

  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* Responsive */
  @media (min-width: 576px) {
    .products-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 768px) {
    .products-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .products-grid {
      grid-template-columns: repeat(5, 1fr);
    }
  }

  @media (max-width: 576px) {
    .products-grid {
      gap: 12px;
    }
  }
`;

export default FeaturedProductsSection;
