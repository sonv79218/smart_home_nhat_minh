// ============================================
// HOMEPAGE - UNIFIED DESIGN SYSTEM
// Seamless sections with consistent styling and dividers
// ============================================
import { useState, useEffect } from "react";
import { getFeaturedProducts, getProductsByCategory } from "../services/productService";
import { getCategories } from "../services/categoryService";
import { getActiveBanners } from "../services/bannerService";
import { getActiveSolutions } from "../services/solutionService";
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
  SolutionSection,
  CategorySidebar,
} from "./home/components";

// ============================================
// CONSTANTS
// ============================================
const PRODUCTS_LIMIT = {
  category: 10,
  featured: 8,
  topCategory: 10,
};

// Section divider component
const SectionDivider = () => (
  <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
);

const HomePage = () => {
  const { offlineMode } = useApp();
  const [current, setCurrent] = useState(0);
  const [banners, setBanners] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);

  // ============================================
  // DATA FETCHING
  // ============================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch categories from JSON
        const categoriesData = await getCategories();
        setCategories(categoriesData);

        // Fetch banners
        const bannersData = await getActiveBanners();
        setBanners(bannersData);

        // Fetch featured products
        const featured = await getFeaturedProducts(PRODUCTS_LIMIT.featured);
        setFeaturedProducts(featured);

        // Fetch solutions
        const solutionsData = await getActiveSolutions();
        setSolutions(solutionsData);

        // Fetch products by category
        const categoryProducts = {};
        for (const category of categoriesData.slice(0, PRODUCTS_LIMIT.topCategory)) {
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

  const topCategories = categories.slice(0, PRODUCTS_LIMIT.topCategory);

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="w-full min-h-screen bg-white">
      {/* ============================================ */}
      {/* OFFLINE NOTICE */}
      {/* ============================================ */}
      {offlineMode && <OfflineNotice />}

      {/* ============================================ */}
      {/* HERO: Sidebar + Banner + Categories */}
      {/* ============================================ */}
      <div className="w-full flex">
        {/* Category Sidebar - Desktop only (hidden on mobile) */}
        <CategorySidebar categories={categories} />

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Banner */}
          <BannerSection
            banners={banners}
            current={current}
            setCurrent={setCurrent}
          />


        </div>
      </div>

      {/* Divider */}
      <SectionDivider />
          {/* Category Grid - Connected with gradient */}
          <div className="w-full bg-gradient-to-b from-slate-50 to-white">
            {topCategories.length > 0 && (
              <CategoryGridSection categories={topCategories} />
            )}
          </div>
      {/* <CategoryGridSection/> */}

      {/* ============================================ */}
      {/* ECOSYSTEM SECTION */}
      {/* ============================================ */}
      <EcosystemSection />

      {/* Divider */}
      <SectionDivider />

      {/* ============================================ */}
      {/* SOLUTIONS SECTION */}
      {/* ============================================ */}
      {solutions.length > 0 && (
        <SolutionSection solutions={solutions} />
      )}

      {/* Divider */}
      <SectionDivider />

      {/* ============================================ */}
      {/* FLOATING CONTACT BUTTONS */}
      {/* ============================================ */}
      <FloatingContactButtons />

      {/* ============================================ */}
      {/* CATEGORY PRODUCTS */}
      {/* ============================================ */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {topCategories.map((category, index) => {
          const categoryProducts = productsByCategory[category.id] || [];
          if (categoryProducts.length === 0) return null;
          return (
            <div key={category.id}>
              <CategoryProductSection
                category={category}
                products={categoryProducts}
                viewAllLink={`/products?category=${category.id}`}
                maxProducts={PRODUCTS_LIMIT.category}
              />
              {/* Divider between category sections */}
              {index < topCategories.length - 1 && <SectionDivider />}
            </div>
          );
        })}
      </div>

      {/* ============================================ */}
      {/* ABOUT SECTION */}
      {/* ============================================ */}
      <SectionDivider />
      <AboutSection companyInfo={companyInfo} />

      {/* ============================================ */}
      {/* FEATURES BAR */}
      {/* ============================================ */}
      <SectionDivider />
      <FeaturesBar />

      {/* ============================================ */}
      {/* CONTACT SECTION */}
      {/* ============================================ */}
      <SectionDivider />
      <ContactSection
        companyInfo={companyInfo}
        companySocial={companySocial}
      />
    </div>
  );
};

export default HomePage;
