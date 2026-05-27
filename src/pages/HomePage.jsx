// ============================================
// HOMEPAGE - MAIN PAGE COMPONENT
// ============================================
import { useState, useEffect, useMemo } from "react";
import { getProducts } from "../services/productService";
import { getBanners } from "../services/bannerService";
import { CATEGORIES } from "../constants/productMeta";
import { companyInfo, companySocial } from "../data/company";

// Import section components
import {
  BannerSection,
  FeaturesBar,
  CategoryGridSection,
  CategoryProductSection,
  FeaturedProductsSection,
  EcosystemSection,
  AboutSection,
  ContactSection,
} from "./home/components";

// ============================================
// CONSTANTS
// ============================================
const PRODUCTS_LIMIT = {
  category: 10, // Desktop: 10 per category
  featured: 8,
  topCategory: 10,
};

const GRID_COLUMNS = {
  mobile: 2,
  tablet: 3,
  desktop: 4,
  large: 5,
};

const HomePage = () => {
  const [current, setCurrent] = useState(0);
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  // ============================================
  // DATA FETCHING
  // ============================================

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

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data.filter((p) => p.status === "active"));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
    fetchProducts();
  }, []);

  // ============================================
  // MEMOIZED DATA
  // ============================================

  // Get products by category (limited)
  const getProductsByCategory = useMemo(() => {
    return (categoryId, limit = PRODUCTS_LIMIT.category) => {
      return products
        .filter((p) => p.category === categoryId)
        .sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
        })
        .slice(0, limit);
    };
  }, [products]);

  // Get featured products (limited)
  const getFeaturedProducts = useMemo(() => {
    return () => {
      return [...products]
        .sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
        })
        .slice(0, PRODUCTS_LIMIT.featured);
    };
  }, [products]);

  // Filter categories that have products
  // const categoriesWithProducts = useMemo(() => {
  //   return CATEGORIES.filter((cat) =>
  //     products.some((p) => p.category === cat.id)
  //   );
  // }, [products]);
  const categoriesWithProducts = CATEGORIES;

  // Get top 6 categories for grid display
  const topCategories = categoriesWithProducts.slice(0, PRODUCTS_LIMIT.topCategory);

  // ============================================
  // RENDER
  // ============================================

  return (
    <div style={styles.pageWrapper}>
      <style>{globalStyles}</style>

      {/* ============================================ */}
      {/* BANNER - FULL WIDTH (100vw) */}
      {/* ============================================ */}
      <div style={styles.fullWidthSection}>
        <BannerSection
          banners={banners}
          current={current}
          setCurrent={setCurrent}
        />
      </div>
              {/* Ecosystem Section */}
        <EcosystemSection />

      {/* ============================================ */}
      {/* CONTENT - CONSTRAINED (max-width) */}
      {/* ============================================ */}
      <div style={styles.container}>


        {/* Category Grid Section */}
        {topCategories.length > 0 && (
          <CategoryGridSection categories={topCategories} />
        )}

        {/* Category Product Sections */}
        {categoriesWithProducts.map((category) => {
          const categoryProducts = getProductsByCategory(category.id);
          if (categoryProducts.length === 0) return null;
          return (
            <CategoryProductSection
              key={category.id}
              category={category}
              products={categoryProducts}
              viewAllLink={`/products?category=${category.id}`}
              maxProducts={PRODUCTS_LIMIT.category}
            />
          );
        })}

        {/* Featured Products Section */}
        {products.length > 0 && (
          <FeaturedProductsSection
            products={getFeaturedProducts()}
            loading={loading}
          />
        )}



        {/* About Section */}
        <AboutSection companyInfo={companyInfo} />
        {/* Features Bar */}
        <FeaturesBar />
        {/* Contact Section */}
        <ContactSection
          companyInfo={companyInfo}
          companySocial={companySocial}
        />
      </div>
    </div>
  );
};

// ============================================
// STYLES
// ============================================

const styles = {
  pageWrapper: {
    width: "100%",
    minHeight: "100vh",
  },
  fullWidthSection: {
    width: "100vw",
    position: "relative",
    left: "50%",
    right: "50%",
    marginLeft: "-50vw",
    marginRight: "-50vw",
    backgroundColor: "#0f172a",
  },
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 24px",
  },
};

const globalStyles = `
  /* ==================== GLOBAL RESET ==================== */
  * {
    box-sizing: border-box;
  }

  html {
    overflow-x: hidden;
  }

  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }

  /* ==================== GLOBAL ANIMATIONS ==================== */
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* ==================== RESPONSIVE GRID ==================== */
  @media (max-width: 576px) {
    .category-grid, .product-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }

  @media (min-width: 576px) {
    .category-grid {
      grid-template-columns: repeat(3, 1fr) !important;
    }
  }

  @media (min-width: 768px) {
    .category-grid {
      grid-template-columns: repeat(4, 1fr) !important;
    }
    .product-grid {
      grid-template-columns: repeat(3, 1fr) !important;
    }
  }

  @media (min-width: 992px) {
    .category-grid {
      grid-template-columns: repeat(5, 1fr) !important;
    }
    .product-grid {
      grid-template-columns: repeat(4, 1fr) !important;
    }
  }

  /* ==================== HOVER EFFECTS ==================== */
  @media (max-width: 768px) {
    .category-card, .product-card {
      transform: none !important;
    }
  }

  @media (min-width: 769px) {
    .category-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.12);
    }
    .category-card:hover .category-image {
      transform: scale(1.05);
    }
    .product-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(0,0,0,0.15);
    }
    .quick-action {
      opacity: 0 !important;
    }
    .product-card:hover .quick-action {
      opacity: 1 !important;
    }
  }

  .product-card, .category-card {
    animation: fadeIn 0.3s ease-out;
  }
`;

export default HomePage;
