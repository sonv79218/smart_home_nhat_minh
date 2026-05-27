// ============================================
// PRODUCT DETAIL PAGE - MODERN ECOMMERCE STYLE
// ============================================
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, getProducts } from "../services/productService";
import { CATEGORIES, BRANDS } from "../constants/productMeta";
import useCart from "../hooks/useCart";
import ProductCard from "./home/components/ProductCard";

// ============================================
// SUB-COMPONENTS
// ============================================

// Breadcrumbs
const Breadcrumbs = ({ product, navigate }) => (
  <nav className="breadcrumbs">
    <span onClick={() => navigate("/")}>Trang chủ</span>
    <span className="sep">/</span>
    <span onClick={() => navigate("/products")}>Sản phẩm</span>
    <span className="sep">/</span>
    <span className="current">{product.name}</span>
  </nav>
);

// Product Gallery
const ProductGallery = ({ images, selectedImage, setSelectedImage, discountPercent }) => {
  const allImages = images.length > 0 ? images : [];

  return (
    <div className="product-gallery">
      {/* Main Image */}
      <div className="main-image-container">
        <img
          src={allImages[selectedImage] || allImages[0]}
          alt="Product"
          className="main-image"
        />
        {discountPercent > 0 && (
          <div className="discount-badge">-{discountPercent}%</div>
        )}
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="thumbnail-list">
          {allImages.map((img, index) => (
            <button
              key={index}
              className={`thumbnail ${selectedImage === index ? "active" : ""}`}
              onClick={() => setSelectedImage(index)}
            >
              <img src={img} alt={`Thumbnail ${index + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Product Info
const ProductInfo = ({ product, discountPercent, getBrandName, getCategoryName }) => {
  const hasDiscount = product.discountPrice > 0 && product.discountPrice < product.price;

  return (
    <div className="product-info">
      {/* Brand */}
      <div className="product-brand">{getBrandName(product.brand)}</div>

      {/* Title */}
      <h1 className="product-title">{product.name}</h1>

      {/* Badges */}
      {(product.bestSeller || product.newProduct || product.featured) && (
        <div className="product-badges">
          {product.bestSeller && <span className="badge badge-hot">🔥 Bán chạy</span>}
          {product.newProduct && <span className="badge badge-new">✨ Mới</span>}
          {product.featured && <span className="badge badge-featured">⭐ Nổi bật</span>}
        </div>
      )}

      {/* Rating */}
      {product.rating > 0 && (
        <div className="product-rating">
          <div className="stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < Math.round(product.rating) ? "star filled" : "star"}>★</span>
            ))}
          </div>
          <span className="rating-text">
            {Number(product.rating).toFixed(1)} ({product.ratingCount || 0} đánh giá)
          </span>
        </div>
      )}

      {/* Price */}
      <div className="price-section">
        <span className="current-price">
          {Number(hasDiscount ? product.discountPrice : product.price).toLocaleString()}đ
        </span>
        {hasDiscount && (
          <>
            <span className="original-price">
              {Number(product.price).toLocaleString()}đ
            </span>
            <span className="discount-tag">-{discountPercent}%</span>
          </>
        )}
      </div>

      {/* Stock & Sold */}
      <div className="stock-info">
        {product.stock > 0 ? (
          <span className="in-stock">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Còn hàng ({product.stock} sản phẩm)
          </span>
        ) : (
          <span className="out-of-stock">Hết hàng</span>
        )}
        {product.sold > 0 && (
          <span className="sold-count">| Đã bán: {product.sold}</span>
        )}
      </div>

      {/* Short Description */}
      {product.shortDescription && (
        <p className="short-description">{product.shortDescription}</p>
      )}

      {/* Tags */}
      {product.tags?.length > 0 && (
        <div className="product-tags">
          {product.tags.map((tag, index) => (
            <span key={index} className="tag">#{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
};

// Product Meta Grid
const ProductMeta = ({ product, getCategoryName, getBrandName }) => (
  <div className="meta-grid">
    <div className="meta-item">
      <span className="meta-label">Danh mục</span>
      <span className="meta-value">{getCategoryName(product.category)}</span>
    </div>
    <div className="meta-item">
      <span className="meta-label">Thương hiệu</span>
      <span className="meta-value">{getBrandName(product.brand)}</span>
    </div>
    <div className="meta-item">
      <span className="meta-label">SKU</span>
      <span className="meta-value">{product.sku || "N/A"}</span>
    </div>
    <div className="meta-item">
      <span className="meta-label">Tình trạng</span>
      <span className={`meta-value ${product.stock > 0 ? "in-stock" : "out-stock"}`}>
        {product.stock > 0 ? "Còn hàng" : "Hết hàng"}
      </span>
    </div>
  </div>
);

// Action Buttons
const ProductActions = ({ product, addToCart, navigate }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product);
    navigate("/cart");
  };

  return (
    <div className="action-buttons">
      <button
        className={`btn btn-secondary ${isOutOfStock ? "disabled" : ""}`}
        onClick={handleAddToCart}
        disabled={isOutOfStock}
      >
        {addedToCart ? (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Đã thêm!
          </>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Thêm vào giỏ
          </>
        )}
      </button>
      <button
        className={`btn btn-primary ${isOutOfStock ? "disabled" : ""}`}
        onClick={handleBuyNow}
        disabled={isOutOfStock}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Mua ngay
      </button>
    </div>
  );
};

// Related Products
const RelatedProducts = ({ products }) => {
  if (!products || products.length === 0) return null;

  return (
    <section className="related-products">
      <h2 className="section-title">Sản phẩm liên quan</h2>
      <div className="related-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productData, allProducts] = await Promise.all([
          getProductById(id),
          getProducts()
        ]);

        setProduct(productData);
        setSelectedImage(0);

        // Get related products (same category, exclude current)
        if (productData?.category) {
          const related = allProducts
            .filter(p => p.category === productData.category && p.id !== id && p.status === "active")
            .slice(0, 5);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  const getCategoryName = (categoryId) => {
    const category = CATEGORIES.find((c) => c.id === categoryId);
    return category?.name || categoryId;
  };

  const getBrandName = (brandId) => {
    const brand = BRANDS.find((b) => b.id === brandId);
    return brand?.name || brandId;
  };

  const discountPercent = product?.discountPrice > 0 && product?.price > 0
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const allImages = product?.thumbnail
    ? [product.thumbnail, ...(product.images || [])]
    : product?.images || [];

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="product-container">
          <div className="loading-state">
            <div className="loading-spinner" />
            <p>Đang tải sản phẩm...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="product-container">
          <div className="error-state">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            <h2>Không tìm thấy sản phẩm</h2>
            <p>Sản phẩm bạn đang tìm kiếm không tồn tại.</p>
            <button className="btn btn-primary" onClick={() => navigate("/products")}>
              Quay lại cửa hàng
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{productDetailStyles}</style>
      <div className="product-detail-page">
        <div className="product-container">
          {/* Back Button */}
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Quay lại
          </button>

          {/* Breadcrumbs */}
          <Breadcrumbs product={product} navigate={navigate} />

          {/* Main Content - 2 Columns */}
          <div className="product-main">
            {/* Left: Gallery */}
            <ProductGallery
              images={allImages}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              discountPercent={discountPercent}
            />

            {/* Right: Info & Actions */}
            <div className="product-right">
              <ProductInfo
                product={product}
                discountPercent={discountPercent}
                getBrandName={getBrandName}
                getCategoryName={getCategoryName}
              />

              {/* Actions */}
              <ProductActions
                product={product}
                addToCart={addToCart}
                navigate={navigate}
              />

              {/* Meta Grid */}
              <ProductMeta
                product={product}
                getCategoryName={getCategoryName}
                getBrandName={getBrandName}
              />
            </div>
          </div>

          {/* Description Section */}
          {(product.description || product.specifications?.length > 0) && (
            <section className="description-section">
              {product.description && (
                <div className="description-card">
                  <h2 className="card-title">Mô tả sản phẩm</h2>
                  <p className="description-text">{product.description}</p>
                </div>
              )}

              {product.specifications?.length > 0 && (
                <div className="specifications-card">
                  <h2 className="card-title">Thông số kỹ thuật</h2>
                  <div className="specs-table">
                    {product.specifications.map((spec, index) => (
                      <div key={index} className="spec-row">
                        <span className="spec-key">{spec.key}</span>
                        <span className="spec-value">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Related Products */}
          <RelatedProducts products={relatedProducts} />
        </div>
      </div>
    </>
  );
};

// ============================================
// STYLES
// ============================================
const productDetailStyles = `
  /* ==================== PAGE LAYOUT ==================== */
  .product-detail-page {
    min-height: 100vh;
    background: #f8fafc;
    padding: 24px 0 60px;
  }

  .product-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 24px;
  }

  /* ==================== BACK BUTTON ==================== */
  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    color: #0f172a;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-bottom: 20px;
  }

  .back-btn:hover {
    background: #f1f5f9;
    border-color: #cbd5e1;
  }

  /* ==================== BREADCRUMBS ==================== */
  .breadcrumbs {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    margin-bottom: 24px;
    flex-wrap: wrap;
  }

  .breadcrumbs span {
    color: #64748b;
    cursor: pointer;
    transition: color 0.2s;
  }

  .breadcrumbs span:hover {
    color: #2563eb;
  }

  .breadcrumbs .sep {
    cursor: default;
  }

  .breadcrumbs .current {
    color: #0f172a;
    font-weight: 500;
    cursor: default;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* ==================== MAIN CONTENT ==================== */
  .product-main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    margin-bottom: 48px;
  }

  /* ==================== GALLERY ==================== */
  .product-gallery {
    position: sticky;
    top: 90px;
    align-self: start;
  }

  .main-image-container {
    position: relative;
    background: #ffffff;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
    padding: 24px;
  }

  .main-image {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: contain;
    border-radius: 16px;
    transition: transform 0.3s ease;
  }

  .main-image-container:hover .main-image {
    transform: scale(1.03);
  }

  .discount-badge {
    position: absolute;
    top: 20px;
    left: 20px;
    background: #ff4d2d;
    color: #ffffff;
    padding: 8px 14px;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 700;
  }

  .thumbnail-list {
    display: flex;
    gap: 12px;
    margin-top: 16px;
    overflow-x: auto;
    padding-bottom: 8px;
  }

  .thumbnail {
    flex-shrink: 0;
    width: 80px;
    height: 80px;
    padding: 0;
    border: 2px solid transparent;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    background: #ffffff;
    transition: all 0.2s ease;
  }

  .thumbnail:hover {
    border-color: #cbd5e1;
  }

  .thumbnail.active {
    border-color: #2563eb;
  }

  .thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* ==================== PRODUCT INFO ==================== */
  .product-right {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .product-info {
    background: #ffffff;
    border-radius: 24px;
    padding: 28px;
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
  }

  .product-brand {
    font-size: 13px;
    font-weight: 700;
    color: #38bdf8;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 8px;
  }

  .product-title {
    font-size: 28px;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.3;
    margin: 0 0 16px;
  }

  .product-badges {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }

  .badge {
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
  }

  .badge-hot { background: linear-gradient(135deg, #ff6b35, #ff4d2d); color: #fff; }
  .badge-new { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: #fff; }
  .badge-featured { background: linear-gradient(135deg, #f59e0b, #d97706); color: #fff; }

  .product-rating {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
  }

  .stars {
    display: flex;
    gap: 2px;
  }

  .star {
    font-size: 16px;
    color: #e2e8f0;
  }

  .star.filled {
    color: #ffc107;
  }

  .rating-text {
    font-size: 14px;
    color: #64748b;
  }

  /* ==================== PRICE ==================== */
  .price-section {
    display: flex;
    align-items: baseline;
    gap: 12px;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }

  .current-price {
    font-size: 36px;
    font-weight: 800;
    color: #ef4444;
    letter-spacing: -1px;
  }

  .original-price {
    font-size: 18px;
    color: #94a3b8;
    text-decoration: line-through;
  }

  .discount-tag {
    background: #ff4d2d;
    color: #ffffff;
    padding: 4px 10px;
    border-radius: 50px;
    font-size: 13px;
    font-weight: 700;
  }

  /* ==================== STOCK ==================== */
  .stock-info {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    margin-bottom: 16px;
  }

  .in-stock {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #22c55e;
    font-weight: 600;
  }

  .out-of-stock {
    color: #ef4444;
    font-weight: 600;
  }

  .sold-count {
    color: #94a3b8;
  }

  /* ==================== DESCRIPTION & TAGS ==================== */
  .short-description {
    font-size: 15px;
    line-height: 1.7;
    color: #475569;
    margin: 0 0 16px;
  }

  .product-tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .tag {
    padding: 6px 12px;
    background: #f1f5f9;
    color: #64748b;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 500;
  }

  /* ==================== ACTION BUTTONS ==================== */
  .action-buttons {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    height: 52px;
    padding: 0 28px;
    border-radius: 14px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.25s ease;
    border: 2px solid transparent;
  }

  .btn-primary {
    flex: 1;
    background: linear-gradient(135deg, #2563eb, #38bdf8);
    color: #ffffff;
    box-shadow: 0 8px 24px rgba(37, 99, 235, 0.35);
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(37, 99, 235, 0.45);
  }

  .btn-secondary {
    background: #ffffff;
    color: #2563eb;
    border-color: #2563eb;
  }

  .btn-secondary:hover {
    background: #eff6ff;
    transform: translateY(-2px);
  }

  .btn.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }

  /* ==================== META GRID ==================== */
  .meta-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    background: #ffffff;
    border-radius: 18px;
    padding: 18px;
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
  }

  .meta-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .meta-label {
    font-size: 12px;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
  }

  .meta-value {
    font-size: 14px;
    color: #0f172a;
    font-weight: 600;
  }

  .meta-value.in-stock {
    color: #22c55e;
  }

  .meta-value.out-stock {
    color: #ef4444;
  }

  /* ==================== DESCRIPTION SECTION ==================== */
  .description-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 48px;
  }

  .description-card,
  .specifications-card {
    background: #ffffff;
    border-radius: 24px;
    padding: 28px;
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
  }

  .card-title {
    font-size: 20px;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 20px;
    padding-bottom: 12px;
    border-bottom: 2px solid #e2e8f0;
  }

  .description-text {
    font-size: 15px;
    line-height: 1.8;
    color: #334155;
    white-space: pre-wrap;
    margin: 0;
  }

  .specs-table {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .spec-row {
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    background: #f8fafc;
    border-radius: 10px;
  }

  .spec-key {
    font-size: 14px;
    color: #64748b;
    font-weight: 500;
  }

  .spec-value {
    font-size: 14px;
    color: #0f172a;
    font-weight: 600;
    text-align: right;
  }

  /* ==================== RELATED PRODUCTS ==================== */
  .related-products {
    margin-top: 48px;
  }

  .section-title {
    font-size: 24px;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 24px;
  }

  .related-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  /* ==================== LOADING & ERROR ==================== */
  .loading-state,
  .error-state {
    text-align: center;
    padding: 80px 20px;
  }

  .loading-spinner {
    width: 48px;
    height: 48px;
    border: 3px solid #e2e8f0;
    border-top-color: #2563eb;
    border-radius: 50%;
    margin: 0 auto 20px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .error-state svg {
    color: #cbd5e1;
    margin-bottom: 16px;
  }

  .error-state h2 {
    font-size: 24px;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 8px;
  }

  .error-state p {
    font-size: 14px;
    color: #64748b;
    margin: 0 0 24px;
  }

  /* ==================== RESPONSIVE ==================== */

  /* Tablet */
  @media (min-width: 768px) {
    .related-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  /* Desktop */
  @media (min-width: 1024px) {
    .related-grid {
      grid-template-columns: repeat(5, 1fr);
    }
  }

  /* Mobile */
  @media (max-width: 768px) {
    .product-container {
      padding: 0 16px;
    }

    .product-detail-page {
      padding: 16px 0 100px;
    }

    .product-main {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .product-gallery {
      position: static;
    }

    .main-image-container {
      border-radius: 16px;
      padding: 16px;
    }

    .main-image-container:hover .main-image {
      transform: none;
    }

    .product-info {
      border-radius: 16px;
      padding: 20px;
    }

    .product-title {
      font-size: 22px;
    }

    .current-price {
      font-size: 28px;
    }

    .action-buttons {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      padding: 12px 16px;
      margin: 0 -16px;
      box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
      z-index: 100;
      border-radius: 20px 20px 0 0;
    }

    .btn {
      height: 48px;
      padding: 0 20px;
      font-size: 15px;
    }

    .description-section {
      grid-template-columns: 1fr;
    }

    .related-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    .meta-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      border-radius: 14px;
      padding: 14px;
    }

    .thumbnail {
      width: 60px;
      height: 60px;
    }

    .thumbnail-list {
      gap: 8px;
    }
  }

  /* Small Mobile */
  @media (max-width: 480px) {
    .action-buttons {
      flex-direction: column;
    }

    .btn {
      width: 100%;
    }

    .related-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .product-badges {
      gap: 6px;
    }

    .badge {
      font-size: 11px;
      padding: 4px 8px;
    }
  }
`;

export default ProductDetailPage;
