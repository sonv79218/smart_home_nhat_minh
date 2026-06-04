import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getCategoryIcon } from "./categoryIcons";

const CategorySidebar = ({ categories = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const activeCategory = new URLSearchParams(location.search).get("category");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/products.json");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load products.json:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  const productsByCategory = useMemo(() => {
    return products.reduce((acc, product) => {
      const categoryId = product.category || product.categoryId;

      if (!categoryId) return acc;

      if (!acc[categoryId]) {
        acc[categoryId] = [];
      }

      acc[categoryId].push(product);
      return acc;
    }, {});
  }, [products]);

  const hoverProducts = hoveredCategory
    ? productsByCategory[hoveredCategory.id]?.slice(0, 18) || []
    : [];

  const handleCategoryClick = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
  };

  const handleProductClick = (product) => {
    if (product.id) {
      navigate(`/product/${product.id}`);
      return;
    }

  };

  return (
    <div
      className="hidden lg:flex relative"
      onMouseLeave={() => setHoveredCategory(null)}
    >
      <aside
        className="
          w-[280px] xl:w-[300px]
          shrink-0 flex-col
          bg-white
          border border-slate-200
          rounded-2xl
          shadow-sm
          h-fit
          sticky top-20
          max-h-[calc(100vh-180px)]
          overflow-y-auto overflow-x-hidden
        "
      >
        <nav className="py-2">
          {categories.map((category) => {
            const IconComponent = getCategoryIcon(category.id);
            const isActive = activeCategory === category.id;
            const isHovered = hoveredCategory?.id === category.id;

            return (
              <div key={category.id} className="relative">
                <button
                  type="button"
                  onClick={() => handleCategoryClick(category.id)}
                  onMouseEnter={() => setHoveredCategory(category)}
                  className={`
                    w-full flex items-center gap-3
                    px-4 py-3
                    text-left
                    transition-all duration-200
                    hover:bg-sky-100
                    ${
                      isActive || isHovered
                        ? "bg-sky-100 border-l-4 border-sky-500 pl-3"
                        : "border-l-4 border-transparent"
                    }
                  `}
                >
                  <div
                    className={`
                      w-9 h-9 rounded-lg
                      flex items-center justify-center
                      shrink-0
                      transition-all duration-200
                      ${
                        isActive || isHovered
                          ? "bg-sky-500 text-white shadow-md"
                          : "bg-slate-100 text-slate-500"
                      }
                    `}
                  >
                    <IconComponent size={18} strokeWidth={1.8} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div
                      className={`
                        text-sm font-semibold leading-tight truncate
                        ${isActive || isHovered ? "text-sky-700" : "text-slate-800"}
                      `}
                    >
                      {category.name}
                    </div>

                    <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                      {productsByCategory[category.id]?.length || 0} sản phẩm
                    </div>
                  </div>

                  <svg
                    className={`
                      w-4 h-4 shrink-0
                      transition-all duration-200
                      ${isActive || isHovered ? "text-sky-700" : "text-slate-300"}
                    `}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            );
          })}
        </nav>
      </aside>

      {hoveredCategory && (
        <div
          className="
            absolute left-[288px] xl:left-[308px] top-0
            w-[calc(100vw-360px)]
            max-w-[980px]
            min-h-[320px]
            bg-white
            border border-slate-200
            rounded-2xl
            shadow-xl
            z-50
            p-6
          "
          onMouseEnter={() => setHoveredCategory(hoveredCategory)}
        >
          <div className="mb-5">
            <h3 className="text-lg font-bold text-blue-700">
              {hoveredCategory.name}
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              {hoveredCategory.description || "Sản phẩm thuộc danh mục này"}
            </p>
          </div>

          {hoverProducts.length > 0 ? (
            <div className="grid grid-cols-3 xl:grid-cols-6 gap-x-6 gap-y-5">
              {hoverProducts.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => handleProductClick(product)}
                  className="
                    group/product
                    text-center
                    rounded-xl
                    p-2
                    hover:bg-slate-50
                    transition-all duration-200
                  "
                >
                  <div
                    className="
                      w-full aspect-square
                      flex items-center justify-center
                      rounded-xl
                      bg-slate-50
                      overflow-hidden
                    "
                  >
                    <img
                      src={
                        product.thumbnail ||
                        product.image ||
                        product.imageUrl ||
                        product.images?.[0] ||
                        "/placeholder-product.png"
                      }
                      alt={product.name}
                      className="
                        max-w-full max-h-full
                        object-contain
                        transition-transform duration-200
                        group-hover/product:scale-105
                      "
                    />
                  </div>

                  <div
                    className="
                      mt-2
                      text-sm
                      text-slate-700
                      leading-snug
                      line-clamp-2
                      group-hover/product:text-blue-700
                    "
                  >
                    {product.name}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="h-[220px] flex items-center justify-center text-sm text-slate-400">
              Chưa có sản phẩm trong danh mục này
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => handleCategoryClick(hoveredCategory.id)}
              className="
                inline-flex items-center gap-2
                rounded-full
                bg-blue-600
                px-5 py-2.5
                text-sm font-semibold
                text-white
                hover:bg-blue-700
                transition-colors
              "
            >
              Xem tất cả
              <span>→</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySidebar;