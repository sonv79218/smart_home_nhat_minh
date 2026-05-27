// ============================================
// PRODUCT CARD - ECOMMERCE STYLE
// ============================================
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../../../hooks/useCart";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const hasDiscount = product.discountPrice > 0 && product.discountPrice < product.price;
  const discountPercent = hasDiscount && product.price > 0
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const formatPrice = (price, discountPrice) => {
    const finalPrice = discountPrice > 0 ? discountPrice : price;
    return Number(finalPrice || 0).toLocaleString("vi-VN");
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleViewProduct = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <>
      <style>{productCardStyles}</style>
      <div
        className="product-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleViewProduct}
      >
        {/* Image Section */}
        <div className="product-image-wrapper">
          <img
            src={product.thumbnail || "https://via.placeholder.com/300/f5f5f5/999?text=No+Image"}
            alt={product.name}
            className={`product-image ${isHovered ? "hovered" : ""}`}
            loading="lazy"
          />

          {/* Discount Badge */}
          {hasDiscount && (
            <div className="discount-badge">
              <span>-{discountPercent}%</span>
            </div>
          )}

          {/* Badges */}
          {(product.newProduct || product.bestSeller) && (
            <div className="product-badges">
              {product.bestSeller && (
                <span className="badge badge-hot">Bán chạy</span>
              )}
              {product.newProduct && (
                <span className="badge badge-new">Mới</span>
              )}
            </div>
          )}

          {/* Quick View Button */}
          <div className={`quick-action ${isHovered ? "visible" : ""}`}>
            <button className="quick-view-btn" onClick={handleViewProduct}>
              XEM NHANH
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="product-info">
          {/* Product Name */}
          <h3 className="product-name">{product.name}</h3>
          {/* <h3 className="product-name">{product.description}</h3> */}

          {/* Rating */}
          <div className="product-rating">
            <div className="stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < Math.round(product.rating || 0) ? "star filled" : "star"}>★</span>
              ))}
            </div>
            <span className="rating-count">({product.ratingCount || 0})</span>
          </div>

          {/* Price */}
          <div className="price-section">
            <span className="current-price">
              {formatPrice(product.price, product.discountPrice)}đ
            </span>
            {hasDiscount && (
              <span className="original-price">
                {Number(product.price).toLocaleString()}đ
              </span>
            )}
          </div>

          {/* Add to Cart Button (Mobile) */}
          <button className="mobile-add-btn" onClick={handleAddToCart}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </>
  );
};

// ============================================
// STYLES
// ============================================
const productCardStyles = `
  /* ==================== PRODUCT CARD ==================== */
  .product-card {
    background: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.25s ease;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    border: 1px solid #f0f0f0;
  }

  .product-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  /* ==================== IMAGE ==================== */
  .product-image-wrapper {
    position: relative;
    background: #ffffff;
    padding: 12px;
    aspect-ratio: 1 / 1;
    overflow: hidden;
  }

  .product-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;
  }

  .product-image.hovered {
    transform: scale(1.04);
  }

  /* ==================== DISCOUNT BADGE ==================== */
  .discount-badge {
    position: absolute;
    top: 8px;
    right: 8px;
    background: #ff4d2d;
    color: #ffffff;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 700;
    line-height: 1;
    z-index: 2;
  }

  .discount-badge::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, transparent 50%, rgba(255,255,255,0.2) 50%);
  }

  /* ==================== PRODUCT BADGES ==================== */
  .product-badges {
    position: absolute;
    top: 8px;
    left: 8px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    z-index: 2;
  }

  .badge {
    padding: 3px 6px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 700;
    line-height: 1.2;
  }

  .badge-hot {
    background: linear-gradient(135deg, #ff6b35, #ff4d2d);
    color: #ffffff;
  }

  .badge-new {
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: #ffffff;
  }

  /* ==================== QUICK VIEW ==================== */
  .quick-action {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(29, 78, 216, 0.95), rgba(29, 78, 216, 0.8));
    padding: 10px;
    transform: translateY(100%);
    transition: transform 0.25s ease;
    z-index: 3;
  }

  .quick-action.visible {
    transform: translateY(0);
  }

  .quick-view-btn {
    width: 100%;
    padding: 10px;
    background: transparent;
    color: #ffffff;
    border: none;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: all 0.2s ease;
  }

  .quick-view-btn:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  /* ==================== INFO SECTION ==================== */
  .product-info {
    padding: 12px 14px 16px;
  }

  .product-name {
    font-size: 14px;
    font-weight: 500;
    color: #1e293b;
    line-height: 1.45;
    margin: 0 0 8px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 40px;
  }

  /* ==================== RATING ==================== */
  .product-rating {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 8px;
  }

  .stars {
    display: flex;
    gap: 1px;
  }

  .star {
    font-size: 12px;
    color: #e0e0e0;
  }

  .star.filled {
    color: #ffc107;
  }

  .rating-count {
    font-size: 12px;
    color: #999999;
  }

  /* ==================== PRICE ==================== */
  .price-section {
    display: flex;
    align-items: baseline;
    gap: 8px;
    flex-wrap: wrap;
  }

  .current-price {
    font-size: 18px;
    font-weight: 700;
    color: #1d4ed8;
    letter-spacing: -0.5px;
  }

  .original-price {
    font-size: 13px;
    color: #999999;
    text-decoration: line-through;
  }

  /* ==================== MOBILE ADD BUTTON ==================== */
  .mobile-add-btn {
    display: none;
    width: 100%;
    margin-top: 10px;
    padding: 8px 12px;
    background: #1d4ed8;
    color: #ffffff;
    border: none;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: background 0.2s ease;
  }

  .mobile-add-btn:active {
    background: #1e40af;
  }

  /* ==================== RESPONSIVE ==================== */

  /* Mobile */
  @media (max-width: 768px) {
    .product-card {
      border-radius: 6px;
    }

    .product-card:hover {
      transform: none;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .product-image-wrapper {
      padding: 8px;
    }

    .product-info {
      padding: 10px 12px 12px;
    }

    .product-name {
      font-size: 13px;
      min-height: 36px;
    }

    .current-price {
      font-size: 16px;
    }

    .original-price {
      font-size: 11px;
    }

    .quick-action {
      display: none;
    }

    .mobile-add-btn {
      display: flex;
    }

    .discount-badge {
      font-size: 11px;
      padding: 3px 6px;
    }
  }

  /* Small Mobile */
  @media (max-width: 375px) {
    .product-name {
      font-size: 12px;
      min-height: 34px;
    }

    .current-price {
      font-size: 14px;
    }

    .product-info {
      padding: 8px 10px 10px;
    }
  }

  /* Desktop - Show quick action on hover */
  @media (min-width: 769px) {
    .mobile-add-btn {
      display: none;
    }
  }

  /* Touch devices - No hover effect */
  @media (hover: none) {
    .product-card:hover {
      transform: none;
    }

    .product-image.hovered {
      transform: none;
    }

    .quick-action {
      display: none;
    }
  }
`;

export default ProductCard;
