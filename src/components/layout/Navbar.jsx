// ============================================
// MODERN NAVBAR COMPONENT
// ============================================
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { getCategories } from "../../services/categoryService";
import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BORDER_RADIUS,
  SHADOW,
  TRANSITION,
} from "../../styles/designSystem";
import { getCategoryIcon } from "../../pages/home/components/categoryIcons";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const location = useLocation();

  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      const cats = await getCategories();
      setCategories(cats);
    };
    fetchCategories();
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCategoryOpen(false);
  }, [location]);

  // Check if link is active
  const isActive = (path) => location.pathname === path;

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  // Top categories for dropdown (first 6)
  const topCategories = categories.slice(0, 6);

  return (
    <>
      <style>{navbarCSS}</style>
      <header
        className={`navbar ${isScrolled ? "scrolled" : ""}`}
      >
        <nav className="navbar-container">
          {/* Logo */}
          <Link
  to="/"
  className="flex items-center gap-3 group"
>
  <div className="flex flex-col leading-none">
            <span className="logo-text">
              <span className="logo-highlight">NHAT </span>MINH
            </span>
    <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-slate-500">
      NHÀ THÔNG MINH
    </span>
  </div>
</Link>

          {/* Desktop Menu */}
          <div className="navbar-menu desktop-only">
            <Link
              to="/"
              className={`menu-item ${isActive("/") ? "active" : ""}`}
            >
              Trang chủ
            </Link>

            <Link
              to="/products"
              className={`menu-item ${isActive("/products") ? "active" : ""}`}
            >
              Sản phẩm
            </Link>

            <Link
              to="/about"
              className={`menu-item ${isActive("/about") ? "active" : ""}`}
            >
              Giới thiệu
            </Link>
            <Link
              to="/solutions-by-house"
              className={`menu-item ${isActive("/solutions-by-house") ? "active" : ""}`}
            >
              Giải pháp
            </Link>
          </div>

          {/* Search Bar */}
          <form className="search-form desktop-only" onSubmit={handleSearch}>
            <div className="search-input-wrapper">
              <svg
                className="search-icon"
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
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* Icon Buttons */}
          <div className="navbar-actions">
            {/* Cart Button */}
            <Link to="/cart" className="icon-button cart-button">
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
                <span className="cart-badge">{totalItems > 99 ? "99+" : totalItems}</span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-menu-toggle mobile-only"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`hamburger ${isMobileMenuOpen ? "open" : ""}`}>
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-content">
          {/* Mobile Search */}
          <form className="mobile-search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="mobile-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {/* Mobile Links */}
          <Link to="/" className="mobile-menu-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Trang chủ
          </Link>

          <Link to="/products" className="mobile-menu-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            Sản phẩm
          </Link>

          <Link to="/about" className="mobile-menu-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Giới thiệu
          </Link>
                    <Link to="/solutions-by-house" className="mobile-menu-item">

            <svg
  width="20"
  height="20"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
>
  <path d="M9 18h6" />
  <path d="M10 22h4" />
  <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2V18h6v-1.3c0-.8.4-1.5 1-2A7 7 0 0 0 12 2z" />
</svg>
            Giải pháp
          </Link>

          {/* Mobile Categories */}
          <div className="mobile-categories">
            <p className="mobile-category-title">
              Danh mục sản phẩm
            </p>

            {categories.map((category) => {
              const Icon = getCategoryIcon(category.id);

              return (
                <Link
                  key={category.id}
                  to={`/products?category=${category.id}`}
                  className="mobile-category-item"
                >
                  <div className="mobile-category-icon">
                    <Icon size={22} strokeWidth={2} />
                  </div>

                  <span>{category.name}</span>
                </Link>
              );
            })}
          </div>

          <Link to="/cart" className="mobile-menu-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Giỏ hàng ({totalItems})
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

