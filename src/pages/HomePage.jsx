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
  MegaCategoryMenu,
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
  const [hoveredCategory, setHoveredCategory] = useState(null);

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
      {/* HERO: Sidebar + Banner + Mega Menu */}
      {/* ============================================ */}
      {/* <div className="w-full max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-0 lg:px-4 xl:px-6 pt-4"> */}
      <div className="w-full max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-0 py-0 lg:px-4 lg:py-4 xl:px-6">
        {/* Desktop Hero Grid */}
        <div
          // className="relative hidden lg:grid grid-cols-[300px_1fr] h-[420px] xl:h-[460px] overflow-hidden rounded-2xl"
            className="
    relative hidden lg:grid
    grid-cols-[300px_1fr]
    h-[clamp(475px,28vw,600px)]
    overflow-hidden rounded-2xl
  "
          onMouseLeave={() => setHoveredCategory(null)}
        >
          {/* Category Sidebar */}
          <CategorySidebar
            categories={categories}
            hoveredCategory={hoveredCategory}
            setHoveredCategory={setHoveredCategory}
          />

          {/* Hero Banner */}
          <div className="h-full overflow-hidden rounded-r-2xl">
            <BannerSection
              className="h-full"
              banners={banners}
              current={current}
              setCurrent={setCurrent}
            />
          </div>

          {/* Mega Category Menu - overlays entire hero area */}
          {hoveredCategory && (
            <MegaCategoryMenu
              category={hoveredCategory}
              products={productsByCategory[hoveredCategory.id] || []}
            />
          )}
        </div>

        {/* Mobile Banner (shown when lg grid is hidden) */}
        <div className="lg:hidden h-[260px] sm:h-[320px] md:h-[400px]">
          <BannerSection
            banners={banners}
            current={current}
            setCurrent={setCurrent}
            className="h-full"
          />
        </div>
      </div>
      {/* Divider */}
      <SectionDivider />
{/* MOBILE: Category trước Solution */}
<div className="lg:hidden">
  <SectionDivider />

  <div className="w-full bg-gradient-to-b from-slate-50 to-white">
    {topCategories.length > 0 && (
      <CategoryGridSection categories={topCategories} />
    )}
  </div>

  <SectionDivider />

  {solutions.length > 0 && (
    <SolutionSection solutions={solutions} />
  )}
</div>

{/* DESKTOP: Solution trước Category */}
<div className="hidden lg:block">
  <SectionDivider />

  {solutions.length > 0 && (
    <SolutionSection solutions={solutions} />
  )}

  <SectionDivider />

  <div className="w-full bg-gradient-to-b from-slate-50 to-white">
    {topCategories.length > 0 && (
      <CategoryGridSection categories={topCategories} />
    )}
  </div>
</div>
      {/* ============================================ */}
      {/* ECOSYSTEM SECTION */}
      {/* ============================================ */}
      <EcosystemSection />


      {/* Divider */}
      <SectionDivider />

      {/* ============================================ */}
      {/* FLOATING CONTACT BUTTONS */}
      {/* ============================================ */}
      {/* <FloatingContactButtons /> */}

      {/* ============================================ */}
      {/* CATEGORY PRODUCTS */}
      {/* ============================================ */}
      <div className="w-full max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-4 md:px-6">
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
