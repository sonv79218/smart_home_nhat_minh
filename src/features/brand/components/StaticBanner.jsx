// ============================================
// STATIC ECOSYSTEM BANNER
// Same dimensions and structure as Homepage BannerSection
// No slider, no props — static image only
// ============================================

const StaticBanner = ({ image, alt = "" }) => {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-0 lg:px-4 lg:py-4">
      {/* Desktop: tall banner */}
      <div className="hidden lg:block h-[clamp(475px,28vw,600px)] overflow-hidden rounded-b-2xl">
        <img
          src={image}
          alt={alt}
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Mobile / Tablet: shorter banner */}
      <div className="lg:hidden h-[260px] sm:h-[320px] md:h-[400px]">
        <img
          src={image}
          alt={alt}
          className="h-full w-full object-cover object-center"
        />
      </div>
    </div>
  );
};

export default StaticBanner;
