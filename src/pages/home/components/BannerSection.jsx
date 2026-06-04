// ============================================
// PREMIUM BANNER SECTION COMPONENT
// Seamless landing page hero with gradient transition
// ============================================
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BANNER_COLORS } from "../../../styles/bannerStyles";

// Floating Badge Component
const FloatingBadge = ({ text, icon }) => (
  <div className="banner-floating-badge">
    <span className="badge-icon">{icon}</span>
    <span className="badge-text">{text}</span>
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

// Navigation Arrows - Desktop only
const BannerArrows = ({ onPrev, onNext }) => (
  <>
    <button
      onClick={onPrev}
      aria-label="Previous slide"
      className="
        hidden md:flex
        absolute left-5 top-1/2 -translate-y-1/2 z-20
        p-2
        text-white
        opacity-70
        transition-all duration-300
        hover:opacity-100
        hover:scale-125
      "
    >
      <svg
        className="w-8 h-8 drop-shadow-lg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>

    <button
      onClick={onNext}
      aria-label="Next slide"
      className="
        hidden md:flex
        absolute right-5 top-1/2 -translate-y-1/2 z-20
        p-2
        text-white
        opacity-70
        transition-all duration-300
        hover:opacity-100
        hover:scale-125
      "
    >
      <svg
        className="w-8 h-8 drop-shadow-lg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>
  </>
);

const BannerSection = ({ banners, current, setCurrent, className = "" }) => {
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const handleSlideChange = (newIndex) => {
    if (newIndex === current || isTransitioning) return;

    setIsTransitioning(true);

    setTimeout(() => {
      setCurrent(newIndex);
      setTimeout(() => setIsTransitioning(false), 80);
    }, 300);
  };

  useEffect(() => {
    if (!banners || banners.length <= 1) return;

    const timer = setInterval(() => {
      const nextIndex = (current + 1) % banners.length;
      handleSlideChange(nextIndex);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners, banners?.length, current]);

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

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      const nextIndex = (current + 1) % banners.length;
      handleSlideChange(nextIndex);
    }

    if (distance < -minSwipeDistance) {
      const prevIndex = (current - 1 + banners.length) % banners.length;
      handleSlideChange(prevIndex);
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

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

  if (!banners || banners.length === 0) {
    return (
      <section className={`banner-section banner-section-empty ${className}`}>
        <style>{bannerStyles}</style>
        <div className="banner-wrapper-empty">
          <div className="banner-empty-gradient" />
        </div>
      </section>
    );
  }

  const currentBanner = banners[current];

  return (
    <>
      <style>{bannerStyles}</style>

      <section className={`banner-section ${className}`}>
        <div
          className={`banner-wrapper ${isHovered ? "hovered" : ""}`}
          onClick={handleBannerClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="banner-glow" />

          <img
            src={currentBanner.image}
            alt={currentBanner.title}
            className={`banner-image ${isTransitioning ? "transitioning" : ""}`}
            draggable="false"
          />

          <div className="banner-overlay" />

          {/* Mobile gradient fade to next section */}
          <div
            className="
              absolute inset-x-0 bottom-0
              h-12 md:hidden
              bg-gradient-to-b
              from-transparent
              via-slate-5/60
              to-slate-50
              z-[3]
              pointer-events-none
            "
          />

          <div className="banner-badges">
            {currentBanner.badges?.map((badge, index) => (
              <FloatingBadge key={index} text={badge.text} icon={badge.icon} />
            ))}
          </div>

          <div className="banner-content">
            <h1 className="banner-title">
              {currentBanner.title?.split(" ").map((word, index, arr) => {
                const isHighlight = currentBanner.highlightWords?.some((hw) =>
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

            <p className="banner-subtitle show-mobile">
              {currentBanner.subtitle}
            </p>
          </div>

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

const bannerStyles = `
  .banner-section {
    position: relative;
    width: 100%;
  }

  .banner-section-empty .banner-wrapper-empty {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .banner-section:not(.h-full) .banner-section-empty .banner-wrapper-empty {
    height: 260px;
  }

  @media (min-width: 480px) {
    .banner-section:not(.h-full) .banner-section-empty .banner-wrapper-empty {
      height: 320px;
    }
  }

  @media (min-width: 768px) {
    .banner-section:not(.h-full) .banner-section-empty .banner-wrapper-empty {
      height: 400px;
    }
  }

  .banner-empty-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #2563eb 100%);
  }

  .banner-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    cursor: pointer;
    touch-action: pan-y;
    user-select: none;
  }

  @media (min-width: 480px) {
    .banner-section:not(.h-full) .banner-wrapper {
      height: 320px;
    }
  }

  @media (min-width: 768px) {
    .banner-section:not(.h-full) .banner-wrapper {
      height: 400px;
    }
  }

  @media (min-width: 1024px) {
    .banner-section:not(.h-full) .banner-wrapper {
      height: 480px;
    }
  }

  @media (min-width: 1280px) {
    .banner-section:not(.h-full) .banner-wrapper {
      height: 520px;
    }
  }

  @media (max-width: 479px) {
    .banner-section:not(.h-full) .banner-wrapper {
      height: 260px;
    }
  }

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
    0%, 100% {
      opacity: 0.4;
      transform: scale(1);
    }

    50% {
      opacity: 0.6;
      transform: scale(1.05);
    }
  }

  .banner-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    z-index: 0;
    transition:
      opacity 0.35s ease,
      transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .banner-wrapper.hovered .banner-image {
    transform: scale(1.03);
  }

  .banner-image.transitioning {
    opacity: 0.55;
    transform: scale(1.02);
  }

  .banner-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      ${BANNER_COLORS.overlay} 0%,
      ${BANNER_COLORS.overlayLight} 40%,
      ${BANNER_COLORS.overlayFade} 100%
    );
    z-index: 2;
  }

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

  .banner-badges .banner-floating-badge:nth-child(1) {
    animation-delay: 0s;
  }

  .banner-badges .banner-floating-badge:nth-child(2) {
    animation-delay: 0.5s;
  }

  .banner-badges .banner-floating-badge:nth-child(3) {
    animation-delay: 1s;
  }

  @keyframes floatBadge {
    0%, 100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-5px);
    }
  }

  .badge-icon {
    font-size: 12px;
  }

  @media (min-width: 768px) {
    .badge-icon {
      font-size: 14px;
    }
  }

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

  @media (max-width: 767px) {
    .banner-content {
      text-align: center;
      left: 50%;
      right: auto;
      transform: translate(-50%, -50%);
      padding: 0 24px;
      max-width: 100%;
    }

    .banner-title {
      margin-bottom: 6px;
    }

    .banner-subtitle.show-mobile {
      display: block;
      font-size: 12px;
      line-height: 1.5;
      margin-bottom: 12px;
      opacity: 0.85;
    }

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

    .banner-glow {
      opacity: 0.4;
    }
  }

  @media (min-width: 1400px) {
    .banner-content {
      left: 100px;
      max-width: 600px;
    }

    .banner-title {
      font-size: 56px;
    }
  }

  @media (hover: none) {
    .banner-wrapper.hovered .banner-image {
      transform: none;
    }
  }
`;

export default BannerSection;