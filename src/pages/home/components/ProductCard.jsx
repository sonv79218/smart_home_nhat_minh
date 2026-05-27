// ============================================
// PRODUCT CARD - MODERN PREMIUM ECOMMERCE
// TailwindCSS + Enhanced Animations
// ============================================
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../../../hooks/useCart";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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
      <article
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleViewProduct}
        className={`
          product-card group
          bg-white rounded-2xl overflow-hidden cursor-pointer
          border transition-all duration-300 ease-out
          ${isHovered 
            ? "border-primary-200 shadow-xl -translate-y-2" 
            : "border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1"
          }
        `}
      >
        {/* Image Container */}
        <div className={`
          relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100
          aspect-square
          ${!imageLoaded ? "animate-pulse" : ""}
        `}>
          {/* Product Image */}
          <img
            src={product.thumbnail || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"}
            alt={product.name}
            className={`
              w-full h-full object-contain p-4
              transition-all duration-500 ease-out
              ${isHovered ? "scale-110" : "scale-100"}
              ${imageLoaded ? "opacity-100" : "opacity-0"}
            `}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />

          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-slate-200 border-t-primary-600 rounded-full animate-spin" />
            </div>
          )}

          {/* Discount Badge - Top Right */}
          {hasDiscount && (
            <div className={`
              absolute top-3 right-3 z-10
              px-2.5 py-1.5 rounded-xl
              bg-gradient-to-br from-red-500 to-red-600
              text-white text-xs font-bold
              shadow-lg shadow-red-500/30
              transition-all duration-300
              ${isHovered ? "scale-105" : "scale-100"}
            `}>
              -{discountPercent}%
            </div>
          )}

          {/* Product Badges - Top Left */}
          {(product.newProduct || product.bestSeller) && (
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
              {product.bestSeller && (
                <span className="
                  px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider
                  bg-gradient-to-r from-orange-500 to-red-500
                  text-white shadow-lg shadow-orange-500/30
                ">
                  Bán chạy
                </span>
              )}
              {product.newProduct && (
                <span className="
                  px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider
                  bg-gradient-to-r from-primary-600 to-blue-500
                  text-white shadow-lg shadow-blue-500/30
                ">
                  Mới
                </span>
              )}
            </div>
          )}

          {/* Quick Actions Overlay */}
          <div className={`
            absolute inset-x-0 bottom-0
            bg-gradient-to-t from-slate-900/95 via-slate-900/80 to-transparent
            pt-4 pb-4 px-4
            transition-all duration-400 ease-out
            ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}>
            <div className="flex gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); handleViewProduct(); }}
                className="
                  flex-1 py-2.5 px-4
                  bg-white text-slate-900
                  text-xs font-bold uppercase tracking-wider
                  rounded-xl
                  hover:bg-slate-100 active:scale-95
                  transition-all duration-200
                "
              >
                Xem chi tiết
              </button>
              <button
                onClick={handleAddToCart}
                className="
                  flex-1 py-2.5 px-4
                  bg-primary-600 text-white
                  text-xs font-bold uppercase tracking-wider
                  rounded-xl
                  hover:bg-primary-700 active:scale-95
                  transition-all duration-200
                  flex items-center justify-center gap-1.5
                "
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                Thêm
              </button>
            </div>
          </div>

          {/* Add to Cart Floating Button (Mobile) */}
          <button
            onClick={handleAddToCart}
            className="
              md:hidden absolute bottom-3 right-3 z-10
              w-10 h-10 rounded-full
              bg-primary-600 text-white
              shadow-lg shadow-primary-500/40
              flex items-center justify-center
              hover:bg-primary-700 active:scale-90
              transition-all duration-200
            "
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>

          {/* Hover Glow Effect */}
          <div className={`
            absolute inset-0 pointer-events-none
            bg-gradient-to-t from-primary-500/10 via-transparent to-transparent
            transition-opacity duration-500
            ${isHovered ? "opacity-100" : "opacity-0"}
          `} />
        </div>

        {/* Content Section */}
        <div className="p-4">
          {/* Brand/Category Tag */}
          {product.brand && (
            <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-primary-600 mb-1.5">
              {product.brand}
            </span>
          )}

          {/* Product Name */}
          <h3 className="
            font-semibold text-slate-800 text-sm leading-snug
            line-clamp-2 mb-2 min-h-[2.5rem]
            group-hover:text-primary-600
            transition-colors duration-200
          ">
            {product.name}
          </h3>

          {/* Rating Stars */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill={star <= Math.round(product.rating || 0) ? "#f59e0b" : "#e2e8f0"}
                  stroke="none"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              ({product.ratingCount || 0})
            </span>
          </div>

          {/* Price Section */}
          <div className="flex items-end gap-2 flex-wrap">
            <span className="
              text-lg font-bold
              bg-gradient-to-r from-primary-600 to-blue-500
              bg-clip-text text-transparent
            ">
              {formatPrice(product.price, product.discountPrice)}đ
            </span>
            {hasDiscount && (
              <>
                <span className="text-xs text-slate-400 line-through font-medium">
                  {Number(product.price).toLocaleString()}đ
                </span>
                <span className="
                  px-1.5 py-0.5 rounded text-[10px] font-bold
                  bg-red-50 text-red-500
                ">
                  -{discountPercent}%
                </span>
              </>
            )}
          </div>

          {/* Stock Status (optional) */}
          {product.stock !== undefined && product.stock <= 5 && product.stock > 0 && (
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-orange-500 font-semibold">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Chỉ còn {product.stock} sản phẩm
            </div>
          )}

          {/* Out of Stock Overlay */}
          {product.stock === 0 && (
            <div className="mt-2 py-1.5 px-3 bg-slate-100 rounded-lg text-center">
              <span className="text-xs font-semibold text-slate-500">Hết hàng</span>
            </div>
          )}
        </div>

        {/* Bottom Border Gradient on Hover */}
        <div className={`
          h-1 w-full
          bg-gradient-to-r from-primary-600 via-accent to-primary-600
          transition-all duration-500
          ${isHovered ? "opacity-100" : "opacity-0"}
        `} />
      </article>
    </>
  );
};

// ============================================
// ENHANCED CSS STYLES
// ============================================
const productCardStyles = `
  /* Card Hover Effects */
  .product-card {
    will-change: transform, box-shadow;
  }

  .product-card::before {
    content: "";
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(135deg, #2563eb20, #38bdf820);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  .product-card:hover::before {
    opacity: 1;
  }

  /* Image Container */
  .product-card img {
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.05));
    transition: filter 0.3s ease;
  }

  .product-card:hover img {
    filter: drop-shadow(0 8px 16px rgba(0,0,0,0.1));
  }

  /* Discount Badge Animation */
  .product-card .discount-badge {
    animation: badgePulse 2s ease-in-out infinite;
  }

  @keyframes badgePulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  /* Quick Action Transition */
  // .product-card .bg-gradient-to-t {
  //   backdrop-filter: blur(4px);
  // }

  /* Bottom Border Animation */
  .product-card > div:last-child {
    transform-origin: center;
  }

  /* Touch Device Optimizations */
  @media (hover: none) {
    .product-card:hover {
      transform: none;
      shadow: 0 1px 2px rgba(0,0,0,0.05);
    }

    .product-card:hover::before {
      opacity: 0;
    }

    .product-card img:hover {
      transform: none;
      filter: none;
    }
  }

  /* Reduced Motion */
  @media (prefers-reduced-motion: reduce) {
    .product-card,
    .product-card img,
    .product-card .discount-badge,
    .product-card > div {
      transition: none;
      animation: none;
    }
  }

  /* Loading Spinner */
  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .animate-spin {
    animation: spin 1s linear infinite;
  }
`;

export default ProductCard;
