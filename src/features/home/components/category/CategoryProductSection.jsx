// ============================================
// CATEGORY PRODUCT SECTION - UNIFIED DESIGN SYSTEM
// Seamless with consistent styling
// ============================================
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import SectionHeader from "@/components/common/SectionHeader";
import ProductCard from "./ProductCard";

const PRODUCTS_PER_PAGE = 8;

// ============================================
// SUB-COMPONENTS
// ============================================

const CategoryHeader = ({ category, productCount, viewAllLink }) => (
          <div className="flex items-center justify-center gap-4 mb-10">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-primary-200" />
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 uppercase tracking-wide text-center whitespace-nowrap">
            {category.name}
          </h2>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-primary-200" />
        </div>
  // <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
    
  //   <div className="flex items-center gap-3">
  //     <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-secondary">
  //       {category.name}
  //     </h2>

  //     {productCount > 0 && (
  //       <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
  //         {productCount} sản phẩm
  //       </span>
  //     )}
  //   </div>
  //   <Link
  //     to={viewAllLink || `/products?category=${category.id}`}
  //     className="
  //       flex items-center gap-1.5 
  //       text-xs md:text-sm font-semibold text-primary-600 
  //       px-3 py-1.5 rounded-lg 
  //       hover:bg-primary-50 transition-colors
  //     "
  //   >
  //     Xem tất cả
  //     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
  //       <path d="M9 18l6-6-6-6" />
  //     </svg>
  //   </Link>
  // </div>
);

const CategoryBanner = ({ banner }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!banner || !banner.image) return null;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="
        relative aspect-[18.2/3]
        rounded-xl md:rounded-2xl 
        overflow-hidden mb-5
        cursor-pointer
        transition-all duration-300
      "
    >
      <img
        src={banner.image}
        alt={banner.title || "Category Banner"}
        className={`
          w-full h-full object-contain object-center
          transition-transform duration-500
          ${isHovered ? "scale-105" : "scale-100"}
        `}
      />

      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/50 to-transparent" /> */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center p-5 md:p-8">
        {/* <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 md:mb-2 max-w-md">
          {banner.title}
        </h3>
        <p className="text-sm md:text-base text-white/80 max-w-md line-clamp-2 mb-3 md:mb-4">
          {banner.subtitle || banner.description}
        </p> */}
        {/* <Link
          to={banner.link || "#"}
          className="
            inline-flex items-center gap-2 
            px-4 py-2 md:px-5 md:py-2.5
            bg-white text-slate-900 font-semibold rounded-full
            w-fit text-xs md:text-sm
            hover:bg-primary-50 hover:text-primary-600
            transition-colors
          "
        >
          Khám phá ngay
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link> */}
      </div>
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-1.5 mt-6 flex-wrap">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="
          px-3 py-1.5 rounded-lg border border-slate-200
          text-xs md:text-sm font-medium
          disabled:opacity-40 disabled:cursor-not-allowed
          hover:bg-slate-50 transition
        "
      >
        Trước
      </button>

      {Array.from({ length: totalPages }).map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              w-8 h-8 md:w-9 md:h-9 rounded-lg text-xs md:text-sm font-semibold transition
              ${currentPage === page
                ? "bg-primary-600 text-white"
                : "border border-slate-200 hover:bg-slate-50"
              }
            `}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="
          px-3 py-1.5 rounded-lg border border-slate-200
          text-xs md:text-sm font-medium
          disabled:opacity-40 disabled:cursor-not-allowed
          hover:bg-slate-50 transition
        "
      >
        Sau
      </button>
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
const CategoryProductSection = ({
  category,
  products,
  viewAllLink,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (!products || products.length === 0) return null;

  const hasBanner = category.banner && category.banner.image;

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return products.slice(start, start + PRODUCTS_PER_PAGE);
  }, [products, currentPage]);

  // Reset page when products change
  useMemo(() => {
    setCurrentPage(1);
  }, [category.id]);

  return (
    <section className="py-8 md:py-12">
      <div className="w-full max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-4 md:px-6">
        {/* Header */}
        <CategoryHeader
          category={category}
          productCount={products.length}
          viewAllLink={viewAllLink || `/products?category=${category.id}`}
        />

        {/* Banner (Desktop only) */}
        {hasBanner && (
          <div className="hidden md:block">
            <CategoryBanner banner={category.banner} />
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 md:gap-4">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
};

export default CategoryProductSection;
