// ============================================
// SOLUTION CARD COMPONENT
// Display individual solution in grid
// ============================================
import { useNavigate } from "react-router-dom";

const SolutionCard = ({ solution }) => {
  const navigate = useNavigate();

  if (!solution) return null;

  const handleClick = () => {
    navigate(`/solutions/${solution.slug}`);
  };

  // Placeholder gradient backgrounds for each solution type
  const getPlaceholderGradient = (id) => {
    const gradients = {
      lighting: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
      "smart-lock": "linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)",
      "energy-water": "linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #0e7490 100%)",
      "smart-ac": "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)",
      "water-heater": "linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)",
      "rolling-door": "linear-gradient(135deg, #64748b 0%, #475569 50%, #334155 100%)",
      "voice-assistant": "linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)",
      network: "linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #4338ca 100%)",
      security: "linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%)",
      "smart-curtain": "linear-gradient(135deg, #ec4899 0%, #db2777 50%, #be185d 100%)",
    };
    return gradients[id] || "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)";
  };

  const hasImage = solution.image && solution.image.trim() !== "";

  return (
    <div
      onClick={handleClick}
      className="group relative aspect-[8/5] rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
    >
      {/* Background Image or Placeholder */}
      {hasImage ? (
        <img
          src={solution.image}
          alt={solution.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      ) : (
        <div
          className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
          style={{ background: getPlaceholderGradient(solution.id) }}
        >
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id={`grid-${solution.id}`} width="10" height="10" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="0.5" fill="white" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill={`url(#grid-${solution.id})`} />
            </svg>
          </div>
        </div>
      )}

      {/* Gradient Overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" /> */}

      {/* Content */}

    </div>
  );
};

export default SolutionCard;
      // <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
      //   {/* Title */}
      //   <h3 className="text-white font-bold uppercase text-sm md:text-base leading-tight mb-1 drop-shadow-lg">
      //     {solution.title}
      //   </h3>

      //   {/* Subtitle */}
      //   {solution.subtitle && (
      //     <p className="text-primary-300 font-bold uppercase text-xs md:text-sm tracking-wide drop-shadow-lg">
      //       {solution.subtitle}
      //     </p>
      //   )}

      //   {/* Arrow indicator on hover */}
      //   <div className="mt-3 flex items-center gap-2 opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
      //     <span className="text-white/80 text-xs font-medium">Xem chi tiết</span>
      //     <svg
      //       className="w-4 h-4 text-white"
      //       fill="none"
      //       stroke="currentColor"
      //       viewBox="0 0 24 24"
      //     >
      //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      //     </svg>
      //   </div>
      // </div>