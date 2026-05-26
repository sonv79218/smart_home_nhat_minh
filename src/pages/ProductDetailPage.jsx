import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/productService";
import { CATEGORIES, BRANDS, calculateDiscountPercent } from "../constants/productMeta";
import useCart from "../hooks/useCart";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
        if (data?.thumbnail) {
          setSelectedImage("main");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const getCategoryName = (categoryId) => {
    const category = CATEGORIES.find((c) => c.id === categoryId);
    return category?.name || categoryId;
  };

  const getBrandName = (brandId) => {
    const brand = BRANDS.find((b) => b.id === brandId);
    return brand?.name || brandId;
  };

  const discountPercent = calculateDiscountPercent(product?.price, product?.discountPrice);

  const allImages = product?.thumbnail
    ? [product.thumbnail, ...(product.images || [])]
    : product?.images || [];

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Đang tải...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Không tìm thấy sản phẩm</h2>
        <button onClick={() => navigate("/products")} style={backBtn}>
          Quay lại danh sách
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <button onClick={() => navigate(-1)} style={backBtn}>
        ← Quay lại
      </button>

      <div style={productContainer}>
        {/* Left: Images */}
        <div style={imageSection}>
          <div style={mainImageContainer}>
            {allImages.length > 0 ? (
              <img
                src={selectedImage === "main" ? product.thumbnail : allImages[selectedImage]}
                alt={product.name}
                style={mainImage}
              />
            ) : (
              <div style={noImage}>Không có hình ảnh</div>
            )}

            {discountPercent > 0 && (
              <span style={discountBadge}>-{discountPercent}%</span>
            )}
          </div>

          {allImages.length > 1 && (
            <div style={thumbnailList}>
              {allImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  style={{
                    ...thumbnailImage,
                    border: selectedImage === index ? "2px solid #3498db" : "2px solid transparent",
                  }}
                  onClick={() => setSelectedImage(index)}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div style={infoSection}>
          <div style={breadcrumbs}>
            <span onClick={() => navigate("/")} style={breadcrumbLink}>Trang chủ</span>
            <span style={breadcrumbSep}> / </span>
            <span onClick={() => navigate("/products")} style={breadcrumbLink}>Sản phẩm</span>
            <span style={breadcrumbSep}> / </span>
            <span style={breadcrumbCurrent}>{product.name}</span>
          </div>

          <h1 style={productName}>{product.name}</h1>

          {/* Flags */}
          <div style={flagsContainer}>
            {product.bestSeller && <span style={flagBadge("#e74c3c")}>🔥 Bán chạy</span>}
            {product.newProduct && <span style={flagBadge("#3498db")}>✨ Mới</span>}
            {product.featured && <span style={flagBadge("#f39c12")}>⭐ Nổi bật</span>}
          </div>

          <div style={metaInfo}>
            <span>Thương hiệu: <strong>{getBrandName(product.brand)}</strong></span>
            <span style={metaSep}>|</span>
            <span>Danh mục: <strong>{getCategoryName(product.category)}</strong></span>
          </div>

          {/* Rating */}
          {product.rating > 0 && (
            <div style={ratingContainer}>
              <span style={ratingStars}>
                {"★".repeat(Math.round(product.rating))}
                {"☆".repeat(5 - Math.round(product.rating))}
              </span>
              <span style={ratingText}>
                {Number(product.rating).toFixed(1)} ({product.ratingCount || 0} đánh giá)
              </span>
            </div>
          )}

          {/* Price */}
          <div style={priceSection}>
            <span style={currentPrice}>
              {Number(product.discountPrice > 0 ? product.discountPrice : product.price).toLocaleString()}đ
            </span>
            {product.discountPrice > 0 && (
              <>
                <span style={originalPrice}>
                  {Number(product.price).toLocaleString()}đ
                </span>
                <span style={discountTag}>-{discountPercent}%</span>
              </>
            )}
          </div>

          {/* Stock */}
          <div style={stockInfo}>
            {product.stock > 0 ? (
              <span style={inStock}>✓ Còn hàng ({product.stock} sản phẩm)</span>
            ) : (
              <span style={outOfStock}>✗ Hết hàng</span>
            )}
            <span style={soldCount}> | Đã bán: {product.sold || 0}</span>
          </div>

          {/* Short Description */}
          {product.shortDescription && (
            <p style={shortDesc}>{product.shortDescription}</p>
          )}

          {/* Tags */}
          {product.tags?.length > 0 && (
            <div style={tagsContainer}>
              {product.tags.map((tag, index) => (
                <span key={index} style={tagBadge}>{tag}</span>
              ))}
            </div>
          )}

          {/* Add to Cart */}
          <div style={actionSection}>
            <button
              onClick={() => addToCart(product)}
              disabled={product.stock <= 0}
              style={{
                ...addToCartBtn,
                opacity: product.stock <= 0 ? 0.5 : 1,
                cursor: product.stock <= 0 ? "not-allowed" : "pointer",
              }}
            >
              🛒 Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      {(product.description || product.specifications?.length > 0) && (
        <div style={detailSection}>
          {product.description && (
            <div style={descBlock}>
              <h2 style={sectionTitle}>Mô tả sản phẩm</h2>
              <p style={descText}>{product.description}</p>
            </div>
          )}

          {product.specifications?.length > 0 && (
            <div style={specBlock}>
              <h2 style={sectionTitle}>Thông số kỹ thuật</h2>
              <table style={specTable}>
                <tbody>
                  {product.specifications.map((spec, index) => (
                    <tr key={index}>
                      <td style={specKey}>{spec.key}</td>
                      <td style={specValue}>{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const backBtn = {
  marginBottom: "20px",
  padding: "8px 16px",
  backgroundColor: "#f5f5f5",
  border: "1px solid #ddd",
  borderRadius: "6px",
  cursor: "pointer",
};

const productContainer = {
  display: "flex",
  gap: "40px",
  flexWrap: "wrap",
};

const imageSection = {
  flex: "1 1 400px",
};

const mainImageContainer = {
  position: "relative",
  backgroundColor: "#f8f8f8",
  borderRadius: "12px",
  overflow: "hidden",
};

const mainImage = {
  width: "100%",
  maxHeight: "500px",
  objectFit: "contain",
};

const noImage = {
  width: "100%",
  height: "400px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#999",
};

const discountBadge = {
  position: "absolute",
  top: "10px",
  left: "10px",
  backgroundColor: "#e74c3c",
  color: "#fff",
  padding: "4px 10px",
  borderRadius: "4px",
  fontWeight: "bold",
  fontSize: "14px",
};

const thumbnailList = {
  display: "flex",
  gap: "10px",
  marginTop: "10px",
  flexWrap: "wrap",
};

const thumbnailImage = {
  width: "80px",
  height: "80px",
  objectFit: "cover",
  borderRadius: "8px",
  cursor: "pointer",
};

const infoSection = {
  flex: "1 1 400px",
};

const breadcrumbs = {
  fontSize: "13px",
  color: "#666",
  marginBottom: "10px",
};

const breadcrumbLink = {
  cursor: "pointer",
  color: "#3498db",
};

const breadcrumbLinkHover = {
  textDecoration: "underline",
};

const breadcrumbSep = {
  margin: "0 4px",
};

const breadcrumbCurrent = {
  color: "#333",
};

const productName = {
  fontSize: "28px",
  marginBottom: "12px",
  lineHeight: "1.3",
};

const flagsContainer = {
  display: "flex",
  gap: "8px",
  marginBottom: "12px",
  flexWrap: "wrap",
};

const flagBadge = (bgColor) => ({
  padding: "4px 10px",
  borderRadius: "4px",
  fontSize: "12px",
  fontWeight: "bold",
  color: "#fff",
  backgroundColor: bgColor,
});

const metaInfo = {
  fontSize: "14px",
  color: "#666",
  marginBottom: "10px",
};

const metaSep = {
  margin: "0 8px",
};

const ratingContainer = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "12px",
};

const ratingStars = {
  color: "#f39c12",
  fontSize: "16px",
  letterSpacing: "2px",
};

const ratingText = {
  fontSize: "13px",
  color: "#666",
};

const priceSection = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "12px",
};

const currentPrice = {
  fontSize: "32px",
  fontWeight: "bold",
  color: "#e74c3c",
};

const originalPrice = {
  fontSize: "18px",
  color: "#999",
  textDecoration: "line-through",
};

const discountTag = {
  padding: "4px 8px",
  backgroundColor: "#e74c3c",
  color: "#fff",
  borderRadius: "4px",
  fontSize: "12px",
  fontWeight: "bold",
};

const stockInfo = {
  fontSize: "14px",
  marginBottom: "16px",
};

const inStock = {
  color: "#27ae60",
  fontWeight: "bold",
};

const outOfStock = {
  color: "#e74c3c",
  fontWeight: "bold",
};

const soldCount = {
  color: "#999",
};

const shortDesc = {
  fontSize: "14px",
  color: "#555",
  lineHeight: "1.6",
  marginBottom: "16px",
};

const tagsContainer = {
  display: "flex",
  gap: "8px",
  flexWrap: "wrap",
  marginBottom: "20px",
};

const tagBadge = {
  padding: "4px 10px",
  backgroundColor: "#f0f0f0",
  borderRadius: "12px",
  fontSize: "12px",
  color: "#666",
};

const actionSection = {
  marginTop: "20px",
};

const addToCartBtn = {
  padding: "14px 32px",
  fontSize: "16px",
  fontWeight: "bold",
  backgroundColor: "#27ae60",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
};

const detailSection = {
  marginTop: "40px",
  borderTop: "1px solid #eee",
  paddingTop: "30px",
};

const descBlock = {
  marginBottom: "30px",
};

const sectionTitle = {
  fontSize: "20px",
  marginBottom: "16px",
  paddingBottom: "10px",
  borderBottom: "2px solid #27ae60",
};

const descText = {
  fontSize: "14px",
  lineHeight: "1.8",
  color: "#444",
  whiteSpace: "pre-wrap",
};

const specBlock = {
  marginTop: "30px",
};

const specTable = {
  width: "100%",
  maxWidth: "600px",
  borderCollapse: "collapse",
};

const specKey = {
  padding: "10px",
  backgroundColor: "#f8f8f8",
  borderBottom: "1px solid #eee",
  fontWeight: "bold",
  width: "200px",
};

const specValue = {
  padding: "10px",
  borderBottom: "1px solid #eee",
};

export default ProductDetailPage;
