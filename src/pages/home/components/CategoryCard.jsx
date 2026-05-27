// ============================================
// CATEGORY CARD COMPONENT
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
    <>
      <style>{cardStyles}</style>
      <button
        className={`category-card ${isHovered ? "hovered" : ""}`}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Icon Container */}
        <div className="card-icon-wrapper">
          <div className="card-icon">
            <IconComponent size={24} strokeWidth={1.8} />
          </div>
        </div>

        {/* Content */}
        <div className="card-content">
          <h3 className="card-title">{category.name}</h3>
          {category.description && (
            <p className="card-description">{category.description}</p>
          )}
        </div>

        {/* Arrow */}
        <div className="card-arrow">
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </button>
    </>
  );
};

const cardStyles = `
  .category-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 24px;
    background: #ffffff;
    border: 2px solid #e2e8f0;
    border-radius: 18px;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    text-align: left;
    position: relative;
    overflow: hidden;
    width: 100%;
  }

  .category-card:hover {
    transform: translateY(-4px);
    border-color: #2563eb;
    box-shadow: 0 12px 32px rgba(37, 99, 235, 0.15);
  }

  /* Icon Wrapper */
  .card-icon-wrapper {
    margin-bottom: 16px;
  }

  .card-icon {
    width: 52px;
    height: 52px;
    background: #eff6ff;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2563eb;
    transition: all 0.25s ease;
  }

  .category-card:hover .card-icon {
    background: linear-gradient(135deg, #2563eb, #38bdf8);
    color: #ffffff;
    transform: scale(1.05);
  }

  /* Content */
  .card-content {
    flex: 1;
    margin-bottom: 12px;
  }

  .card-title {
    font-size: 16px;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 8px;
    line-height: 1.3;
    transition: color 0.2s ease;
  }

  .category-card:hover .card-title {
    color: #2563eb;
  }

  .card-description {
    font-size: 13px;
    line-height: 1.5;
    color: #64748b;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Arrow */
  .card-arrow {
    position: absolute;
    bottom: 20px;
    right: 20px;
    color: #94a3b8;
    transition: all 0.25s ease;
    opacity: 0.5;
  }

  .category-card:hover .card-arrow {
    color: #2563eb;
    opacity: 1;
    transform: translateX(4px);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .category-card {
      padding: 20px;
      border-radius: 14px;
    }

    .card-icon {
      width: 46px;
      height: 46px;
      border-radius: 12px;
    }

    .card-icon svg {
      width: 20px;
      height: 20px;
    }

    .card-title {
      font-size: 15px;
    }

    .card-description {
      font-size: 12px;
      -webkit-line-clamp: 2;
    }

    .card-arrow {
      bottom: 16px;
      right: 16px;
    }

    .card-arrow svg {
      width: 18px;
      height: 18px;
    }
  }

  @media (max-width: 480px) {
    .category-card {
      padding: 16px;
      border-radius: 12px;
    }

    .card-icon-wrapper {
      margin-bottom: 12px;
    }

    .card-icon {
      width: 42px;
      height: 42px;
      border-radius: 10px;
    }

    .card-title {
      font-size: 14px;
      margin-bottom: 6px;
    }

    .card-description {
      font-size: 11px;
    }
  }
`;

export default CategoryCard;
