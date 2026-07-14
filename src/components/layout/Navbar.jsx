import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  House,
  Package,
  Building2,
  Phone,
  ChevronDown,
} from "lucide-react";

import useCart from "@/features/cart/hooks/useCart";
import { getCategories } from "../../services/categoryService";
import { getProductsByCategory } from "../../services/productService";
import MobileNewsAccordion from "./MobileNewsAccordion";
import { TYPOGRAPHY } from "../../styles/designSystem";
import { getCategoryIcon } from "../../features/home/components/category/categoryIcons";

const CLOSE_DELAY_MS = 150;

const smartHomeItems = [
  {
    label: "Lumi",
    href: "/ecosystem/lumi",
    children: [
      { label: "Sản phẩm", href: "/products/lumi" },
      { label: "Tư vấn - Báo giá", href: "/ecosystem/lumi" },
    ],
  },
  {
    label: "Aqara",
    href: "/ecosystem/aqara",
    children: [
      { label: "Sản phẩm", href: "/products/aqara" },
      { label: "Tư vấn - Báo giá", href: "/ecosystem/aqara" },
    ],
  },
];

// const cameraItems = [
//   { label: "Hikvision", href: "/products?brand=hikvision" },
//   { label: "Ezviz", href: "/products?brand=ezviz" },
//   { label: "IMOU", href: "/products?brand=imou" },
//   { label: "Dahua", href: "/products?brand=dahua" },
// ];

