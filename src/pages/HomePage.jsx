// ============================================
// HOMEPAGE - MODERN PREMIUM ECOMMERCE
// ============================================
import { useState, useEffect, useMemo } from "react";
import { getProducts } from "../services/productService";
import { getBanners } from "../services/bannerService";
import { CATEGORIES } from "../constants/productMeta";
import { companyInfo, companySocial } from "../data/company";

import {
  BannerSection,
  FeaturesBar,
  CategoryGridSection,
  CategoryProductSection,
  FeaturedProductsSection,
  EcosystemSection,
  AboutSection,
  ContactSection,
  FloatingContactButtons,
} from "./home/components";

// ============================================
// CONSTANTS
// ============================================
const PRODUCTS_LIMIT = {
  category: 10,
  featured: 8,
  topCategory: 10,
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

  // const categoriesWithProducts = useMemo(() => {
  //   return CATEGORIES.filter((cat) =>
  //     products.some((p) => p.category === cat.id)
  //   );
  // }, [products]);
  const categoriesWithProducts = CATEGORIES;

  const topCategories = categoriesWithProducts.slice(0, PRODUCTS_LIMIT.topCategory);

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="w-full min-h-screen">
      {/* ============================================ */}
      {/* BANNER - FULL WIDTH (w-full) */}
      {/* ============================================ */}
      <div className="w-full">
        <BannerSection
          banners={banners}
          current={current}
          setCurrent={setCurrent}
        />
      </div>

      {/* ============================================ */}
      {/* FLOATING CONTACT BUTTONS */}
      {/* ============================================ */}
      <FloatingContactButtons />

      {/* ============================================ */}
      {/* CONTENT - CONSTRAINED (max-width) */}
      {/* ============================================ */}
      <div className="max-w-[1400px] mx-auto px-6">
     
        {/* Ecosystem Section */}
        <EcosystemSection />
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
        {/* {products.length > 0 && (
          <FeaturedProductsSection
            products={getFeaturedProducts()}
            loading={loading}
          />
        )} */}



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

export default HomePage;
