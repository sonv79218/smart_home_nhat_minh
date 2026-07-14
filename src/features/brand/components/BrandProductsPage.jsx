// ============================================
// BRAND PRODUCTS PAGE - Shared component for Aqara and Lumi brand pages
// Fetches all products, filters by brand client-side to handle any data shape
// ============================================
import { useState, useEffect, useMemo } from "react";
import { getProducts } from "../../../services/productService";
import { getCategories } from "../../../services/categoryService";
import CategoryProductSection from "../../../features/home/components/category/CategoryProductSection";

// ---- Helpers ----

const normalizeValue = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase();

const getProductBrand = (product) => {
  const brand = product?.brand;

  if (brand && typeof brand === "object") {
    return normalizeValue(
      brand.slug ??
        brand.id ??
        brand.code ??
        brand.name
    );
  }

  return normalizeValue(
    product?.brandSlug ??
      product?.brandId ??
      product?.brandCode ??
      brand ??
      product?.manufacturer
  );
};

const getProductCategory = (product) => {
  const category = product?.category;

  if (category && typeof category === "object") {
    return normalizeValue(
      category.slug ??
        category.id ??
        category.code ??
        category.name
    );
  }

  return normalizeValue(
    product?.categorySlug ??
      product?.categoryId ??
      product?.categoryCode ??
      category
  );
};

const getCategoryId = (category) =>
  normalizeValue(
    category?.slug ??
      category?.id ??
      category?.categoryId ??
      category?.code ??
      category?.name
  );

// ---- Skeletons ----

const ProductSkeleton = () => (
  <div className="rounded-2xl border border-slate-100 bg-white overflow-hidden animate-pulse">
    <div className="aspect-square bg-slate-200" />
    <div className="p-4 space-y-2">
      <div className="h-4 bg-slate-200 rounded w-3/4" />
      <div className="h-4 bg-slate-200 rounded w-1/2" />
      <div className="h-5 bg-slate-200 rounded w-2/3 mt-3" />
    </div>
  </div>
);

const BrandPageSkeleton = () => (
  <div className="py-8 md:py-12">
    <div className="max-w-[1200px] mx-auto px-4 md:px-6">
      <div className="h-8 bg-slate-200 rounded w-48 mx-auto mb-10 animate-pulse" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 md:gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
);

// ---- Component ----

const BrandProductsPage = ({ brandKey, name, tagline, description }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);

        if (cancelled) return;

        // Normalize response — handle any service response shape
        const normalized = Array.isArray(productsData)
          ? productsData
          : Array.isArray(productsData?.products)
            ? productsData.products
            : Array.isArray(productsData?.data)
              ? productsData.data
              : [];

        setAllProducts(normalized);
        setCategories(
          Array.isArray(categoriesData)
            ? categoriesData
            : categoriesData?.categories || []
        );
      } catch (error) {
        console.error("[BrandProductsPage] fetchData error:", error);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [brandKey]);

  // Filter to brand + active; re-check on every product field shape
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const productBrand = getProductBrand(product);
      const status = normalizeValue(
        product?.status ?? product?.productStatus
      );

      const matchesBrand = productBrand === brandKey;
      const isActive = !status || status === "active";

      return matchesBrand && isActive;
    });
  }, [allProducts, brandKey]);

  // Group by category
  const visibleCategories = useMemo(() => {
    return categories
      .map((category) => {
        const categoryId = getCategoryId(category);
        return {
          ...category,
          products: filteredProducts.filter((product) => {
            const productCat = getProductCategory(product);
            return productCat === categoryId;
          }),
        };
      })
      .filter((category) => category.products.length > 0);
  }, [categories, filteredProducts]);

  // Debug log in development only
  if (import.meta.env.DEV) {
    console.log("[BrandProductsPage] brandKey:", brandKey);
    console.table(
      allProducts.map((product) => ({
        name:
          product?.name ??
          product?.title ??
          product?.productName ??
          "",
        rawBrand:
          typeof product?.brand === "object"
            ? JSON.stringify(product.brand)
            : product?.brand,
        normalizedBrand: getProductBrand(product),
        category: getProductCategory(product),
      }))
    );
  }

  return (
    <div className="w-full">
      {/* Brand Header */}
      <div className="bg-gradient-to-r from-primary-600 to-accent py-12 md:py-16">
        <div className="mx-auto max-w-[1200px] px-4 md:px-6">
          <div className="max-w-2xl">
            <h1 className="mb-2 text-3xl font-extrabold text-white md:text-4xl lg:text-5xl">
              {name}
            </h1>
            {tagline && (
              <p className="mb-3 text-base font-medium text-white/80 md:text-lg">
                {tagline}
              </p>
            )}
            {description && (
              <p className="text-sm leading-relaxed text-white/70 md:text-base">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Category sections */}
      <div className="w-full">
        {isLoading ? (
          <BrandPageSkeleton />
        ) : visibleCategories.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center text-center py-20">
            <p className="text-lg font-semibold text-slate-700">
              Chưa có sản phẩm nào
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Sản phẩm thương hiệu{" "}
              <span className="font-medium text-primary-600">{name}</span>{" "}
              đang được cập nhật.
            </p>
          </div>
        ) : (
          visibleCategories.map((category) => {
            const categoryId = getCategoryId(category);
            return (
              <CategoryProductSection
                key={category.id}
                category={category}
                products={category.products}
                viewAllLink={`/products?category=${encodeURIComponent(
                  categoryId
                )}&brand=${encodeURIComponent(brandKey)}`}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default BrandProductsPage;