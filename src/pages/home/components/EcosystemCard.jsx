// ============================================
// ECOSYSTEM CARD COMPONENT
// ============================================
import { Link } from "react-router-dom";
import { useState } from "react";

const EcosystemCard = ({ ecosystem }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <style>{cardStyles}</style>
      <div
        className={`ecosystem-card ${isHovered ? "hovered" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Image */}
        <div className="card-image-container">
          <img
            src={ecosystem.image}
            alt={ecosystem.name}
            className="card-image"
          />
          <div className="card-overlay" />
          
          {/* Logo Badge */}
          {/* <div className="logo-badge">
            <img 
              src={ecosystem.logo} 
              alt={`${ecosystem.name} logo`} 
              className="brand-logo"
            />
          </div> */}

          {/* Color Accent Line */}
          <div 
            className="color-accent" 
            style={{ background: ecosystem.color }} 
          />
        </div>

        {/* Card Content */}
        <div className="card-content">
          {/* Title & Description */}
          <div className="card-text">
            <h3 className="card-title">{ecosystem.name}</h3>
            <p className="card-description">{ecosystem.description}</p>
          </div>

          {/* Feature Badges */}
          <div className="feature-badges">
            {ecosystem.features.map((feature, index) => (
              <span 
                key={index} 
                className="feature-badge"
                style={{ 
                  borderColor: `${ecosystem.color}30`,
                  color: ecosystem.color,
                }}
              >
                {feature}
              </span>
            ))}
          </div>

          {/* CTA Button */}
          <Link 
            to={ecosystem.link} 
            className="explore-btn"
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
          className="card-glow" 
          style={{ background: ecosystem.color }}
        />
      </div>
    </>
  );
};

const cardStyles = `
  .ecosystem-card {
    position: relative;
    background: #ffffff;
    border-radius: 28px;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(15, 23, 42, 0.08);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid rgba(226, 232, 240, 0.5);
  }

  .ecosystem-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(15, 23, 42, 0.15);
    border-color: rgba(37, 99, 235, 0.3);
  }

  .ecosystem-card.hovered {
    border-color: rgba(37, 99, 235, 0.4);
  }

  /* Image Container */
  .card-image-container {
    position: relative;
    height: 350px;
    overflow: hidden;
  }

  .card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .ecosystem-card:hover .card-image {
    transform: scale(1.08);
  }

  .card-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      180deg,
      rgba(15, 23, 42, 0.1) 0%,
      rgba(15, 23, 42, 0.6) 100%
    );
  }

  /* Logo Badge */
  .logo-badge {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 64px;
    height: 64px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 16px;
    padding: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(10px);
  }

  .brand-logo {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  /* Color Accent */
  .color-accent {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
  }

  /* Card Content */
  .card-content {
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .card-text {
    flex: 1;
  }

  .card-title {
    font-size: 24px;
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 12px;
    letter-spacing: -0.5px;
  }

  .card-description {
    font-size: 15px;
    line-height: 1.6;
    color: #64748b;
    margin: 0;
  }

  /* Feature Badges */
  .feature-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .feature-badge {
    padding: 6px 14px;
    background: rgba(37, 99, 235, 0.06);
    border: 1px solid;
    border-radius: 50px;
    font-size: 12px;
    font-weight: 600;
    transition: all 0.2s ease;
  }

  .ecosystem-card:hover .feature-badge {
    transform: translateY(-2px);
  }

  /* CTA Button */
  .explore-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 14px 24px;
    color: #ffffff;
    text-decoration: none;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 700;
    transition: all 0.25s ease;
    box-shadow: 0 4px 16px rgba(37, 99, 235, 0.3);
  }

  .explore-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(37, 99, 235, 0.4);
  }

  .explore-btn svg {
    transition: transform 0.25s ease;
  }

  .explore-btn:hover svg {
    transform: translateX(4px);
  }

  /* Glow Effect */
  .card-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    opacity: 0;
    transform: translate(-50%, -50%);
    filter: blur(80px);
    pointer-events: none;
    transition: opacity 0.3s ease;
  }

  .ecosystem-card:hover .card-glow {
    opacity: 0.15;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .card-image-container {
      height: 200px;
    }

    .logo-badge {
      width: 52px;
      height: 52px;
      top: 16px;
      left: 16px;
      border-radius: 12px;
    }

    .card-content {
      padding: 20px;
      gap: 16px;
    }

    .card-title {
      font-size: 20px;
    }

    .card-description {
      font-size: 14px;
    }

    .feature-badge {
      padding: 5px 12px;
      font-size: 11px;
    }

    .explore-btn {
      padding: 12px 20px;
      font-size: 13px;
    }
  }
`;

export default EcosystemCard;
