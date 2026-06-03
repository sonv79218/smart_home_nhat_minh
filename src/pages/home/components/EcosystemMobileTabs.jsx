// ============================================
// ECOSYSTEM MOBILE TABS - Mobile-only Component
// ============================================
import { useState } from "react";
import { Link } from "react-router-dom";
import EcosystemComparisonTable from "./EcosystemComparisonTable";

const EcosystemMobileTabs = ({ ecosystems }) => {
  const [activeTab, setActiveTab] = useState(ecosystems[0]?.id || "");

  const activeEcosystem = ecosystems.find((e) => e.id === activeTab) || ecosystems[0];

  const getTabStyles = (ecosystem, isActive) => {
    if (isActive) {
      return {
        backgroundColor: ecosystem.color,
        color: "white",
        borderColor: ecosystem.color,
      };
    }
    return {
      backgroundColor: "white",
      color: "#64748b",
      borderColor: "#e2e8f0",
    };
  };

  return (
    <div className="w-full">
      {/* Tabs Navigation */}
      <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl mb-6">
        {ecosystems.map((ecosystem) => {
          const isActive = activeTab === ecosystem.id;
          const styles = getTabStyles(ecosystem, isActive);

          return (
            <button
              key={ecosystem.id}
              onClick={() => setActiveTab(ecosystem.id)}
              className={`
                flex-1 py-3 px-4
                text-sm font-semibold
                rounded-xl
                transition-all duration-300
                border-2
                flex items-center justify-center gap-2
                ${isActive ? "shadow-md" : "hover:bg-slate-50"}
              `}
              style={styles}
            >
              <span className="w-2 h-2 rounded-full bg-current opacity-80" />
              {ecosystem.name}
            </button>
          );
        })}
      </div>

      {/* Active Content Card */}
      {activeEcosystem && (
        <div
          className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden transition-all duration-300"
          key={activeEcosystem.id}
        >
          {/* Image */}
          <div className="relative h-[180px] md:h-[200px] overflow-hidden">
            <img
              src={activeEcosystem.image}
              alt={activeEcosystem.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

            {/* Color accent bar */}
            <div
              className="absolute bottom-0 left-0 right-0 h-1"
              style={{ backgroundColor: activeEcosystem.color }}
            />
          </div>

          {/* Content */}
          <div className="p-5 space-y-5">
            {/* Title & Description */}
            <div>
              <h3 className="text-2xl font-bold text-secondary mb-2">
                {activeEcosystem.name}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {activeEcosystem.description}
              </p>
            </div>

            {/* Feature Badges */}
            <div className="flex flex-wrap gap-2">
              {activeEcosystem.features.map((feature, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold border"
                  style={{
                    borderColor: `${activeEcosystem.color}30`,
                    color: activeEcosystem.color,
                    backgroundColor: `${activeEcosystem.color}08`,
                  }}
                >
                  {feature}
                </span>
              ))}
            </div>

            {/* Comparison Table */}
            {/* <EcosystemComparisonTable ecosystem={activeEcosystem} /> */}

            {/* CTA Button */}
            <Link
              to={activeEcosystem.link}
              className="
                flex items-center justify-center gap-2
                w-full py-3.5 px-6
                text-white rounded-2xl
                font-semibold text-sm
                transition-all duration-300
                hover:shadow-lg hover:-translate-y-0.5
                active:scale-[0.98]
              "
              style={{
                background: `linear-gradient(135deg, ${activeEcosystem.color}, ${activeEcosystem.color}cc)`,
              }}
            >
              <span>Khám phá hệ sinh thái</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default EcosystemMobileTabs;
