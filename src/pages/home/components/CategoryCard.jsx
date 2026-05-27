// ============================================
// CATEGORY CARD COMPONENT - TAILWIND
// ============================================
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getCategoryIcon } from "./categoryIcons";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  
  const IconComponent = getCategoryIcon(category.id);

  const handleClick = () => {
    navigate(`/products?category=${category.id}`);
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        w-full flex flex-col items-start p-5 md:p-6
        bg-white border-2 rounded-2xl
        transition-all duration-300 text-left
        ${isHovered 
          ? "border-primary-500 -translate-y-1 shadow-lg" 
          : "border-slate-200 hover:border-slate-300"
        }
      `}
    >
      {/* Icon Container */}
      <div className={`mb-4 transition-all duration-300 ${isHovered ? "scale-110" : ""}`}>
        <div className={`
          w-12 h-12 md:w-14 md:h-14
          rounded-xl md:rounded-2xl
          flex items-center justify-center
          transition-all duration-300
          ${isHovered 
            ? "bg-gradient-to-br from-primary-600 to-accent shadow-lg" 
            : "bg-blue-50"
          }
        `}>
          <IconComponent 
            size={24} 
            strokeWidth={1.8} 
            className={isHovered ? "text-white" : "text-primary-600"}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 mb-3">
        <h3 className={`
          font-bold text-secondary leading-tight mb-2
          transition-colors duration-200
          ${isHovered ? "text-primary-600" : ""}
        `}>
          {category.name}
        </h3>
        {category.description && (
          <p className="text-slate-500 text-xs md:text-sm line-clamp-2 leading-relaxed">
            {category.description}
          </p>
        )}
      </div>

      {/* Arrow */}
      <div className={`
        text-slate-400 transition-all duration-300
        ${isHovered ? "text-primary-600 translate-x-1" : ""}
      `}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </div>
    </button>
  );
};

export default CategoryCard;