const supportItems = [
 
  { label: "Giải pháp", href: "/blogs" },
  { label: "Công trình", href: "/projects" },
   { label: "Hướng dẫn", href: "/guides" },
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
      className="flex h-[510px] w-[1200px] overflow-hidden border border-slate-100 bg-white shadow-xl shadow-slate-200/60"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ maxWidth: "calc(100vw - 2rem)" }}
    >
      {/* Level 1 - Categories sidebar (300px) */}
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
                className={`flex w-full items-center gap-2 px-3 py-2 text-left transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-100 text-blue-600"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <IconComponent size={18} strokeWidth={2} />
                </span>
                <span className="flex-1 text-sm font-medium">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Level 2 - Products panel */}
      <div className="flex h-full flex-1 flex-col overflow-hidden p-5">
        {hoveredCategory ? (
          <>
            <div className="mb-3 flex shrink-0 items-center justify-between">
              <h3 className="text-base font-semibold text-slate-800">
                {hoveredCategory.name}
              </h3>
              <button
                type="button"
                onClick={() => {
                  onNavigate(`/products?category=${hoveredCategory.id}`);
                  onClose();
                }}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Xem tất cả
                <span className="ml-1">→</span>
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
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <p className="text-sm font-medium text-slate-400">
              Di chuột qua danh mục để xem sản phẩm
            </p>
          </div>
        )}
      </div>
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

  const [smartHomeOpen, setSmartHomeOpen] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const closeTimerRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  const isActive = (path) => {
    if (path === "/ecosystem") {
      return location.pathname.startsWith("/ecosystem");
    }
    if (path === "/products") {
      return location.pathname.startsWith("/products");
    }
    if (path === "/smart-home") {
      return location.pathname === "/smart-home";
    }
    return location.pathname === path;
  };

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const startCloseTimer = (delay = CLOSE_DELAY_MS) => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setSmartHomeOpen(false);
      setCameraOpen(false);
      setProductsOpen(false);
      setHoveredCategory(null);
    }, delay);
  };

  const handleAnyMenuEnter = () => {
    clearCloseTimer();
  };

  const handleAnyMenuLeave = () => {
    startCloseTimer(CLOSE_DELAY_MS);
  };

  const handleSmartHomeEnter = () => {
    clearCloseTimer();
    setSmartHomeOpen(true);
    setCameraOpen(false);
    setProductsOpen(false);
  };

  const handleCameraEnter = () => {
    clearCloseTimer();
    setCameraOpen(true);
    setSmartHomeOpen(false);
    setProductsOpen(false);
  };

  const handleProductsEnter = () => {
    clearCloseTimer();
    setProductsOpen(true);
    setSmartHomeOpen(false);
    setCameraOpen(false);
      if (categories.length > 0 && !hoveredCategory) {
    setHoveredCategory(categories[0]);
  }
  };

  useEffect(() => {
    const fetchCats = async () => {
      const cats = await getCategories();
      setCategories(cats);
    };
    fetchCats();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setSmartHomeOpen(false);
    setCameraOpen(false);
    setProductsOpen(false);
    setHoveredCategory(null);
    clearCloseTimer();
  }, [location]);

  useEffect(() => {
    if (categories.length === 0) return;
    const preloadProducts = async () => {
      const loadPromises = categories.map(async (category) => {
        try {
          const products = await getProductsByCategory(category.id, 12);
          setCategoryProducts((prev) =>
            prev[category.id] ? prev : { ...prev, [category.id]: products }
          );
        } catch (error) {
          console.error(`Error loading products for category ${category.id}:`, error);
        }
      });
      await Promise.all(loadPromises);
    };
    preloadProducts();
  }, [categories]);

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

  const closeAllDesktopDropdowns = () => {
    clearCloseTimer();
    setSmartHomeOpen(false);
    setCameraOpen(false);
    setProductsOpen(false);
    setHoveredCategory(null);
  };

  const handleCloseDropdown = () => {
    closeAllDesktopDropdowns();
  };

  return (
    <>
      <header
        className="fixed left-0 right-0 top-0 z-[1000] border-b border-slate-100 bg-white transition lg:relative"
        style={{
          boxShadow: isScrolled ? "0 4px 20px rgba(0,0,0,.08)" : "none",
        }}
      >
        <nav className="mx-auto flex h-[75px] max-w-[1200px] items-center justify-between gap-6 px-4 lg:px-6">
          {/* Logo */}
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

          {/* Desktop Menu */}
          <div className="hidden items-center gap-1 lg:flex">
            {/* Home */}
            <button
              type="button"
              onClick={handleGoHome}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-[15px] font-medium transition-colors duration-200 ${
                isActive("/")
                  ? "text-blue-600 font-semibold"
                  : "text-slate-700 hover:text-blue-600"
              }`}
            >
              Trang chủ
            </button>

            {/* Nhà thông minh */}
            <div
              className="relative"
              onMouseEnter={handleSmartHomeEnter}
              onMouseLeave={handleAnyMenuLeave}
            >
              <Link
                to="/smart-home"
                onClick={closeAllDesktopDropdowns}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-[15px] font-medium transition-colors duration-200 ${
                  isActive("/ecosystem")
                    ? "text-blue-600 font-semibold"
                    : "text-slate-700 hover:text-blue-600"
                }`}
              >
                Nhà thông minh
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 ${
                    smartHomeOpen ? "rotate-180" : ""
                  }`}
                />
              </Link>

              {smartHomeOpen && (
                <div className="absolute left-0 top-full z-[999] mt-[18px] w-60 overflow-hidden border-x border-b border-slate-300 bg-white">
                  <div className=" p-2">
                    {smartHomeItems.map((item, idx) => (
                      <div key={item.label}>
                        <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                          {item.label}
                        </div>
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.href}
                            onClick={closeAllDesktopDropdowns}
                            className="flex items-center justify-between  px-4 py-3 text-sm font-medium text-slate-700 transition-colors duration-150  hover:text-blue-600"
                          >
                            <span>{child.label}</span>
                            <span className="text-xs text-slate-400">›</span>
                          </Link>
                        ))}
                        {idx !== smartHomeItems.length - 1 && (
                          <div className="my-1.5 border-t border-slate-100" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Sản phẩm */}
            <div
              className="relative"
              onMouseEnter={handleProductsEnter}
              onMouseLeave={handleAnyMenuLeave}
            >
  <Link
    to="/products"
    className={`flex items-center gap-1.5 px-4 py-2.5 text-[15px] font-medium transition-colors duration-200 ${
      isActive("/products")
        ? "text-blue-600 font-semibold"
        : "text-slate-700 hover:text-blue-600"
    }`}
  >
    Sản phẩm
    <ChevronDown
      size={15}
      className={`transition-transform duration-200 ${
        productsOpen ? "rotate-180" : ""
      }`}
    />
  </Link>

              {productsOpen && categories.length > 0 && (
                <div className="absolute  left-[-574px] top-full z-[999] mt-[16px] w-[1200px] overflow-hidden  border border-slate-200 bg-white ">
                  <CategoryMegaMenu
                    categories={categories}
                    categoryProducts={categoryProducts}
                    hoveredCategory={hoveredCategory}
                    setHoveredCategory={setHoveredCategory}
                    onClose={handleCloseDropdown}
                    onNavigate={navigate}
                    onMouseEnter={handleAnyMenuEnter}
                    onMouseLeave={handleAnyMenuLeave}
                  />
                </div>
              )}
            </div>
            {/* Camera */}
            {/* <div
              className="relative"
              onMouseEnter={handleCameraEnter}
              onMouseLeave={handleAnyMenuLeave}
            >
              <Link
                to="/products?category=camera"
                onClick={closeAllDesktopDropdowns}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-[15px] font-medium transition-colors duration-200 ${
                  location.pathname === "/products" && location.search.includes("camera")
                    ? "text-blue-600 font-semibold"
                    : "text-slate-700 hover:text-blue-600"
                }`}
              >
                Camera
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 ${
                    cameraOpen ? "rotate-180" : ""
                  }`}
                />
              </Link>

              {cameraOpen && (
                <div className="absolute left-0 top-full z-[999] mt-0 w-48 overflow-hidden rounded-b-2xl border-x border-b border-slate-100 bg-white shadow-xl shadow-slate-200/60">
                  {cameraItems.map((item, idx) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={closeAllDesktopDropdowns}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition-colors duration-150 hover:bg-blue-50 hover:text-blue-600 ${
                        idx !== cameraItems.length - 1 ? "border-b border-slate-100" : ""
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="text-xs text-slate-400">›</span>
                    </Link>
                  ))}
                </div>
              )}
            </div> */}



            {/* Support links */}
            <div className="ml-2 flex items-center border-l border-slate-100 pl-3">
              {supportItems.map((item, idx) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`flex items-center px-3 py-2 text-[14px] font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? "text-blue-600 font-semibold"
                      : "text-slate-600 hover:text-blue-600"
                  } ${idx !== supportItems.length - 1 ? "border-r border-slate-100" : ""}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right actions */}
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
      </header>

      {/* Mobile Menu */}
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
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600"
            >
              <House size={18} />
              <span>Trang chủ</span>
            </button>

            <Link
              to="/products"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium text-slate-700 no-underline hover:bg-blue-50 hover:text-blue-600"
            >
              <Package size={18} />
              <span>Sản phẩm</span>
            </Link>

            <Link
              to="/about"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium text-slate-700 no-underline hover:bg-blue-50 hover:text-blue-600"
            >
              <Building2 size={18} />
              <span>Giới thiệu</span>
            </Link>

            <Link
              to="/contact"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium text-slate-700 no-underline hover:bg-blue-50 hover:text-blue-600"
            >
              <Phone size={18} />
              <span>Liên hệ</span>
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

            <Link
              to="/cart"
              className="mt-4 rounded-xl px-4 py-4 text-[15px] font-medium text-slate-700 no-underline hover:bg-blue-50 hover:text-blue-600"
            >
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
