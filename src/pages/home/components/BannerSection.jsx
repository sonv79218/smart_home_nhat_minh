// ============================================
// PREMIUM BANNER SECTION COMPONENT
// Seamless landing page hero with gradient transition
// ============================================
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BANNER_COLORS,
  BANNER_DIMENSIONS,
  BANNER_SHADOW,
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
      <section className="banner-section banner-section-empty">
        <style>{bannerStyles}</style>
        <div className="banner-wrapper-empty">
          {/* Gradient background for empty state */}
          <div className="banner-empty-gradient" />
        </div>
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

          {/* Gradient Overlay - Extended for seamless transition */}
          <div className="banner-overlay" />
          
          {/* Seamless Gradient Fade to next section */}
          {/* <div className="banner-seamless-fade" /> */}

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

            {/* Subtitle - Mobile */}
            <p className="banner-subtitle show-mobile">
              {currentBanner.subtitle}
            </p>

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
const BANNER_STATS = [
  { value: "5000+", label: "Khách hàng" },
  { value: "100+", label: "Sản phẩm Smart" },
  { value: "24/7", label: "Hỗ trợ" },
];

const bannerStyles = `
  /* ==================== BANNER SECTION ==================== */
  .banner-section {
    position: relative;
    width: 100%;
  }

  .banner-section-empty {
    height: 320px;
  }

  .banner-wrapper-empty {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .banner-empty-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #2563eb 100%);
  }

  .banner-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
    cursor: pointer;
  }

  /* Responsive Heights */
  .banner-wrapper {
    height: 260px;
  }

  @media (min-width: 480px) {
    .banner-wrapper {
      height: 320px;
    }
  }

  @media (min-width: 768px) {
    .banner-wrapper {
      height: 400px;
    }
  }

  @media (min-width: 1024px) {
    .banner-wrapper {
      height: 480px;
    }
  }

  @media (min-width: 1280px) {
    .banner-wrapper {
      height: 520px;
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
      rgba(37, 99, 235, 0.15) 0%,
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
    object-position: center;
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
      ${BANNER_COLORS.overlayLight} 40%,
      ${BANNER_COLORS.overlayFade} 100%
    );
    z-index: 2;
  }

  /* Seamless fade to next section */
  .banner-seamless-fade {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: linear-gradient(
      to bottom,
      rgba(248, 250, 252, 0) 0%,
      rgba(248, 250, 252, 0.6) 40%,
      rgba(248, 250, 252, 1) 100%
    );
    z-index: 3;
    pointer-events: none;
  }

  @media (min-width: 768px) {
    .banner-seamless-fade {
      height: 100px;
    }
  }

  /* ==================== FLOATING BADGES ==================== */
  .banner-badges {
    position: absolute;
    top: 16px;
    right: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    z-index: 10;
  }

  @media (min-width: 768px) {
    .banner-badges {
      top: 24px;
      right: 24px;
      gap: 10px;
    }
  }

  .banner-floating-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50px;
    color: white;
    font-size: 11px;
    font-weight: 600;
    animation: floatBadge 3s ease-in-out infinite;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }

  @media (min-width: 768px) {
    .banner-floating-badge {
      padding: 10px 16px;
      font-size: 12px;
      gap: 8px;
    }
  }

  .banner-badges .banner-floating-badge:nth-child(1) { animation-delay: 0s; }
  .banner-badges .banner-floating-badge:nth-child(2) { animation-delay: 0.5s; }
  .banner-badges .banner-floating-badge:nth-child(3) { animation-delay: 1s; }

  @keyframes floatBadge {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }

  .badge-icon {
    font-size: 12px;
  }

  @media (min-width: 768px) {
    .badge-icon {
      font-size: 14px;
    }
  }

  /* ==================== CONTENT ==================== */
  .banner-content {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    max-width: 500px;
    z-index: 5;
    animation: fadeInUp 0.6s ease-out;
  }

  @media (min-width: 768px) {
    .banner-content {
      left: clamp(24px, 6vw, 80px);
      max-width: 580px;
    }
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
    font-size: clamp(22px, 5vw, 56px);
    font-weight: 800;
    color: white;
    line-height: 1.15;
    margin: 0 0 8px;
    letter-spacing: -0.5px;
  }

  @media (min-width: 768px) {
    .banner-title {
      margin: 0 0 16px;
      letter-spacing: -1px;
    }
  }

  .title-highlight {
    color: ${BANNER_COLORS.accent};
    text-shadow: 0 0 20px ${BANNER_COLORS.glowAccent};
  }

  /* ==================== SUBTITLE ==================== */
  .banner-subtitle {
    font-size: clamp(12px, 2vw, 18px);
    color: ${BANNER_COLORS.textWhite};
    line-height: 1.6;
    margin: 0 0 20px;
    max-width: 420px;
  }

  @media (min-width: 768px) {
    .banner-subtitle {
      margin: 0 0 28px;
    }
  }

  /* ==================== STATS ==================== */
  .banner-stats {
    display: none;
    gap: 24px;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
  }

  @media (min-width: 640px) {
    .banner-stats {
      display: flex;
      gap: 28px;
    }
  }

  @media (min-width: 768px) {
    .banner-stats {
      gap: 32px;
      padding-top: 24px;
    }
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .stat-value {
    font-size: clamp(18px, 3vw, 28px);
    font-weight: 800;
    color: white;
    background: linear-gradient(135deg, ${BANNER_COLORS.primary}, ${BANNER_COLORS.accent});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .stat-label {
    font-size: 11px;
    color: ${BANNER_COLORS.textMuted};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* ==================== DOTS ==================== */
  .banner-dots {
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 10;
  }

  @media (min-width: 768px) {
    .banner-dots {
      bottom: 24px;
      gap: 10px;
    }
  }

  .banner-dots .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: none;
    background: ${BANNER_COLORS.dotInactive};
    cursor: pointer;
    padding: 0;
    transition: all 0.3s ease;
  }

  @media (min-width: 768px) {
    .banner-dots .dot {
      width: 10px;
      height: 10px;
    }
  }

  .banner-dots .dot.active {
    width: 24px;
    border-radius: 5px;
    background: linear-gradient(135deg, ${BANNER_COLORS.primary}, ${BANNER_COLORS.accent});
  }

  @media (min-width: 768px) {
    .banner-dots .dot.active {
      width: 32px;
    }
  }

  /* ==================== ARROWS ==================== */
  .banner-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transition: all 0.25s ease;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }

  @media (min-width: 768px) {
    .banner-arrow {
      width: 48px;
      height: 48px;
    }
  }

  .banner-arrow:hover {
    background: ${BANNER_COLORS.accent};
    border-color: ${BANNER_COLORS.accent};
    transform: translateY(-50%) scale(1.05);
    box-shadow: 0 8px 25px ${BANNER_COLORS.glowAccent};
  }

  .arrow-left {
    left: 10px;
  }

  .arrow-right {
    right: 10px;
  }

  @media (min-width: 768px) {
    .arrow-left {
      left: 20px;
    }

    .arrow-right {
      right: 20px;
    }
  }

  /* ==================== RESPONSIVE - MOBILE FIRST ==================== */

  /* Mobile Only */
  @media (max-width: 767px) {
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
      margin-bottom: 6px;
    }

    /* Subtitle - Show on mobile */
    .banner-subtitle.show-mobile {
      display: block;
      font-size: 12px;
      line-height: 1.5;
      margin-bottom: 12px;
      opacity: 0.85;
    }

    /* Stats - Hidden on mobile */
    .banner-stats {
      display: none;
    }

    /* Floating Badges - Compact on mobile */
    .banner-badges {
      top: 10px;
      right: 10px;
      flex-direction: row;
      flex-wrap: wrap;
      max-width: 50%;
      justify-content: flex-end;
    }

    .banner-floating-badge {
      padding: 4px 8px;
      font-size: 9px;
      gap: 4px;
      animation: none;
    }

    .badge-icon {
      font-size: 10px;
    }

    /* Arrows - Smaller on mobile */
    .banner-arrow {
      width: 32px;
      height: 32px;
    }

    .banner-arrow svg {
      width: 14px;
      height: 14px;
    }

    .arrow-left {
      left: 6px;
    }

    .arrow-right {
      right: 6px;
    }

    /* Glow - Less prominent on mobile */
    .banner-glow {
      opacity: 0.4;
    }

    /* Seamless fade - shorter on mobile */
    .banner-seamless-fade {
      height: 60px;
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
  }

  /* Touch Devices - Disable hover effects */
  @media (hover: none) {
    .cta-primary:hover,
    .cta-secondary:hover,
    .banner-arrow:hover {
      transform: translateY(-50%);
    }
  }
`;

export default BannerSection;
