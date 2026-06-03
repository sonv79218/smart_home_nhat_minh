// ============================================
// SOLUTION SECTION COMPONENT
// Display grid of smart home solutions
// ============================================
import { useState, useEffect } from "react";
import SolutionCard from "./SolutionCard";
import { getActiveSolutions } from "../../../services/solutionService";

const SolutionSection = ({ solutions: propSolutions }) => {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolutions = async () => {
      if (propSolutions) {
        setSolutions(propSolutions);
        setLoading(false);
        return;
      }

      try {
        const data = await getActiveSolutions();
        setSolutions(data);
      } catch (error) {
        console.error("[SolutionSection] Error fetching solutions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSolutions();
  }, [propSolutions]);

  // Don't render if no data
  if (!loading && solutions.length === 0) {
    return null;
  }

  return (
    <div className="w-full py-12 md:py-16 bg-slate-50">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-primary-200" />
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 uppercase tracking-wide text-center whitespace-nowrap">
            Giải pháp nhà thông minh
          </h2>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-primary-200" />
        </div>
        

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="aspect-[4/5] rounded-2xl bg-slate-200 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Solutions Grid */}
        {!loading && solutions.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {solutions.map((solution) => (
              <SolutionCard key={solution.id} solution={solution} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SolutionSection;
