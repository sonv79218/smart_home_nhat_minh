
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const PRODUCTS_PER_PAGE = 8;

const CategoryHeader = ({ category, productCount, viewAllLink }) => (
  <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
    <div className="flex items-center gap-3">
      <h2 className="text-xl md:text-2xl font-bold text-secondary">
        {category.name}
      </h2>

      {productCount > 0 && (
        <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
          {productCount} sản phẩm
        </span>
      )}
    </div>

    <Link
      to={viewAllLink || `/products?category=${category.id}`}
      className="flex items-center gap-1.5 text-sm font-semibold text-primary-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
    >
      Xem tất cả

      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </Link>
  </div>
);

const CategoryBanner = ({ banner }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!banner || !banner.image) return null;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="
        relative h-64 md:h-72 lg:h-80 rounded-2xl md:rounded-3xl overflow-hidden mb-6
        cursor-pointer shadow-medium
        transition-all duration-500
      "
    >
      <img
        src={banner.image}
        alt={banner.title || "Category Banner"}
        className={`
          w-full h-full object-cover
          transition-transform duration-700
          ${isHovered ? "scale-105" : "scale-100"}
        `}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent" />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-10 lg:p-12">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-3 max-w-md">
          {banner.title}
        </h3>

        <p className="text-sm md:text-base text-white/80 mb-4 md:mb-6 max-w-md line-clamp-2">
          {banner.subtitle || banner.description}
        </p>

        <Link
          to={banner.link || "#"}
          className="
            inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3
            bg-gradient-to-r from-primary-600 to-accent
            text-white font-semibold rounded-full shadow-lg w-fit
            hover:-translate-y-0.5 hover:shadow-xl
            transition-all duration-200
          "
        >
          <span>{banner.buttonText || "Khám phá ngay"}</span>

          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="
          px-4 py-2 rounded-xl border border-slate-200
          text-sm font-medium
          disabled:opacity-50 disabled:cursor-not-allowed
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
              w-10 h-10 rounded-xl text-sm font-semibold transition
              ${
                currentPage === page
                  ? "bg-primary-600 text-white shadow-lg"
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
          px-4 py-2 rounded-xl border border-slate-200
          text-sm font-medium
          disabled:opacity-50 disabled:cursor-not-allowed
          hover:bg-slate-50 transition
        "
      >
        Sau
      </button>
    </div>
  );
};

const CategoryProductSection = ({
  category,
  products,
  viewAllLink,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (!products || products.length === 0) return null;

  const hasBanner =
    category.banner && category.banner.image;

  const link =
    viewAllLink ||
    `/products?category=${category.id}`;

  const totalPages = Math.ceil(
    products.length / PRODUCTS_PER_PAGE
  );

  const paginatedProducts = useMemo(() => {
    const start =
      (currentPage - 1) * PRODUCTS_PER_PAGE;

    return products.slice(
      start,
      start + PRODUCTS_PER_PAGE
    );
  }, [products, currentPage]);

  return (
    <section className="mb-10 md:mb-12">
      <CategoryHeader
        category={category}
        productCount={products.length}
        viewAllLink={link}
      />

{hasBanner && (
  <div className="hidden md:block">
    <CategoryBanner banner={category.banner} />
  </div>
)}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
        {paginatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
};

export default CategoryProductSection;
