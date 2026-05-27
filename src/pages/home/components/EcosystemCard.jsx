// ============================================
// ECOSYSTEM CARD - TAILWIND
// ============================================
import { Link } from "react-router-dom";
import { useState } from "react";

const EcosystemCard = ({ ecosystem }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative bg-white rounded-3xl overflow-hidden
        border-2 transition-all duration-300
        ${isHovered 
          ? "border-primary-300 -translate-y-2 shadow-strong" 
          : "border-transparent shadow-medium"
        }
      `}
    >
      {/* Background Image */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={ecosystem.image}
          alt={ecosystem.name}
          className={`
            w-full h-full object-cover
            transition-transform duration-500
            ${isHovered ? "scale-110" : "scale-100"}
          `}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
        
        {/* Logo Badge */}
        <div className="absolute top-4 left-4 md:top-5 md:left-5">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-white/95 backdrop-blur-sm rounded-2xl p-2 shadow-lg">
            <img 
              src={ecosystem.logo} 
              alt={`${ecosystem.name} logo`} 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Color Accent Line */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ background: ecosystem.color }}
        />
      </div>

      {/* Card Content */}
      <div className="p-6 md:p-7 flex flex-col gap-4">
        {/* Title & Description */}
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-bold text-secondary mb-2">
            {ecosystem.name}
          </h3>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            {ecosystem.description}
          </p>
        </div>

        {/* Feature Badges */}
        <div className="flex flex-wrap gap-2">
          {ecosystem.features.map((feature, index) => (
            <span 
              key={index} 
              className="px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold border"
              style={{ 
                borderColor: `${ecosystem.color}30`,
                color: ecosystem.color,
                backgroundColor: `${ecosystem.color}08`,
              }}
            >
              {feature}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <Link 
          to={ecosystem.link}
          className={`
            flex items-center justify-center gap-2
            px-5 py-3 md:px-6 md:py-3.5
            text-white rounded-full
            font-semibold text-sm md:text-base
            transition-all duration-300
            hover:-translate-y-0.5 hover:shadow-lg
          `}
          style={{
            background: `linear-gradient(135deg, ${ecosystem.color}, ${ecosystem.color}dd)`,
          }}
        >
          <span>Khám phá hệ sinh thái</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Hover Glow Effect */}
      <div 
        className={`
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-48 h-48 rounded-full pointer-events-none
          transition-opacity duration-300
          ${isHovered ? "opacity-20" : "opacity-0"}
        `}
        style={{ 
          background: ecosystem.color,
          filter: "blur(80px)",
        }}
      />
    </div>
  );
};

export default EcosystemCard;
