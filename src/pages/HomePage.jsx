// ============================================
// HOMEPAGE - MODERN PREMIUM ECOMMERCE
// OPTIMIZED: Firestore queries with pagination + Fallback support
// ============================================
import { useState, useEffect, useMemo } from "react";
import { getFeaturedProducts, getProductsByCategory } from "../services/productService";
import { getActiveBanners } from "../services/bannerService";
import { CATEGORIES } from "../constants/productMeta";
import { companyInfo, companySocial } from "../data/company";
import { useApp } from "../contexts/AppContext";
import OfflineNotice from "../components/common/OfflineNotice";

import {
  BannerSection,
  FeaturesBar,
  CategoryGridSection,
  CategoryProductSection,
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
  const { offlineMode } = useApp();
  const [current, setCurrent] = useState(0);
  const [banners, setBanners] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);

  // ============================================
  // DATA FETCHING - OPTIMIZED
  // ============================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch banners (only active ones)
        const bannersData = await getActiveBanners();
        setBanners(bannersData);

        // Fetch featured products
        const featured = await getFeaturedProducts(PRODUCTS_LIMIT.featured);
        setFeaturedProducts(featured);

        // Fetch products by category
        const categoryProducts = {};
        for (const category of CATEGORIES.slice(0, PRODUCTS_LIMIT.topCategory)) {
          const products = await getProductsByCategory(
            category.id,
            PRODUCTS_LIMIT.category
          );
          if (products.length > 0) {
            categoryProducts[category.id] = products;
          }
        }
        setProductsByCategory(categoryProducts);
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ============================================
  // FILTERED CATEGORIES - Only categories with products
  // ============================================
  // const categoriesWithProducts = useMemo(() => {
  //   return CATEGORIES.filter((cat) => productsByCategory[cat.id]?.length > 0);
  // }, [productsByCategory]);
  const categoriesWithProducts = CATEGORIES;

  const topCategories = categoriesWithProducts.slice(0, PRODUCTS_LIMIT.topCategory);

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="w-full min-h-screen">
      {/* ============================================ */}
      {/* OFFLINE NOTICE - Fallback Mode Banner */}
      {/* ============================================ */}
      {offlineMode && <OfflineNotice />}

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
        {/* Category Grid Section */}
        {topCategories.length > 0 && (
          <CategoryGridSection categories={topCategories} />
        )}
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
        


        {/* Category Product Sections - Optimized */}
        {topCategories.map((category) => {
          const categoryProducts = productsByCategory[category.id] || [];
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
