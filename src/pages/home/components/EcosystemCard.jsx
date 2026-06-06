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
{/* Background Image */}
{/* <Link to={ecosystem.link} className="block"> */}
<div className="relative aspect-[1/1] overflow-hidden">
  <img
    src={ecosystem.image}
    alt={ecosystem.name}
    className={`
      absolute inset-0
      w-full h-full
      object-cover
      transition-transform duration-500
      ${isHovered ? "scale-110" : "scale-100"}
    `}
  />

  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
</div>
{/* </Link> */}
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
