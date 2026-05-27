// ============================================
// CATEGORY GRID SECTION - TAILWIND
// ============================================
import CategoryCard from "./CategoryCard";

const CategoryGridSection = ({ categories }) => {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-7">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary tracking-tight mb-3">
            Danh mục sản phẩm
          </h2>
          <p className="text-slate-500 text-sm md:text-base lg:text-lg max-w-xl mx-auto">
            Giải pháp smart home toàn diện cho ngôi nhà hiện đại
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGridSection;
