
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  getAllProductsForAdmin,
  deleteProduct,
} from "../../services/productService";
import { getCategories } from "../../services/categoryService";
import { getBrands } from "../../services/brandService";
import { useToast, useConfirm } from "../../contexts/ToastContext";
import { toInteger } from "../../utils/priceUtils";

import {
  PRODUCT_STATUS,
} from "../../constants/productMeta";

const PRODUCTS_PER_PAGE = 10;

const AdminProductsPage = () => {
  const toast = useToast();
  const { confirm } = useConfirm();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filterCategory, setFilterCategory] =
    useState("");

  const [filterBrand, setFilterBrand] =
    useState("");

  const [filterStatus, setFilterStatus] =
    useState("");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [showFilters, setShowFilters] =
    useState(false);

  // PAGINATION
  const [currentPage, setCurrentPage] =
    useState(1);

  useEffect(() => {
    // Fetch categories and brands
    const fetchMeta = async () => {
      const [cats, brds] = await Promise.all([getCategories(), getBrands()]);
      setCategories(cats);
      setBrands(brds);
    };
    fetchMeta();
    fetchProducts();
  }, []);

  // RESET PAGE WHEN FILTER CHANGES
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    filterCategory,
    filterBrand,
    filterStatus,
  ]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

const data = await getAllProductsForAdmin();

// Thêm computed field hasVariants
const productsWithVariants = (Array.isArray(data) ? data : []).map(p => ({
  ...p,
  hasVariants: p?.options?.length > 0 && p?.variants?.length > 0
}));

setProducts(productsWithVariants);
    } catch (error) {
      console.error(
        "Error fetching products:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (
    id,
    name
  ) => {
    const accepted = await confirm({
      title: "Xóa sản phẩm",
      message: `Bạn có chắc muốn xóa sản phẩm "${name}" không?`,
      confirmText: "Xóa sản phẩm",
      cancelText: "Hủy",
    });

    if (!accepted) {
      return;
    }

    try {
      await deleteProduct(id);

      setProducts((prev) =>
        prev.filter(
          (item) => item.id !== id
        )
      );

      toast.success(`Sản phẩm "${name}" đã được xóa khỏi hệ thống.`, {
        title: "Xóa sản phẩm thành công",
      });
    } catch (error) {
      console.error(
        "Error deleting product:",
        error
      );

      toast.error("Không thể xóa sản phẩm lúc này.", {
        title: "Xóa sản phẩm thất bại",
      });
    }
  };

  const formatPrice = (price) => {
    return toInteger(price).toLocaleString("vi-VN");
  };

  // FILTER PRODUCTS
const filteredProducts =
  (Array.isArray(products) ? products : []).filter((product) => {
      const matchesCategory =
        !filterCategory ||
        product.category ===
          filterCategory;

      const matchesBrand =
        !filterBrand ||
        product.brand === filterBrand;

      const matchesStatus =
        !filterStatus ||
        product.status === filterStatus;

      const matchesSearch =
        !searchTerm ||
        product.name
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        product.sku
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      return (
        matchesCategory &&
        matchesBrand &&
        matchesStatus &&
        matchesSearch
      );
    });

  // PAGINATION
  const totalPages = Math.ceil(
    filteredProducts.length /
      PRODUCTS_PER_PAGE
  );

  const paginatedProducts = useMemo(
    () => {
      const start =
        (currentPage - 1) *
        PRODUCTS_PER_PAGE;

      return filteredProducts.slice(
        start,
        start + PRODUCTS_PER_PAGE
      );
    },
    [filteredProducts, currentPage]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />

          <p className="text-slate-500 text-sm">
            Đang tải dữ liệu...
          </p>
        </div>
      </div>
    );
  }
