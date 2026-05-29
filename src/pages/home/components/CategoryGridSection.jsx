// ============================================
// CATEGORY GRID SECTION
// Responsive: 4/4/5/6 cols
// Smart Home E-commerce Style
// ============================================
import CategoryCard from "./CategoryCard";

const CategoryGridSection = ({ categories }) => {
  if (!categories || categories.length === 0) return null;

  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  const displayedCategories = isMobile
    ? categories.slice(0, 8)
    : categories;

  return (
    <section className="mb-8 md:mb-15">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-5 md:px-6">
        
        {/* Header */}
        <div className="text-center mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-secondary tracking-tight mb-1.5 md:mb-2">
            Danh mục sản phẩm
          </h2>
          <p className="text-slate-500 text-[11px] md:text-xs lg:text-sm hidden md:block">
            Giải pháp smart home toàn diện cho ngôi nhà hiện đại
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-2 md:gap-3 lg:gap-4">
          {displayedCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default CategoryGridSection;
