import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/productService";
import useCart from "../hooks/useCart";
import {
  CATEGORIES,
  BRANDS,
  calculateDiscountPercent,
} from "../constants/productMeta";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filterCategory, setFilterCategory] = useState("");
  const [filterBrand, setFilterBrand] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCategoryName = (categoryId) => {
    const category = CATEGORIES.find((c) => c.id === categoryId);
    return category?.name || categoryId;
  };

  const getBrandName = (brandId) => {
    const brand = BRANDS.find((b) => b.id === brandId);
    return brand?.name || brandId;
  };

  const filteredAndSortedProducts = products
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

  const formatPrice = (price, discountPrice) => {
    const finalPrice = discountPrice > 0 ? discountPrice : price;
    return Number(finalPrice || 0).toLocaleString("vi-VN");
  };

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Đang tải sản phẩm...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <div style={headerSection}>
        <h1>Danh sách sản phẩm</h1>
        <p style={{ color: "#666", marginTop: "4px" }}>
          Hiển thị <strong>{filteredAndSortedProducts.length}</strong> sản phẩm
        </p>
      </div>

      <div style={filterSection}>
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInput}
        />

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          style={filterSelect}
        >
          <option value="">Tất cả danh mục</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          value={filterBrand}
          onChange={(e) => setFilterBrand(e.target.value)}
          style={filterSelect}
        >
          <option value="">Tất cả thương hiệu</option>
          {BRANDS.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={filterSelect}
        >
          <option value="newest">Mới nhất</option>
          <option value="price-low">Giá: Thấp → Cao</option>
          <option value="price-high">Giá: Cao → Thấp</option>
          <option value="best-seller">Bán chạy</option>
          <option value="rating">Đánh giá cao</option>
          <option value="name">Tên A → Z</option>
        </select>
      </div>

      {filteredAndSortedProducts.length === 0 ? (
        <div style={emptyState}>
          <p>Không tìm thấy sản phẩm nào</p>
        </div>
      ) : (
        <div style={productGrid}>
          {filteredAndSortedProducts.map((product) => {
            const discountPercent = calculateDiscountPercent(
              product.price,
              product.discountPrice
            );
            const hasDiscount = product.discountPrice > 0;

            return (
              <div key={product.id} style={productCard}>
                <div
                  style={cardImageContainer}
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <img
                    src={product.thumbnail || "/placeholder.png"}
                    alt={product.name}
                    style={cardImage}
                    onError={(e) => {
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23f0f0f0' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E";
                    }}
                  />

                  {hasDiscount && (
                    <span style={discountBadge}>-{discountPercent}%</span>
                  )}

                  <div style={cardBadges}>
                    {product.newProduct && <span style={badgeNew}>Mới</span>}
                    {product.bestSeller && <span style={badgeHot}>Hot</span>}
                    {product.featured && <span style={badgeFeatured}>Nổi bật</span>}
                  </div>
                </div>

                <div style={cardContent}>
                  <p style={cardCategory}>
                    {getBrandName(product.brand)} • {getCategoryName(product.category)}
                  </p>

                  <h3
                    style={cardTitle}
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    {product.name}
                  </h3>

                  <div style={cardRating}>
                    <span style={stars}>
                      {"★".repeat(Math.round(product.rating || 0))}
                      {"☆".repeat(5 - Math.round(product.rating || 0))}
                    </span>
                    <span style={ratingCount}>
                      ({product.ratingCount || 0})
                    </span>
                  </div>

                  <div style={priceRow}>
                    <span style={currentPrice}>
                      {formatPrice(product.price, product.discountPrice)}đ
                    </span>
                    {hasDiscount && (
                      <span style={originalPrice}>
                        {Number(product.price).toLocaleString()}đ
                      </span>
                    )}
                  </div>

                  <div style={stockRow}>
                    {product.stock > 0 ? (
                      <span style={inStockText}>Còn hàng</span>
                    ) : (
                      <span style={outOfStockText}>Hết hàng</span>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    disabled={product.stock <= 0}
                    style={{
                      ...addToCartBtn,
                      opacity: product.stock <= 0 ? 0.5 : 1,
                      cursor: product.stock <= 0 ? "not-allowed" : "pointer",
                    }}
                  >
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const headerSection = {
  marginBottom: "20px",
};

const filterSection = {
  display: "flex",
  gap: "12px",
  marginBottom: "24px",
  flexWrap: "wrap",
  padding: "16px",
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
};

const searchInput = {
  padding: "10px 14px",
  border: "1px solid #ddd",
  borderRadius: "6px",
  width: "200px",
  fontSize: "14px",
};

const filterSelect = {
  padding: "10px 14px",
  border: "1px solid #ddd",
  borderRadius: "6px",
  minWidth: "160px",
  fontSize: "14px",
  cursor: "pointer",
  backgroundColor: "#fff",
};

const emptyState = {
  padding: "60px",
  textAlign: "center",
  color: "#999",
};

const productGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gap: "20px",
};

const productCard = {
  border: "1px solid #eee",
  borderRadius: "12px",
  overflow: "hidden",
  backgroundColor: "#fff",
  transition: "box-shadow 0.2s",
};

const cardImageContainer = {
  position: "relative",
  cursor: "pointer",
};

const cardImage = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
};

const discountBadge = {
  position: "absolute",
  top: "10px",
  right: "10px",
  backgroundColor: "#e74c3c",
  color: "#fff",
  padding: "4px 8px",
  borderRadius: "4px",
  fontSize: "12px",
  fontWeight: "bold",
};

const cardBadges = {
  position: "absolute",
  top: "10px",
  left: "10px",
  display: "flex",
  gap: "4px",
  flexDirection: "column",
};

const badgeNew = {
  backgroundColor: "#3498db",
  color: "#fff",
  padding: "2px 6px",
  borderRadius: "4px",
  fontSize: "10px",
  fontWeight: "bold",
};

const badgeHot = {
  backgroundColor: "#e74c3c",
  color: "#fff",
  padding: "2px 6px",
  borderRadius: "4px",
  fontSize: "10px",
  fontWeight: "bold",
};

const badgeFeatured = {
  backgroundColor: "#f39c12",
  color: "#fff",
  padding: "2px 6px",
  borderRadius: "4px",
  fontSize: "10px",
  fontWeight: "bold",
};

const cardContent = {
  padding: "16px",
};

const cardCategory = {
  fontSize: "12px",
  color: "#999",
  margin: "0 0 8px",
};

const cardTitle = {
  fontSize: "16px",
  fontWeight: "bold",
  margin: "0 0 8px",
  cursor: "pointer",
  lineHeight: "1.3",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

const cardRating = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  marginBottom: "8px",
};

const stars = {
  color: "#f39c12",
  fontSize: "12px",
  letterSpacing: "1px",
};

const ratingCount = {
  fontSize: "12px",
  color: "#999",
};

const priceRow = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "8px",
};

const currentPrice = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#e74c3c",
};

const originalPrice = {
  fontSize: "14px",
  color: "#999",
  textDecoration: "line-through",
};

const stockRow = {
  marginBottom: "12px",
};

const inStockText = {
  fontSize: "12px",
  color: "#27ae60",
};

const outOfStockText = {
  fontSize: "12px",
  color: "#e74c3c",
};

const addToCartBtn = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#27ae60",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  fontSize: "14px",
};

export default ProductsPage;
