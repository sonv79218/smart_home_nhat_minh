// ============================================
// HOMEPAGE - UNIFIED DESIGN SYSTEM
// ============================================
import { useState, useEffect } from "react";
import { getFeaturedProducts, getProductsByCategory } from "@/services/productService";
import { getCategories } from "@/services/categoryService";
import { getActiveBanners } from "@/services/bannerService";
import { getActiveSolutions } from "@/services/solutionService";
import { useApp } from "@/contexts/AppContext";
import OfflineNotice from "@/components/common/OfflineNotice";

import {
  BannerSection,
  BannerSkeleton,
  DesktopBannerSkeleton,
  CategoryGridSection,
  EcosystemSection,
  SolutionSection,
  SectionDivider,
} from "@/features/home/components";

import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";

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
  const [categories, setCategories] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // ============================================
  // DATA FETCHING
  // ============================================
  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);

        const [categoriesData, bannersData, solutionsData, featured] =
          await Promise.all([
            getCategories(),
            getActiveBanners(),
            getActiveSolutions(),
            getFeaturedProducts(PRODUCTS_LIMIT.featured),
          ]);

        if (!mounted) return;

        setCategories(categoriesData);
        setBanners(bannersData);
        setSolutions(solutionsData);
        setFeaturedProducts(featured);
        setLoading(false);

        const categoryProductsEntries = await Promise.all(
          categoriesData
            .slice(0, PRODUCTS_LIMIT.topCategory)
            .map(async (category) => {
              const products = await getProductsByCategory(
                category.id,
                PRODUCTS_LIMIT.category
              );
              return [category.id, products];
            })
        );

        if (!mounted) return;

        const categoryProducts = Object.fromEntries(
          categoryProductsEntries.filter(([, products]) => products.length > 0)
        );

        setProductsByCategory(categoryProducts);
      } catch (error) {
        console.error("Error fetching homepage data:", error);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  const topCategories = categories.slice(0, PRODUCTS_LIMIT.topCategory);

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="w-full min-h-screen bg-white font-sans text-slate-900">
      {/* OFFLINE NOTICE */}
      {offlineMode && <OfflineNotice />}

      {/* ============================================ */}
      {/* HERO: Banner */}
      {/* ============================================ */}
      <div className="w-full max-w-[1200px] mx-auto px-0 py-0 lg:px-4 lg:py-4">
        {/* Desktop Banner */}
        <div className="hidden lg:block h-[clamp(475px,28vw,600px)] overflow-hidden rounded-b-2xl">
          {banners.length > 0 ? (
            <BannerSection
              className="h-full"
              banners={banners}
              current={current}
              setCurrent={setCurrent}
            />
          ) : (
            <DesktopBannerSkeleton />
          )}
        </div>

        {/* Mobile Banner */}
        <div className="lg:hidden h-[260px] sm:h-[320px] md:h-[400px]">
          {banners.length > 0 ? (
            <BannerSection
              banners={banners}
              current={current}
              setCurrent={setCurrent}
              className="h-full"
            />
          ) : (
            <BannerSkeleton className="h-full rounded-b-2xl" />
          )}
        </div>
      </div>

      {/* ============================================ */}
      {/* SOLUTION SECTION — bg-white */}
      {/* ============================================ */}
      <SectionDivider />
      {/* <SolutionSection solutions={solutions} isLoading={loading} /> */}

      {/* ============================================ */}
      {/* MOBILE: Category Grid — bg-slate-50 */}
      {/* ============================================ */}
      <div className="lg:hidden">
        <SectionDivider />
        <div className="w-full bg-slate-50">
          <CategoryGridSection categories={topCategories} isLoading={loading} />
        </div>
        <SectionDivider />
      </div>

      {/* ============================================ */}
      {/* ECOSYSTEM SECTION — bg-slate-50 */}
      {/* ============================================ */}
      <SectionDivider />


      {/* ============================================ */}
      {/* ABOUT & CONTACT */}
      {/* ============================================ */}
      <AboutPage />
            <EcosystemSection />
      <SectionDivider />
      <ContactPage />
    </div>
  );
};

export default HomePage;
