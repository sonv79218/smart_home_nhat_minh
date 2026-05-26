import { useState, useEffect } from "react";
import { getProducts } from "../services/productService";
import { getBanners } from "../services/bannerService";
import { Link, useNavigate } from "react-router-dom";
import { companyInfo, companySocial } from "../data/company";
import ProductsPage from "./ProductsPage";
import useCart from "../hooks/useCart";

// Skeleton loader component
const Skeleton = ({ width, height, borderRadius = "8px" }) => (
  <div
    style={{
      width,
      height,
      borderRadius,
      background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.5s infinite",
    }}
  />
);

// Responsive breakpoints
const BREAKPOINTS = {
  mobile: "576px",
  tablet: "768px",
  desktop: "992px",
};

const HomePage = () => {
  const [current, setCurrent] = useState(0);
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Load banners from Firebase
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await getBanners();
        const activeBanners = data.filter((b) => b.isActive);
        setBanners(activeBanners);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };
    fetchBanners();
  }, []);

  // Auto slide banner
  useEffect(() => {
    if (banners.length === 0) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [banners.length]);

  // Load products
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        // Get featured/best seller products first, then fill with newest
        const sortedProducts = data
          .filter((p) => p.status === "active")
          .sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
          })
          .slice(0, 12);
        setProducts(sortedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBannerClick = () => {
    const banner = banners[current];
    if (banner?.link) {
      if (banner.link.startsWith("/")) {
        navigate(banner.link);
      } else {
        window.location.href = banner.link;
      }
    }
  };

  const formatPrice = (price, discountPrice) => {
    const finalPrice = discountPrice > 0 ? discountPrice : price;
    return Number(finalPrice || 0).toLocaleString("vi-VN");
  };

  const calculateDiscount = (price, discountPrice) => {
    if (!price || !discountPrice || discountPrice >= price) return 0;
    return Math.round(((price - discountPrice) / price) * 100);
  };

  return (
    <div style={styles.container}>
      <style>{keyframes}</style>

      {/* BANNER SECTION */}
      <section style={styles.bannerSection}>
        {banners.length > 0 ? (
          <div
            style={styles.bannerWrapper}
            onClick={handleBannerClick}
          >
            <img
              src={banners[current].image}
              alt={banners[current].title}
              style={styles.bannerImage}
            />

            <div style={styles.bannerOverlay} />

            <div style={styles.bannerContent}>
              <h1 style={styles.bannerTitle}>
                {banners[current].title}
              </h1>
              <p style={styles.bannerSubtitle}>
                {banners[current].subtitle}
              </p>
              <button style={styles.bannerButton}>
                Khám phá ngay
              </button>
            </div>

            {/* Dots navigation */}
            <div style={styles.dotsContainer}>
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrent(index);
                  }}
                  style={{
                    ...styles.dot,
                    ...(current === index ? styles.dotActive : {}),
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Arrow navigation */}
            {banners.length > 1 && (
              <>
                <button
                  style={{ ...styles.arrow, ...styles.arrowLeft }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
                  }}
                  aria-label="Previous slide"
                >
                  ‹
                </button>
                <button
                  style={{ ...styles.arrow, ...styles.arrowRight }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrent((prev) => (prev + 1) % banners.length);
                  }}
                  aria-label="Next slide"
                >
                  ›
                </button>
              </>
            )}
          </div>
        ) : (
          <div style={styles.bannerPlaceholder}>
            <p>Đang tải banner...</p>
          </div>
        )}
      </section>

      {/* FEATURES BAR */}
      <section style={styles.featuresBar}>
        <div style={styles.featuresGrid}>
          <div style={styles.featureItem}>
            <span style={styles.featureIcon}>🚚</span>
            <div>
              <p style={styles.featureTitle}>Miễn phí vận chuyển</p>
              <p style={styles.featureSubtitle}>Đơn hàng từ 500K</p>
            </div>
          </div>
          <div style={styles.featureItem}>
            <span style={styles.featureIcon}>🔒</span>
            <div>
              <p style={styles.featureTitle}>Thanh toán an toàn</p>
              <p style={styles.featureSubtitle}>100% bảo mật</p>
            </div>
          </div>
          <div style={styles.featureItem}>
            <span style={styles.featureIcon}>💬</span>
            <div>
              <p style={styles.featureTitle}>Hỗ trợ 24/7</p>
              <p style={styles.featureSubtitle}>Luôn sẵn sàng</p>
            </div>
          </div>
          <div style={styles.featureItem}>
            <span style={styles.featureIcon}>🔄</span>
            <div>
              <p style={styles.featureTitle}>Đổi trả dễ dàng</p>
              <p style={styles.featureSubtitle}>Trong 7 ngày</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section style={styles.productsSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>
            <span style={styles.titleIcon}>⭐</span>
            Sản phẩm nổi bật
          </h2>
          <Link to="/products" style={styles.viewAllLink}>
            Xem tất cả →
          </Link>
        </div>

        {loading ? (
          <div style={styles.productGrid} className="product-grid">
            {[...Array(8)].map((_, index) => (
              <div key={index} style={styles.productCardSkeleton}>
                <Skeleton width="100%" height="180px" borderRadius="12px 12px 0 0" />
                <div style={styles.skeletonContent}>
                  <Skeleton width="80%" height="16px" />
                  <Skeleton width="60%" height="14px" />
                  <Skeleton width="50%" height="20px" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div style={styles.productGrid} className="product-grid">
            {products.map((product) => {
              const discount = calculateDiscount(product.price, product.discountPrice);
              const hasDiscount = product.discountPrice > 0;

              return (
                <div
                  key={product.id}
                  style={styles.productCard}
                  className="product-card"
                >
                  <div
                    style={styles.productImageWrapper}
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <img
                      src={product.thumbnail || "/placeholder.png"}
                      alt={product.name}
                      style={styles.productImage}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />

                    {hasDiscount && (
                      <span style={styles.discountBadge}>
                        -{discount}%
                      </span>
                    )}

                    <div style={styles.productBadges}>
                      {product.newProduct && (
                        <span style={styles.badgeNew}>Mới</span>
                      )}
                      {product.bestSeller && (
                        <span style={styles.badgeHot}>Hot</span>
                      )}
                    </div>

                    <div style={styles.quickActions}>
                      <button
                        style={styles.quickAddBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        disabled={product.stock <= 0}
                      >
                        🛒 Thêm vào giỏ
                      </button>
                    </div>
                  </div>

                  <div style={styles.productInfo}>
                    <p style={styles.productCategory}>
                      {product.brand}
                    </p>

                    <h3
                      style={styles.productName}
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      {product.name}
                    </h3>

                    <div style={styles.productRating}>
                      <span style={styles.stars}>
                        {"★".repeat(Math.round(product.rating || 0))}
                        {"☆".repeat(5 - Math.round(product.rating || 0))}
                      </span>
                      <span style={styles.ratingCount}>
                        ({product.ratingCount || 0})
                      </span>
                    </div>

                    <div style={styles.priceContainer}>
                      <span style={styles.currentPrice}>
                        {formatPrice(product.price, product.discountPrice)}đ
                      </span>
                      {hasDiscount && (
                        <span style={styles.originalPrice}>
                          {Number(product.price).toLocaleString()}đ
                        </span>
                      )}
                    </div>

                    <div style={styles.stockStatus}>
                      {product.stock > 0 ? (
                        <span style={styles.inStock}>✓ Còn hàng</span>
                      ) : (
                        <span style={styles.outOfStock}>✗ Hết hàng</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <p>Chưa có sản phẩm nào</p>
            <Link to="/products" style={styles.shopNowBtn}>
              Mua sắm ngay
            </Link>
          </div>
        )}
      </section>
      <ProductsPage />
      {/* COMPANY INFO SECTION */}
      <section style={styles.aboutSection}>
        <div style={styles.aboutGrid}>
          <div style={styles.aboutMain}>
            <h2 style={styles.aboutTitle}>{companyInfo.name}</h2>
            <p style={styles.aboutSlogan}>{companyInfo.slogan}</p>
            <p style={styles.aboutIntro}>{companyInfo.intro}</p>
          </div>

          <div style={styles.aboutCards}>
            <div style={styles.aboutCard}>
              <div style={styles.aboutIcon}>🎯</div>
              <h3 style={styles.aboutCardTitle}>Tầm nhìn</h3>
              <p style={styles.aboutCardText}>{companyInfo.vision}</p>
            </div>

            <div style={styles.aboutCard}>
              <div style={styles.aboutIcon}>⚡</div>
              <h3 style={styles.aboutCardTitle}>Sứ mệnh</h3>
              <p style={styles.aboutCardText}>{companyInfo.mission}</p>
            </div>

            <div style={styles.aboutCard}>
              <div style={styles.aboutIcon}>💎</div>
              <h3 style={styles.aboutCardTitle}>Giá trị</h3>
              <ul style={styles.valuesList}>
                {companyInfo.values.map((value, index) => (
                  <li key={index} style={styles.valueItem}>
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section style={styles.contactSection}>
        <h2 style={styles.contactTitle}>Kết nối với chúng tôi</h2>

        <div style={styles.contactGrid}>
          <div style={styles.contactInfo}>
            <p style={styles.contactItem}>📍 {companyInfo.address}</p>
            <p style={styles.contactItem}>📞 {companyInfo.phone}</p>
            <p style={styles.contactItem}>✉️ {companyInfo.email}</p>
          </div>

          <div style={styles.socialLinks}>
            <a
              href={companySocial.facebook}
              target="_blank"
              rel="noreferrer"
              style={styles.socialLink}
            >
              <span style={styles.socialIcon}>📘</span>
              Facebook
            </a>
            <a
              href={companySocial.tiktok}
              target="_blank"
              rel="noreferrer"
              style={styles.socialLink}
            >
              <span style={styles.socialIcon}>🎵</span>
              TikTok
            </a>
            <a
              href={companySocial.youtube}
              target="_blank"
              rel="noreferrer"
              style={styles.socialLink}
            >
              <span style={styles.socialIcon}>▶️</span>
              YouTube
            </a>
            <a
              href={companySocial.zalo}
              target="_blank"
              rel="noreferrer"
              style={styles.socialLink}
            >
              <span style={styles.socialIcon}>💬</span>
              Zalo
            </a>
          </div>
        </div>
      </section>

      {/* CSS for responsive and animations */}
      <style>{`
        /* Responsive product grid */
        @media (min-width: 576px) {
          .product-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }

        @media (min-width: 768px) {
          .product-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }

        @media (min-width: 992px) {
          .product-grid {
            grid-template-columns: repeat(5, 1fr) !important;
          }
        }

        @media (max-width: 576px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: ${BREAKPOINTS.mobile}) {
          .product-card:hover {
            transform: translateY(-2px);
          }
        }

        @media (min-width: ${BREAKPOINTS.tablet}) {
          .product-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 24px rgba(0,0,0,0.15);
          }
          .quick-actions {
            opacity: 0 !important;
          }
          .product-card:hover .quick-actions {
            opacity: 1 !important;
          }
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .product-card {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

const keyframes = `
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;

const styles = {
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 16px",
  },

  // Banner Section
  bannerSection: {
    marginBottom: "32px",
  },
  bannerWrapper: {
    position: "relative",
    height: "clamp(180px, 40vw, 400px)",
    overflow: "hidden",
    borderRadius: "16px",
    cursor: "pointer",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.5s ease",
  },
  bannerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
  },
  bannerContent: {
    position: "absolute",
    top: "50%",
    left: "clamp(20px, 5vw, 60px)",
    transform: "translateY(-50%)",
    color: "white",
    maxWidth: "500px",
  },
  bannerTitle: {
    fontSize: "clamp(24px, 5vw, 42px)",
    fontWeight: "700",
    marginBottom: "12px",
    textShadow: "2px 2px 8px rgba(0,0,0,0.3)",
    lineHeight: "1.2",
  },
  bannerSubtitle: {
    fontSize: "clamp(14px, 2vw, 18px)",
    marginBottom: "20px",
    textShadow: "1px 1px 4px rgba(0,0,0,0.3)",
    opacity: 0.95,
  },
  bannerButton: {
    padding: "12px 28px",
    backgroundColor: "#27ae60",
    color: "white",
    border: "none",
    borderRadius: "25px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(39, 174, 96, 0.4)",
  },
  bannerPlaceholder: {
    height: "clamp(180px, 40vw, 400px)",
    backgroundColor: "#f5f5f5",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#999",
  },
  dotsContainer: {
    position: "absolute",
    bottom: "16px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "8px",
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "rgba(255,255,255,0.5)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    padding: 0,
  },
  dotActive: {
    width: "24px",
    borderRadius: "4px",
    backgroundColor: "white",
  },
  arrow: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "rgba(255,255,255,0.9)",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#333",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    transition: "all 0.2s ease",
  },
  arrowLeft: {
    left: "16px",
  },
  arrowRight: {
    right: "16px",
  },

  // Features Bar
  featuresBar: {
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "32px",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  featureIcon: {
    fontSize: "28px",
  },
  featureTitle: {
    fontSize: "13px",
    fontWeight: "600",
    margin: 0,
    color: "#333",
  },
  featureSubtitle: {
    fontSize: "11px",
    margin: 0,
    color: "#666",
  },

  // Products Section
  productsSection: {
    marginBottom: "48px",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "12px",
  },
  sectionTitle: {
    fontSize: "clamp(18px, 3vw, 24px)",
    fontWeight: "700",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  titleIcon: {
    fontSize: "24px",
  },
  viewAllLink: {
    color: "#27ae60",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "14px",
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "clamp(10px, 2vw, 16px)",
  },
  productCardSkeleton: {
    backgroundColor: "white",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  skeletonContent: {
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  productCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
  },
  productImageWrapper: {
    position: "relative",
    cursor: "pointer",
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    aspectRatio: "1/1",
    objectFit: "cover",
    display: "block",
  },
  discountBadge: {
    position: "absolute",
    top: "8px",
    right: "8px",
    backgroundColor: "#e74c3c",
    color: "white",
    padding: "4px 8px",
    borderRadius: "6px",
    fontSize: "11px",
    fontWeight: "700",
  },
  productBadges: {
    position: "absolute",
    top: "8px",
    left: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  badgeNew: {
    backgroundColor: "#3498db",
    color: "white",
    padding: "3px 6px",
    borderRadius: "4px",
    fontSize: "10px",
    fontWeight: "700",
  },
  badgeHot: {
    backgroundColor: "#e74c3c",
    color: "white",
    padding: "3px 6px",
    borderRadius: "4px",
    fontSize: "10px",
    fontWeight: "700",
  },
  quickActions: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "8px",
    background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
  quickAddBtn: {
    width: "100%",
    padding: "8px",
    backgroundColor: "#27ae60",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
  },
  productInfo: {
    padding: "clamp(10px, 2vw, 14px)",
  },
  productCategory: {
    fontSize: "11px",
    color: "#999",
    margin: "0 0 4px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  productName: {
    fontSize: "clamp(12px, 1.5vw, 14px)",
    fontWeight: "600",
    margin: "0 0 6px",
    color: "#333",
    lineHeight: "1.3",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    cursor: "pointer",
  },
  productRating: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    marginBottom: "6px",
  },
  stars: {
    color: "#f39c12",
    fontSize: "11px",
    letterSpacing: "1px",
  },
  ratingCount: {
    fontSize: "11px",
    color: "#999",
  },
  priceContainer: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    flexWrap: "wrap",
  },
  currentPrice: {
    fontSize: "clamp(14px, 2vw, 16px)",
    fontWeight: "700",
    color: "#e74c3c",
  },
  originalPrice: {
    fontSize: "12px",
    color: "#999",
    textDecoration: "line-through",
  },
  stockStatus: {
    marginTop: "6px",
  },
  inStock: {
    fontSize: "11px",
    color: "#27ae60",
    fontWeight: "500",
  },
  outOfStock: {
    fontSize: "11px",
    color: "#e74c3c",
    fontWeight: "500",
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#999",
  },
  shopNowBtn: {
    display: "inline-block",
    marginTop: "16px",
    padding: "12px 24px",
    backgroundColor: "#27ae60",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "600",
  },

  // About Section
  aboutSection: {
    padding: "48px 0",
    borderTop: "1px solid #eee",
    marginBottom: "32px",
  },
  aboutGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "32px",
  },
  aboutMain: {
    textAlign: "center",
  },
  aboutTitle: {
    fontSize: "clamp(22px, 4vw, 32px)",
    fontWeight: "700",
    margin: "0 0 8px",
    color: "#27ae60",
  },
  aboutSlogan: {
    fontSize: "16px",
    color: "#666",
    margin: "0 0 16px",
    fontStyle: "italic",
  },
  aboutIntro: {
    fontSize: "14px",
    lineHeight: "1.8",
    color: "#555",
    margin: 0,
  },
  aboutCards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "32px",
  },
  aboutCard: {
    backgroundColor: "#f8f9fa",
    padding: "24px",
    borderRadius: "12px",
    textAlign: "center",
  },
  aboutIcon: {
    fontSize: "36px",
    marginBottom: "12px",
  },
  aboutCardTitle: {
    fontSize: "16px",
    fontWeight: "600",
    margin: "0 0 8px",
    color: "#333",
  },
  aboutCardText: {
    fontSize: "14px",
    color: "#666",
    margin: 0,
    lineHeight: "1.6",
  },
  valuesList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    textAlign: "left",
  },
  valueItem: {
    fontSize: "13px",
    color: "#555",
    padding: "4px 0",
    borderBottom: "1px solid #eee",
  },

  // Contact Section
  contactSection: {
    backgroundColor: "#f8f9fa",
    padding: "32px",
    borderRadius: "16px",
    marginBottom: "32px",
    textAlign: "center",
  },
  contactTitle: {
    fontSize: "20px",
    fontWeight: "600",
    margin: "0 0 20px",
    color: "#333",
  },
  contactGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "20px",
  },
  contactInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  contactItem: {
    fontSize: "14px",
    color: "#555",
    margin: 0,
  },
  socialLinks: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    flexWrap: "wrap",
  },
  socialLink: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "10px 16px",
    backgroundColor: "white",
    borderRadius: "8px",
    textDecoration: "none",
    color: "#333",
    fontSize: "14px",
    fontWeight: "500",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    transition: "all 0.2s ease",
  },
  socialIcon: {
    fontSize: "18px",
  },
};

export default HomePage;
