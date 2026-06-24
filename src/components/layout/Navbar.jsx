import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import useCart from "@/features/cart/hooks/useCart";
import { getCategories } from "../../services/categoryService";
import { getProductsByCategory } from "../../services/productService";
import MobileNewsAccordion from "./MobileNewsAccordion";
import { TYPOGRAPHY } from "../../styles/designSystem";
import { getCategoryIcon } from "../../features/home/components/category/categoryIcons";

const brandItems = [
  { label: "Aqara", href: "/ecosystem/aqara" },
  { label: "Hunonic", href: "/ecosystem/hunonic" },
  { label: "Lumi", href: "/ecosystem/lumi" },
];

const cameraItems = [
  { label: "Hikvision", href: "/products?category=camera" },
  { label: "Ezviz", href: "/products?category=camera" },
  { label: "IMOU", href: "/products?category=camera" },
  { label: "Dahua", href: "/products?category=camera" },
];

const supportItems = [
  { label: "Hướng dẫn", href: "/guides" },
  { label: "Bài viết", href: "/blogs" },
  { label: "Công trình", href: "/projects" },
];

const CategoryMegaMenu = ({
  categories,
  categoryProducts,
  hoveredCategory,
  setHoveredCategory,
  onClose,
  onNavigate,
  onMouseEnter,
  onMouseLeave,
}) => {
  const products = hoveredCategory ? (categoryProducts[hoveredCategory.id] || []) : [];

  return (
    <div
  className={`absolute left-0 top-full z-[1200] mt-0 flex h-[570px] overflow-hidden rounded-b-2xl border border-slate-100 bg-white shadow-xl shadow-slate-200/70 ${
    hoveredCategory ? "w-[1200px]" : "w-[300px]"
  }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Level 1 - Categories (300px) */}
      <div className="flex h-full w-[300px] shrink-0 flex-col border-r border-slate-100 py-3">
        <div className="flex-1 overflow-y-auto">
          {categories.map((category) => {
            const IconComponent = getCategoryIcon(category.id);
            const isActive = hoveredCategory?.id === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onMouseEnter={() => setHoveredCategory(category)}
                onClick={() => {
                  onNavigate(`/products?category=${category.id}`);
                  onClose();
                }}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <IconComponent size={18} strokeWidth={2} />
                </span>
                <span className="flex-1 text-sm font-medium">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Level 2 - Products (mega menu panel - flex-1, about 900px) */}
      {hoveredCategory && (
      <div className="flex h-full flex-1 flex-col overflow-hidden p-5">
        <div className="mb-3 flex shrink-0 items-center justify-between">
          <h3 className="text-base font-semibold text-slate-800">
            {hoveredCategory?.name || "Sản phẩm"}
          </h3>
          <button
            type="button"
            onClick={() => {
              onNavigate(`/products?category=${hoveredCategory?.id}`);
              onClose();
            }}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Xem tất cả →
          </button>
        </div>

        {products.length === 0 ? (
          <div className="flex flex-1 items-center justify-center text-sm text-slate-400">
            Đang tải sản phẩm...
          </div>
        ) : (
          <div
            className="grid flex-1 content-start gap-4 overflow-y-auto"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}
          >
            {products.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => {
                  onNavigate(`/product/${product.id}`);
                  onClose();
                }}
                className="group/product text-left"
              >
                <div className="aspect-square overflow-hidden rounded-xl border border-slate-100 bg-slate-50 transition-shadow duration-200 group-hover/product:border-blue-200 group-hover/product:shadow-md">
                  <img
                    src={
                      product.thumbnail ||
                      product.image ||
                      product.imageUrl ||
                      product.images?.[0] ||
                      "/placeholder-product.png"
                    }
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-2">
                  <div className="line-clamp-2 text-sm font-medium text-slate-700 group-hover/product:text-blue-600">
                    {product.name}
                  </div>
                  {product.price && (
                    <div className="mt-1 text-sm font-semibold text-blue-600">
                      {typeof product.price === "number"
                        ? product.price.toLocaleString("vi-VN") + " đ"
                        : product.price}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState({});
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const closeTimerRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  useEffect(() => {
    const fetchCategories = async () => {
      const cats = await getCategories();
      setCategories(cats);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
    setHoveredCategory(null);
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
  }, [location]);

  // Preload products after categories load
  useEffect(() => {
    if (categories.length === 0) return;

    const preloadProducts = async () => {
      const loadPromises = categories.map(async (category) => {
        if (categoryProducts[category.id]) return;

        try {
          const products = await getProductsByCategory(category.id, 12);
          setCategoryProducts((prev) => ({
            ...prev,
            [category.id]: products,
          }));
        } catch (error) {
          console.error(`Error loading products for category ${category.id}:`, error);
        }
      });

      await Promise.all(loadPromises);
    };

    preloadProducts();
  }, [categories]);

const handleCategoryMouseEnter = () => {
  if (closeTimerRef.current) {
    clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  }

  setIsDropdownOpen(true);
};

  const handleCategoryMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
      setHoveredCategory(null);
    }, 150);
  };

  const handleCloseDropdown = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsDropdownOpen(false);
    setHoveredCategory(null);
  };

  const isActive = (path) => location.pathname === path;

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const closeMobileMenus = () => setIsMobileMenuOpen(false);

  const handleGoHome = () => {
    closeMobileMenus();

    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    navigate("/");
  };

  const menuItemClass = (path) =>
    [
      "relative flex cursor-pointer items-center gap-1.5",
      "rounded-xl px-4 py-2.5",
      "text-[15px] font-medium no-underline transition",
      "hover:bg-blue-50 hover:text-blue-600",
      isActive(path)
        ? "bg-blue-50 text-blue-600"
        : "text-slate-700",
    ].join(" ");

  const heroMenuLinkClass = `
    relative flex items-center justify-center
    text-[15px] font-semibold tracking-[-0.01em]
    text-slate-700
    transition-colors duration-200
    border-r border-slate-100
    hover:text-blue-600
    after:absolute after:left-6 after:right-6 after:bottom-0
    after:h-[2px] after:bg-blue-500
    after:scale-x-0 after:origin-center
    after:transition-transform after:duration-200
    hover:after:scale-x-100
  `;

  const supportLinkClass = `
    relative flex items-center justify-center
    text-[14px] font-medium tracking-[-0.01em]
    text-slate-600
    transition-colors duration-200
    hover:text-blue-600
    after:absolute after:left-5 after:right-5 after:bottom-0
    after:h-[2px] after:bg-blue-500
    after:scale-x-0 after:origin-center
    after:transition-transform after:duration-200
    hover:after:scale-x-100
  `;

  return (
    <>
      <header
        className="fixed left-0 right-0 top-0 z-[1000] border-b border-slate-100 bg-white transition"
        style={{
          boxShadow: isScrolled ? "0 4px 20px rgba(0,0,0,.08)" : "none",
        }}
      >
        <nav className="mx-auto flex h-[75px] max-w-[1200px] items-center justify-between gap-6 px-4 lg:px-6">
          <button
            type="button"
            onClick={handleGoHome}
            className="group flex shrink-0 cursor-pointer items-center gap-3"
          >
            <div className="flex flex-col leading-none">
              <span
                className="tracking-[-0.5px] text-slate-900"
                style={{
                  fontSize: TYPOGRAPHY.logoFontSize,
                  fontWeight: TYPOGRAPHY.logoFontWeight,
                }}
              >
                <span className="text-blue-600">NHAT </span>MINH
              </span>

              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 md:text-xs">
                NHÀ THÔNG MINH
              </span>
            </div>
          </button>

          <div className="hidden items-center gap-2 lg:flex">
            <button type="button" onClick={handleGoHome} className={menuItemClass("/")}>
              Trang chủ
            </button>

            <Link to="/products" className={menuItemClass("/products")}>
              Sản phẩm
            </Link>

            <Link to="/about" className={menuItemClass("/about")}>
              Giới thiệu
            </Link>

            <Link to="/contact" className={menuItemClass("/contact")}>
              Liên hệ
            </Link>
          </div>

          <form onSubmit={handleSearch} className="hidden max-w-[400px] flex-1 lg:block">
            <div className="relative flex items-center">
              <svg
                className="pointer-events-none absolute left-3.5 text-slate-400"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>

              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="
                  w-full rounded-xl border border-slate-200 bg-slate-50
                  py-2.5 pl-10 pr-3.5 text-sm text-slate-800
                  outline-none transition
                  placeholder:text-slate-400
                  focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100
                "
              />
            </div>
          </form>

          <div className="flex items-center gap-2">
            <Link
              to="/cart"
              className="
                relative flex h-[42px] w-[42px] items-center justify-center
                rounded-xl border border-slate-200 bg-white text-slate-600
                transition hover:-translate-y-0.5 hover:bg-slate-50 hover:text-blue-600
              "
            >
              <svg
                width={TYPOGRAPHY.iconSize}
                height={TYPOGRAPHY.iconSize}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>

              {totalItems > 0 && (
                <span className="absolute right-1 top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              className="flex h-[42px] w-[42px] items-center justify-center rounded-xl border border-slate-200 text-slate-800 lg:hidden"
            >
              <span className="flex flex-col items-center justify-center gap-[5px]">
                <span className="block h-0.5 w-[22px] rounded bg-current transition" />
                <span className="block h-0.5 w-[22px] rounded bg-current transition" />
                <span className="block h-0.5 w-[22px] rounded bg-current transition" />
              </span>
            </button>
          </div>
        </nav>

        <div className="hidden border-t border-slate-100 border-b border-slate-100 bg-white lg:block">
          <div className="mx-auto grid h-14 max-w-[1200px] grid-cols-[300px_1fr_320px] overflow-visible">
            {/* Category dropdown wrapper */}
            <div
                className="relative h-14 border-r border-slate-100"
              onMouseEnter={handleCategoryMouseEnter}
              onMouseLeave={handleCategoryMouseLeave}
            >
              <button
                type="button"
               className="flex h-14 w-full items-center justify-center gap-2 px-6 text-[14px] font-semibold tracking-[-0.01em] text-slate-800 transition-colors hover:bg-blue-50 hover:text-blue-600"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
                Danh mục sản phẩm
              </button>

              {isDropdownOpen && categories.length > 0 && (
          
                 <div className="flex  h-full w-full h-[520px] w-[1200px]">
                <CategoryMegaMenu
                  categories={categories}
                  categoryProducts={categoryProducts}
                  hoveredCategory={hoveredCategory}
                  setHoveredCategory={setHoveredCategory}
                  onClose={handleCloseDropdown}
                  onNavigate={navigate}
                  onMouseEnter={handleCategoryMouseEnter}
                  onMouseLeave={handleCategoryMouseLeave}
                />
              </div>
              )}
            </div>

            <div className="grid grid-cols-4">
              {brandItems.map((item) => (
                <Link key={item.label} to={item.href} className={heroMenuLinkClass}>
                  {item.label}
                </Link>
              ))}

              <div className="group relative h-full">
                <button type="button" className={`${heroMenuLinkClass} h-full w-full`}>
                  <span>Camera</span>
                  <span className="ml-1 text-[10px] transition-transform duration-200 group-hover:rotate-180">
                    ▼
                  </span>
                </button>

                <div className="invisible absolute left-1/2 top-full z-[999] w-full -translate-x-1/2 translate-y-2 overflow-hidden border border-slate-100 bg-white opacity-0 shadow-xl shadow-slate-200/60 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {cameraItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="flex items-center justify-between border-b border-slate-100 px-4 py-3 text-[14px] font-medium text-slate-700 transition-colors duration-200 last:border-b-0 hover:bg-slate-50 hover:text-blue-600"
                    >
                      <span>{item.label}</span>
                      <span className="text-xs text-slate-400">›</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3">
              {supportItems.map((item, index) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`${supportLinkClass} ${index !== supportItems.length - 1 ? "border-r border-slate-100" : ""}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div
        className={[
          "fixed bottom-0 left-0 right-0 top-[75px] z-[999] overflow-y-auto bg-white transition-transform duration-300 lg:hidden",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="mx-auto max-w-[1200px] p-5">
          <form onSubmit={handleSearch} className="mb-5">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </form>

          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={handleGoHome}
              className="rounded-xl px-4 py-4 text-left text-[15px] font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600"
            >
              Trang chủ
            </button>

            <Link to="/products" className="rounded-xl px-4 py-4 text-[15px] font-medium text-slate-700 no-underline hover:bg-blue-50 hover:text-blue-600">
              Sản phẩm
            </Link>

            <Link to="/about" className="rounded-xl px-4 py-4 text-[15px] font-medium text-slate-700 no-underline hover:bg-blue-50 hover:text-blue-600">
              Giới thiệu
            </Link>

            <Link to="/contact" className="rounded-xl px-4 py-4 text-[15px] font-medium text-slate-700 no-underline hover:bg-blue-50 hover:text-blue-600">
              Liên hệ
            </Link>

            <MobileNewsAccordion onNavigate={closeMobileMenus} />

            <div className="mt-5 border-t border-slate-100 pt-5">
              <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-[1px] text-slate-400">
                Danh mục sản phẩm
              </p>

              {categories.map((category) => {
                const Icon = getCategoryIcon(category.id);

                return (
                  <Link
                    key={category.id}
                    to={`/products?category=${category.id}`}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-700 no-underline hover:bg-blue-50 hover:text-blue-600"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <Icon size={22} strokeWidth={2} />
                    </span>

                    <span>{category.name}</span>
                  </Link>
                );
              })}
            </div>

            <Link to="/cart" className="mt-4 rounded-xl px-4 py-4 text-[15px] font-medium text-slate-700 no-underline hover:bg-blue-50 hover:text-blue-600">
              Giỏ hàng ({totalItems})
            </Link>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <button
          type="button"
          aria-label="Close mobile menu"
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 top-[75px] z-[998] bg-black/40 lg:hidden"
        />
      )}
    </>
  );
};

export default Navbar;
