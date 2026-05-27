// ============================================
// CATEGORY GRID SECTION COMPONENT
// ============================================
import CategoryCard from "./CategoryCard";

const CategoryGridSection = ({ categories }) => {
  if (!categories || categories.length === 0) return null;

  return (
    <>
      <style>{sectionStyles}</style>
      <section className="category-section">
        <div className="section-container">
          {/* Section Header */}
          <div className="section-header">
            <div className="header-content">
              <h2 className="section-title">Danh mục sản phẩm</h2>
              <p className="section-subtitle">
                Giải pháp smart home toàn diện cho ngôi nhà hiện đại
              </p>
            </div>
          </div>

          {/* Category Grid */}
          <div className="category-grid">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

const sectionStyles = `
  .category-section {
    margin-bottom: 48px;
  }

  .section-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 24px;
  }

  /* Section Header */
  .section-header {
    margin-bottom: 28px;
  }

  .header-content {
    text-align: center;
  }

  .section-title {
    font-size: clamp(24px, 4vw, 32px);
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 10px;
    letter-spacing: -0.5px;
  }

  .section-subtitle {
    font-size: clamp(14px, 2vw, 16px);
    color: #64748b;
    margin: 0;
    line-height: 1.6;
  }

  /* Category Grid */
  .category-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
  }

  /* Responsive */
  @media (max-width: 1200px) {
    .category-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media (max-width: 992px) {
    .category-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 768px) {
    .section-container {
      padding: 0 16px;
    }

    .category-section {
      margin-bottom: 40px;
    }

    .section-header {
      margin-bottom: 20px;
    }

    .category-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
    }
  }

  @media (max-width: 576px) {
    .category-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
  }

  @media (max-width: 400px) {
    .category-grid {
      gap: 10px;
    }
  }
`;

export default CategoryGridSection;
