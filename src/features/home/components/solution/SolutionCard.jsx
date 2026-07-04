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


const imageSrc = solution.image || solution.thumbnail || solution.coverImage;

const hasImage = imageSrc && imageSrc.trim() !== "";
  return (
    <div
      onClick={handleClick}
      className="group relative aspect-[8/5] rounded-none overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
    >
      {/* Background Image or Placeholder */}
{hasImage ? (
  <img
    src={imageSrc}
    alt={solution.title}
    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
  />
) : (
  <div
    className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
    style={{ background: getPlaceholderGradient(solution.id) }}
  />
)}


    </div>
  );
};

export default SolutionCard;