const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=400&fit=crop";
  return (
    <div className="max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Quản lý sản phẩm
          </h1>

          <p className="text-slate-500 mt-1">
            Tổng số:
            <span className="font-semibold text-primary-600 ml-1">
              {products.length}
            </span>
            {" "}sản phẩm

            {filteredProducts.length !==
              products.length && (
              <span className="ml-2 text-sm">
                (Đang hiển thị:
                {" "}
                {filteredProducts.length})
              </span>
            )}
          </p>
        </div>

        <Link
          to="/admin/products/add"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/25 hover:bg-primary-700 hover:-translate-y-0.5 transition-all duration-200"
        >
          <PlusIcon className="w-5 h-5" />

          <span>
            Thêm sản phẩm
          </span>
        </Link>
      </div>

      {/* FILTERS */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm mb-6">
        <button
          onClick={() =>
            setShowFilters(
              !showFilters
            )
          }
          className="lg:hidden w-full flex items-center justify-between p-4 border-b border-slate-100"
        >
          <span className="flex items-center gap-2 font-medium text-slate-700">
            <FilterIcon className="w-5 h-5" />
            Bộ lọc
          </span>

          <ChevronIcon
            className={`w-5 h-5 text-slate-400 transition-transform ${
              showFilters
                ? "rotate-180"
                : ""
            }`}
          />
        </button>

        <div
          className={`${
            showFilters
              ? "block"
              : "hidden"
          } lg:block p-4`}
        >
          <div className="flex flex-col lg:flex-row gap-3">

            {/* SEARCH */}
            <div className="flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  type="text"
                  placeholder="Tìm theo tên hoặc SKU..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(
                      e.target.value
                    )
                  }
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* CATEGORY */}
            <select
              value={filterCategory}
              onChange={(e) =>
                setFilterCategory(
                  e.target.value
                )
              }
              className="px-4 py-2.5 border border-slate-200 rounded-xl"
            >
              <option value="">
                Tất cả danh mục
              </option>

              {categories.map((cat) => (
                <option
                  key={cat.id}
                  value={cat.id}
                >
                  {cat.name}
                </option>
              ))}
            </select>

            {/* BRAND */}
            <select
              value={filterBrand}
              onChange={(e) =>
                setFilterBrand(
                  e.target.value
                )
              }
              className="px-4 py-2.5 border border-slate-200 rounded-xl"
            >
              <option value="">
                Tất cả thương hiệu
              </option>

              {brands.map((brand) => (
                <option
                  key={brand.id}
                  value={brand.id}
                >
                  {brand.name}
                </option>
              ))}
            </select>

            {/* STATUS */}
            <select
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(
                  e.target.value
                )
              }
              className="px-4 py-2.5 border border-slate-200 rounded-xl"
            >
              <option value="">
                Tất cả trạng thái
              </option>

              {PRODUCT_STATUS.map(
                (status) => (
                  <option
                    key={status.id}
                    value={status.id}
                  >
                    {status.name}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

        {/* DESKTOP */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-4 py-3 text-left">
                  Ảnh
                </th>

                <th className="px-4 py-3 text-left">
                  Tên
                </th>

                <th className="px-4 py-3 text-left">
                  Giá
                </th>

                <th className="px-4 py-3 text-left">
                  Tồn kho
                </th>

                <th className="px-4 py-3 text-left">
                  Hành động
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {paginatedProducts.map(
                (product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <img
                        src={
                          product.thumbnail ||PLACEHOLDER_IMAGE
                        }
                        alt={product.name}
                          onError={(e) => {
    e.currentTarget.src = PLACEHOLDER_IMAGE;
  }}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                    </td>

                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-800">
                        {product.name}
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        SKU:
                        {" "}
                        {product.sku ||
                          "N/A"}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        {/* Giá bán */}
                        <span className="font-semibold text-red-500">
                          {product.hasVariants
                            ? `Từ ${formatPrice(product.price)}đ`
                            : `${formatPrice(product.price)}đ`
                          }
                        </span>
                        {/* Giá gốc (nếu có) */}
                        {(() => {
                          const originalPrice = product.originalPrice || product.discountPrice || 0;
                          if (originalPrice > product.price) {
                            return (
                              <span className="text-xs text-slate-400 line-through">
                                {formatPrice(originalPrice)}đ
                              </span>
                            );
                          }
                          return null;
                        })()}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`font-medium ${
                          product.stock <= 5
                            ? "text-red-500"
                            : "text-green-600"
                        }`}
                      >
                        {product.stock || 0}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">

                        {/* VIEW */}
                        <Link
                          to={`/product/${product.id}`}
                          target="_blank"
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </Link>

                        {/* EDIT */}
                        <Link
                          to={`/admin/products/edit/${product.id}`}
                          className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"
                        >
                          <EditIcon className="w-4 h-4" />
                        </Link>

                        {/* DELETE */}
                        <button
                          onClick={() =>
                            handleDelete(
                              product.id,
                              product.name
                            )
                          }
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {/* MOBILE */}
        <div className="md:hidden divide-y divide-slate-100">
          {paginatedProducts.map(
            (product) => (
              <div
                key={product.id}
                className="p-4"
              >
                <div className="flex gap-3">
                  <img
                    src={
                      product.thumbnail ||PLACEHOLDER_IMAGE
                    }
                    alt={product.name}
                    className="w-20 h-20 rounded-xl object-cover"
                    onError={(e) => {
                      e.currentTarget.src = PLACEHOLDER_IMAGE;
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-slate-800 text-sm line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Giá bán */}
                    <p className="font-semibold text-red-500 mt-2">
                      {product.hasVariants
                        ? `Từ ${formatPrice(product.price)}đ`
                        : `${formatPrice(product.price)}đ`
                      }
                    </p>
                    {/* Giá gốc (nếu có) */}
                    {(() => {
                      const originalPrice = product.originalPrice || product.discountPrice || 0;
                      if (originalPrice > product.price) {
                        return (
                          <p className="text-xs text-slate-400 line-through">
                            {formatPrice(originalPrice)}đ
                          </p>
                        );
                      }
                      return null;
                    })()}

                    <p className="text-sm mt-1">
                      Tồn kho:
                      {" "}
                      {product.stock || 0}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">

                  <Link
                    to={`/product/${product.id}`}
                    target="_blank"
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg"
                  >
                    <EyeIcon className="w-4 h-4" />
                    Xem
                  </Link>

                  <Link
                    to={`/admin/products/edit/${product.id}`}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-amber-50 text-amber-600 rounded-lg"
                  >
                    <EditIcon className="w-4 h-4" />
                    Sửa
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(
                        product.id,
                        product.name
                      )
                    }
                    className="flex items-center justify-center gap-1.5 px-3 py-2 bg-red-50 text-red-600 rounded-lg"
                  >
                    <TrashIcon className="w-4 h-4" />
                    Xóa
                  </button>
                </div>
              </div>
            )
          )}
        </div>

        {/* PAGINATION */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

// ============================================
// PAGINATION
// ============================================

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 p-5 border-t border-slate-100 flex-wrap">

      <button
        onClick={() =>
          onPageChange(currentPage - 1)
        }
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium disabled:opacity-50"
      >
        Trước
      </button>

      {Array.from({
        length: totalPages,
      }).map((_, index) => {
        const page = index + 1;

        return (
          <button
            key={page}
            onClick={() =>
              onPageChange(page)
            }
            className={`
              w-10 h-10 rounded-xl text-sm font-semibold transition
              ${
                currentPage === page
                  ? "bg-primary-600 text-white"
                  : "border border-slate-200 hover:bg-slate-50"
              }
            `}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() =>
          onPageChange(currentPage + 1)
        }
        disabled={
          currentPage === totalPages
        }
        className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium disabled:opacity-50"
      >
        Sau
      </button>
    </div>
  );
};

// ============================================
// ICONS
// ============================================

const PlusIcon = ({
  className,
}) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m8-8H4"
    />
  </svg>
);

const SearchIcon = ({
  className,
}) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const FilterIcon = ({
  className,
}) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
    />
  </svg>
);

const ChevronIcon = ({
  className,
}) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const EyeIcon = ({
  className,
}) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />

    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const EditIcon = ({
  className,
}) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);

const TrashIcon = ({
  className,
}) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

export default AdminProductsPage;