// CSS Styles
const navbarCSS = `
  /* ==================== NAVBAR ==================== */
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: ${COLORS.navbarBg};
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid ${COLORS.borderLight};
    transition: ${TRANSITION.default};
  }

  .navbar.scrolled {
    box-shadow: ${SHADOW.navbar};
  }

  .navbar-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: ${SPACING.navbarPaddingY} ${SPACING.navbarPaddingX};
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }

  /* ==================== LOGO ==================== */
  .navbar-logo {
    text-decoration: none;
    flex-shrink: 0;
  }

  .logo-text {
    font-size: ${TYPOGRAPHY.logoFontSize};
    font-weight: ${TYPOGRAPHY.logoFontWeight};
    color: ${COLORS.textPrimary};
    letter-spacing: -0.5px;
  }

  .logo-highlight {
    color: ${COLORS.accent};
  }

  /* ==================== DESKTOP MENU ==================== */
  .navbar-menu {
    display: flex;
    align-items: center;
    gap: ${SPACING.menuGap};
  }

  .menu-item {
    position: relative;
    padding: 10px 16px;
    color: ${COLORS.textSecondary};
    text-decoration: none;
    font-size: ${TYPOGRAPHY.menuFontSize};
    font-weight: 500;
    border-radius: ${BORDER_RADIUS.button};
    transition: ${TRANSITION.default};
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .menu-item:hover {
    color: ${COLORS.accent};
    background: ${COLORS.hoverBgAccent};
  }

  .menu-item.active {
    color: ${COLORS.textPrimary};
    background: linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent});
    box-shadow: ${SHADOW.buttonGlow};
  }

  /* ==================== SEARCH ==================== */
  .search-form {
    flex: 1;
    max-width: 400px;
  }

  .search-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .search-icon {
    position: absolute;
    left: 14px;
    color: ${COLORS.textMuted};
    pointer-events: none;
  }

  .search-input {
    width: 100%;
    padding: 10px 14px 10px 42px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid ${COLORS.borderLight};
    border-radius: ${BORDER_RADIUS.input};
    color: ${COLORS.textPrimary};
    font-size: 14px;
    transition: ${TRANSITION.default};
  }

  .search-input::placeholder {
    color: ${COLORS.textMuted};
  }

  .search-input:focus {
    outline: none;
    border-color: ${COLORS.accent};
    box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.15);
  }

  /* ==================== ICON BUTTONS ==================== */
  .navbar-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .icon-button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    background: transparent;
    border: none;
    border-radius: ${BORDER_RADIUS.button};
    color: ${COLORS.textSecondary};
    cursor: pointer;
    transition: ${TRANSITION.default};
    text-decoration: none;
  }

  .icon-button:hover {
    background: ${COLORS.hoverBgAccentStrong};
    color: ${COLORS.accent};
    transform: translateY(-1px);
  }

  .cart-badge {
    position: absolute;
    top: 4px;
    right: 4px;
    min-width: 18px;
    height: 18px;
    padding: 0 5px;
    background: ${COLORS.error};
    color: white;
    font-size: 10px;
    font-weight: 700;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* ==================== MOBILE MENU TOGGLE ==================== */
  .mobile-menu-toggle {
    display: none;
    width: 42px;
    height: 42px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  .hamburger {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 100%;
    height: 100%;
  }

  .hamburger span {
    display: block;
    width: 22px;
    height: 2px;
    background: ${COLORS.textPrimary};
    border-radius: 2px;
    transition: ${TRANSITION.default};
  }

  .hamburger.open span:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }

  .hamburger.open span:nth-child(2) {
    opacity: 0;
  }

  .hamburger.open span:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  /* ==================== MOBILE MENU ==================== */
  .mobile-menu {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${COLORS.secondary};
    z-index: 999;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    overflow-y: auto;
  }

  .mobile-menu.open {
    transform: translateX(0);
  }

  .mobile-menu-content {
    padding: 20px;
  }

  .mobile-search-form {
    margin-bottom: 20px;
  }

  .mobile-search-input {
    width: 100%;
    padding: 14px 16px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid ${COLORS.borderLight};
    border-radius: ${BORDER_RADIUS.input};
    color: ${COLORS.textPrimary};
    font-size: 14px;
  }

  .mobile-search-input::placeholder {
    color: ${COLORS.textMuted};
  }

  .mobile-menu-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px;
    color: ${COLORS.textSecondary};
    text-decoration: none;
    font-size: 15px;
    font-weight: 500;
    border-radius: ${BORDER_RADIUS.button};
    transition: ${TRANSITION.fast};
  }

  .mobile-menu-item:hover {
    background: ${COLORS.hoverBgAccent};
    color: ${COLORS.accent};
  }

  .mobile-categories {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid ${COLORS.borderLight};
  }

  .mobile-category-title {
    color: ${COLORS.textMuted};
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 12px;
    padding: 0 16px;
  }

  .mobile-category-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    color: ${COLORS.textSecondary};
    text-decoration: none;
    font-size: 14px;
    border-radius: ${BORDER_RADIUS.button};
    transition: ${TRANSITION.fast};
  }

  .mobile-category-item:hover {
    background: ${COLORS.hoverBgAccent};
  }

  .mobile-category-icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background: ${COLORS.hoverBgAccent};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${COLORS.accent};
  }

  .mobile-menu-overlay {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 998;
  }

  /* ==================== RESPONSIVE ==================== */
  .desktop-only {
    display: flex;
  }

  .mobile-only {
    display: none;
  }

  @media (max-width: ${COLORS.breakpointMobile || "768px"}) {
    .desktop-only {
      display: none !important;
    }

    .mobile-only {
      display: flex !important;
    }

    .navbar-container {
      padding: 12px 16px;
    }

    .search-form {
      display: none;
    }
  }
`;

export default Navbar;
