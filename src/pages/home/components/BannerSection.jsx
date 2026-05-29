// ============================================
// PREMIUM BANNER SECTION COMPONENT
// ============================================
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BANNER_COLORS,
  BANNER_DIMENSIONS,
  BANNER_SHADOW,
  BANNER_TRANSITION,
  BANNER_BREAKPOINTS,
  BANNER_STATS,
} from "../../../styles/bannerStyles";

// ============================================
// SUB-COMPONENTS
// ============================================

// Floating Badge Component
const FloatingBadge = ({ text, icon }) => (
  <div className="banner-floating-badge">
    <span className="badge-icon">{icon}</span>
    <span className="badge-text">{text}</span>
  </div>
);

// Stats Component
const BannerStats = ({ stats }) => (
  <div className="banner-stats">
    {stats.map((stat, index) => (
      <div key={index} className="stat-item">
        <span className="stat-value">{stat.value}</span>
        <span className="stat-label">{stat.label}</span>
      </div>
    ))}
  </div>
);

// Dots Navigation
const BannerDots = ({ total, current, onChange }) => (
  <div className="banner-dots">
    {Array.from({ length: total }).map((_, index) => (
      <button
        key={index}
        className={`dot ${current === index ? "active" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          onChange(index);
        }}
        aria-label={`Go to slide ${index + 1}`}
      />
    ))}
  </div>
);

// Navigation Arrows
const BannerArrows = ({ onPrev, onNext }) => (
  <>
    <button className="banner-arrow arrow-left" onClick={onPrev} aria-label="Previous slide">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>
    <button className="banner-arrow arrow-right" onClick={onNext} aria-label="Next slide">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>
  </>
);

// ============================================
// MAIN BANNER SECTION
// ============================================
const BannerSection = ({ banners, current, setCurrent }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle slide change with transition
  const handleSlideChange = (newIndex) => {
    if (newIndex === current || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(newIndex);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  };

  // Auto slide
  useEffect(() => {
    if (banners.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners.length, setCurrent]);

  // Navigation handlers
  const handlePrev = (e) => {
    e.stopPropagation();
    const newIndex = (current - 1 + banners.length) % banners.length;
    handleSlideChange(newIndex);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    const newIndex = (current + 1) % banners.length;
    handleSlideChange(newIndex);
  };

  // Handle banner click
  const handleBannerClick = () => {
    const banner = banners[current];
    if (banner?.link) {
      if (banner.link.startsWith("/")) {
        navigate(banner.link);
      } else {
        window.location.href = banner.link;
      }
    }
  };

  // Handle CTA button click
  const handleCTA = (e) => {
    e.stopPropagation();
    const banner = banners[current];
    if (banner?.link) {
      if (banner.link.startsWith("/")) {
        navigate(banner.link);
      } else {
        window.location.href = banner.link;
      }
    } else {
      navigate("/products");
    }
  };

  // Empty state
  if (!banners || banners.length === 0) {
    return (
      <section className="banner-section">
        {/* <div className="banner-empty">
          <div className="banner-empty-content">
            <h2>Smart Home</h2>
            <p>Giải pháp nhà thông minh cho cuộc sống hiện đại</p>
            <button className="cta-primary" onClick={() => navigate("/products")}>
              Khám phá ngay
            </button>
          </div>
        </div> */}
      </section>
    );
  }

  const currentBanner = banners[current];

  return (
    <>
      <style>{bannerStyles}</style>
      <section className="banner-section">
        <div
          className={`banner-wrapper ${isHovered ? "hovered" : ""}`}
          onClick={handleBannerClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Background Glow Effect */}
          <div className="banner-glow" />

          {/* Banner Image */}
          <img
            src={currentBanner.image}
            alt={currentBanner.title}
            className={`banner-image ${isTransitioning ? "transitioning" : ""}`}
          />

          {/* Gradient Overlay */}
          <div className="banner-overlay" />

          {/* Floating Badges */}
          <div className="banner-badges">
            {currentBanner.badges?.map((badge, index) => (
              <FloatingBadge key={index} text={badge.text} icon={badge.icon} />
            ))}
          </div>

          {/* Content Container */}
          <div className="banner-content">
            {/* Title with Highlight */}
            <h1 className="banner-title">
              {currentBanner.title?.split(" ").map((word, index, arr) => {
                const isHighlight =
                  currentBanner.highlightWords?.some((hw) =>
                    word.toLowerCase().includes(hw.toLowerCase())
                  );
                return (
                  <span key={index}>
                    <span className={isHighlight ? "title-highlight" : ""}>
                      {word}
                    </span>
                    {index < arr.length - 1 && " "}
                  </span>
                );
              })}
            </h1>

            {/* Subtitle - Desktop */}
            <p className="banner-subtitle">{currentBanner.subtitle}</p>

            {/* Subtitle - Mobile */}
            {/* <p className="banner-subtitle show-mobile">
              {currentBanner.subtitle}
            </p> */}

            {/* CTA Buttons */}
            <div className="banner-cta">
              <button className="cta-primary" onClick={handleCTA}>
                <span>Khám phá ngay</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
                {/* <button className="cta-secondary" onClick={() => navigate("/products")}>
                  Xem sản phẩm
                </button> */}
            </div>

            {/* Stats */}
            <BannerStats stats={BANNER_STATS} />
          </div>

          {/* Navigation Controls */}
          {banners.length > 1 && (
            <>
              <BannerDots
                total={banners.length}
                current={current}
                onChange={handleSlideChange}
              />
              <BannerArrows onPrev={handlePrev} onNext={handleNext} />
            </>
          )}
        </div>
      </section>
    </>
  );
};

// ============================================
// CSS STYLES
// ============================================
const bannerStyles = `
  /* ==================== BANNER SECTION ==================== */
  .banner-section {
    position: relative;
    width: 100%;
  }

  .banner-wrapper {
    position: relative;
    height: ${BANNER_DIMENSIONS.bannerHeight.mobile};
    width: 100%;
    border-radius: 0;
    overflow: hidden;
    cursor: pointer;
    box-shadow: ${BANNER_SHADOW.banner};
  }

  @media (min-width: ${BANNER_BREAKPOINTS.tablet}) {
    .banner-wrapper {
      height: ${BANNER_DIMENSIONS.bannerHeight.tablet};
    }
  }

  @media (min-width: ${BANNER_BREAKPOINTS.mobile}) {
    .banner-wrapper {
      height: ${BANNER_DIMENSIONS.bannerHeight.desktop};
    }
  }

  /* ==================== BACKGROUND GLOW ==================== */
  .banner-glow {
    position: absolute;
    top: -50%;
    left: -25%;
    width: 150%;
    height: 200%;
    background: radial-gradient(
      ellipse at 30% 50%,
      ${BANNER_COLORS.accent}22 0%,
      transparent 50%
    );
    pointer-events: none;
    z-index: 1;
    animation: glowPulse 8s ease-in-out infinite;
  }

  @keyframes glowPulse {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.05); }
  }

  /* ==================== BANNER IMAGE ==================== */
  .banner-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .banner-wrapper.hovered .banner-image {
    transform: scale(1.03);
  }

  .banner-image.transitioning {
    opacity: 0.7;
    transform: scale(1.01);
  }

  /* ==================== GRADIENT OVERLAY ==================== */
  .banner-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      ${BANNER_COLORS.overlay} 0%,
      ${BANNER_COLORS.overlayLight} 35%,
      ${BANNER_COLORS.overlayFade} 100%
    );
    z-index: 2;
  }

  /* ==================== FLOATING BADGES ==================== */
  .banner-badges {
    position: absolute;
    top: 24px;
    right: 24px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 10;
  }

  .banner-floating-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    background: ${BANNER_COLORS.glassBg};
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid ${BANNER_COLORS.glassBorder};
    border-radius: 50px;
    color: ${BANNER_COLORS.white};
    font-size: 12px;
    font-weight: 600;
    animation: floatBadge 3s ease-in-out infinite;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }

  .banner-badges .banner-floating-badge:nth-child(1) { animation-delay: 0s; }
  .banner-badges .banner-floating-badge:nth-child(2) { animation-delay: 0.5s; }
  .banner-badges .banner-floating-badge:nth-child(3) { animation-delay: 1s; }

  @keyframes floatBadge {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }

  .badge-icon {
    font-size: 14px;
  }

  /* ==================== CONTENT ==================== */
  .banner-content {
    position: absolute;
    top: 50%;
    left: clamp(24px, 6vw, 80px);
    transform: translateY(-50%);
    max-width: 580px;
    z-index: 5;
    animation: fadeInUp 0.6s ease-out;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(-50%);
    }
  }

  /* ==================== TITLE ==================== */
  .banner-title {
    font-size: clamp(32px, 6vw, 64px);
    font-weight: 800;
    color: ${BANNER_COLORS.white};
    line-height: 1.1;
    margin: 0 0 16px;
    letter-spacing: -1px;
  }

  .title-highlight {
    color: ${BANNER_COLORS.accent};
    text-shadow: 0 0 20px ${BANNER_COLORS.glowAccent};
  }

  /* ==================== SUBTITLE ==================== */
  .banner-subtitle {
    font-size: clamp(14px, 2vw, 20px);
    color: ${BANNER_COLORS.textWhite};
    line-height: 1.7;
    margin: 0 0 28px;
    max-width: 480px;
  }

  /* ==================== CTA BUTTONS ==================== */
  .banner-cta {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    margin-bottom: 32px;
  }

  .cta-primary {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 28px;
    background: linear-gradient(135deg, ${BANNER_COLORS.primary}, ${BANNER_COLORS.accent});
    color: ${BANNER_COLORS.white};
    border: none;
    border-radius: 50px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.25s ease;
    box-shadow: ${BANNER_SHADOW.button};
  }

  .cta-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(37, 99, 235, 0.45);
  }

  .cta-primary svg {
    transition: transform 0.25s ease;
  }

  .cta-primary:hover svg {
    transform: translateX(4px);
  }

  .cta-secondary {
    padding: 14px 28px;
    background: ${BANNER_COLORS.glassBg};
    border: 1px solid ${BANNER_COLORS.glassBorder};
    color: ${BANNER_COLORS.white};
    border-radius: 50px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.25s ease;
    backdrop-filter: blur(10px);
  }

  .cta-secondary:hover {
    background: ${BANNER_COLORS.glassBorder};
    transform: translateY(-2px);
  }

  /* ==================== STATS ==================== */
  .banner-stats {
    display: flex;
    gap: 32px;
    padding-top: 24px;
    border-top: 1px solid ${BANNER_COLORS.glassBorder};
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .stat-value {
    font-size: 24px;
    font-weight: 800;
    color: ${BANNER_COLORS.white};
    background: linear-gradient(135deg, ${BANNER_COLORS.primary}, ${BANNER_COLORS.accent});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .stat-label {
    font-size: 12px;
    color: ${BANNER_COLORS.textMuted};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* ==================== DOTS ==================== */
  .banner-dots {
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
    z-index: 10;
  }

  .banner-dots .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: none;
    background: ${BANNER_COLORS.dotInactive};
    cursor: pointer;
    padding: 0;
    transition: all 0.3s ease;
  }

  .banner-dots .dot.active {
    width: 32px;
    border-radius: 5px;
    background: linear-gradient(135deg, ${BANNER_COLORS.primary}, ${BANNER_COLORS.accent});
  }

  /* ==================== ARROWS ==================== */
  .banner-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: ${BANNER_COLORS.glassBg};
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid ${BANNER_COLORS.glassBorder};
    color: ${BANNER_COLORS.white};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transition: all 0.25s ease;
    box-shadow: ${BANNER_SHADOW.arrow};
  }

  .banner-arrow:hover {
    background: ${BANNER_COLORS.accent};
    border-color: ${BANNER_COLORS.accent};
    transform: translateY(-50%) scale(1.05);
    box-shadow: 0 8px 25px ${BANNER_COLORS.glowAccent};
  }

  .arrow-left {
    left: 20px;
  }

  .arrow-right {
    right: 20px;
  }

  /* ==================== EMPTY STATE ==================== */
  .banner-empty {
    width: 100%;
    height: ${BANNER_DIMENSIONS.bannerHeight.mobile};
    background: linear-gradient(135deg, ${BANNER_COLORS.secondary}, ${BANNER_COLORS.primary});
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: ${BANNER_SHADOW.banner};
  }

  @media (min-width: ${BANNER_BREAKPOINTS.mobile}) {
    .banner-empty {
      height: ${BANNER_DIMENSIONS.bannerHeight.tablet};
    }
  }

  .banner-empty-content {
    text-align: center;
    padding: 20px;
  }

  .banner-empty-content h2 {
    font-size: clamp(28px, 5vw, 48px);
    font-weight: 800;
    color: ${BANNER_COLORS.white};
    margin: 0 0 12px;
  }

  .banner-empty-content p {
    font-size: clamp(14px, 2vw, 18px);
    color: ${BANNER_COLORS.textWhite};
    margin: 0 0 24px;
  }

  /* ==================== RESPONSIVE - MOBILE FIRST ==================== */

  /* Tablet & Desktop */
  @media (min-width: ${BANNER_BREAKPOINTS.mobile}) {
    .banner-content {
      left: clamp(24px, 6vw, 80px);
      transform: translateY(-50%);
      text-align: left;
    }

    .banner-subtitle {
      display: block;
    }

    .banner-cta {
      justify-content: flex-start;
    }

    .banner-stats {
      justify-content: flex-start;
    }
  }

  /* Mobile Only */
  @media (max-width: ${BANNER_BREAKPOINTS.mobile}) {
    /* Content - Center on mobile */
    .banner-content {
      text-align: center;
      left: 50%;
      right: auto;
      transform: translate(-50%, -50%);
      padding: 0 24px;
      max-width: 100%;
    }

    /* Title - Smaller on mobile */
    .banner-title {
      font-size: clamp(26px, 8vw, 32px);
      margin-bottom: 10px;
      letter-spacing: -0.5px;
    }

    /* Subtitle - Hide on very small screens */
    .banner-subtitle {
      display: none;
    }

    .banner-subtitle.show-mobile {
      display: block;
      font-size: 13px;
      line-height: 1.5;
      margin-bottom: 16px;
      opacity: 0.85;
    }

    /* CTA - Full width buttons */
    .banner-cta {
      flex-direction: column;
      gap: 10px;
      align-items: center;
      margin-bottom: 20px;
    }

    .cta-primary, .cta-secondary {
      width: 100%;
      max-width: 220px;
      padding: 12px 20px;
      font-size: 14px;
      justify-content: center;
    }

    /* Stats - Compact on mobile */
    .banner-stats {
      gap: 16px;
      padding-top: 16px;
    }

    .stat-value {
      font-size: 16px;
    }

    .stat-label {
      font-size: 10px;
    }

    /* Floating Badges - Top right, compact */
    .banner-badges {
      top: 12px;
      right: 12px;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 6px;
      max-width: 60%;
      justify-content: flex-end;
    }

    .banner-floating-badge {
      padding: 5px 10px;
      font-size: 10px;
      gap: 4px;
      animation: none;
    }

    .badge-icon {
      font-size: 11px;
    }

    /* Arrows - Smaller on mobile */
    .banner-arrow {
      width: 32px;
      height: 32px;
    }

    .banner-arrow svg {
      width: 16px;
      height: 16px;
    }

    .arrow-left {
      left: 8px;
    }

    .arrow-right {
      right: 8px;
    }

    /* Dots - Centered at bottom */
    .banner-dots {
      bottom: 16px;
      gap: 6px;
    }

    .banner-dots .dot {
      width: 8px;
      height: 8px;
    }

    .banner-dots .dot.active {
      width: 24px;
    }

    /* Glow - Less prominent on mobile */
    .banner-glow {
      opacity: 0.5;
    }
  }

  /* Extra Small Screens (iPhone SE) */
  @media (max-width: 375px) {
    .banner-title {
      font-size: 24px;
    }

    .cta-primary, .cta-secondary {
      padding: 10px 16px;
      font-size: 13px;
    }

    .banner-badges {
      top: 8px;
      right: 8px;
    }

    .banner-floating-badge {
      padding: 4px 8px;
      font-size: 9px;
    }
  }

  /* Large Desktop */
  @media (min-width: 1400px) {
    .banner-content {
      left: 100px;
      max-width: 600px;
    }

    .banner-title {
      font-size: 56px;
    }

    .banner-subtitle {
      font-size: 20px;
    }
  }

  /* Touch Devices - Disable hover effects */
  @media (hover: none) {
    .cta-primary:hover,
    .cta-secondary:hover,
    .banner-arrow:hover {
      transform: none;
    }
  }

  /* High DPI Displays */
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .banner-image {
      image-rendering: -webkit-optimize-contrast;
    }
  }
`;

export default BannerSection;
