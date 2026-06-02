// ============================================
// PRODUCT DETAIL PAGE
// Modern E-commerce Style with Variant Support
// ============================================
import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, getProducts } from "../services/productService";
import { getCategoryName } from "../services/categoryService";
import { getBrandById } from "../services/brandService";
import useCart from "../hooks/useCart";
import ProductCard from "./home/components/ProductCard";
import VariantSelector, { SelectedVariantInfo } from "../components/product/VariantSelector";

// ============================================
// HELPERS
// ============================================
const findVariantByOptions = (variants, selectedOptions) => {
  if (!variants || variants.length === 0) return null;
  
  return variants.find((variant) => {
    return variant.optionValues.every((val, idx) => {
      const optionName = Object.keys(selectedOptions)[idx];
      return selectedOptions[optionName] === val;
    });
  });
};

const isOptionAvailable = (variants, optionName, optionValue, selectedOptions) => {
  if (!variants || variants.length === 0) return true;
  
  const testOptions = { ...selectedOptions, [optionName]: optionValue };
  
  return variants.some((variant) => {
    return variant.optionValues.every((val, idx) => {
      const name = Object.keys(testOptions)[idx];
      return testOptions[name] === val;
    });
  });
};

// ============================================
// BREADCRUMBS
// ============================================
const Breadcrumbs = ({ product, navigate }) => (
  <nav className="flex items-center gap-2 text-sm mb-6 flex-wrap">
    <button 
      onClick={() => navigate("/")} 
      className="text-slate-500 hover:text-primary-600 transition-colors"
    >
      Trang chủ
    </button>
    <span className="text-slate-300">/</span>
    <button 
      onClick={() => navigate("/products")} 
      className="text-slate-500 hover:text-primary-600 transition-colors"
    >
      Sản phẩm
    </button>
    <span className="text-slate-300">/</span>
    <span className="text-slate-800 font-medium max-w-[200px] truncate">
      {product.name}
    </span>
  </nav>
);

// ============================================
// PRODUCT GALLERY
// ============================================
const ProductGallery = ({ images, selectedImage, setSelectedImage }) => {
  const allImages = images.length > 0 ? images : [];
  const PLACEHOLDER_IMAGE =
    "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=400&fit=crop";
  return (
    <div className="lg:sticky lg:top-24">
      {/* Main Image */}
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm">
        <img
          src={allImages[selectedImage] || allImages[0] || PLACEHOLDER_IMAGE}
          alt="Product"
          onError={(e) => {
            e.target.src = PLACEHOLDER_IMAGE;
          }}
          className="w-full aspect-square object-contain p-4 md:p-6 transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
          {allImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`
                flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden
                border-2 transition-all duration-200
                ${selectedImage === index 
                  ? "border-primary-600 shadow-md" 
                  : "border-transparent hover:border-slate-300"
                }
              `}
            >
              <img 
                src={img} 
                alt={`Thumbnail ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ============================================
// PRODUCT INFO (với variant support)
// ============================================
const ProductInfo = ({ 
  product, 
  selectedVariant, 
  hasVariants,
  brandName, 
  categoryName 
}) => {
  // Nếu có variants, dùng thông tin từ variant
  const displayPrice = hasVariants && selectedVariant 
    ? (selectedVariant.discountPrice > 0 ? selectedVariant.discountPrice : selectedVariant.price)
    : (product.discountPrice > 0 ? product.discountPrice : product.price);
  
  const displayOriginalPrice = hasVariants && selectedVariant 
    ? selectedVariant.price
    : product.price;
  
  const hasDiscount = displayOriginalPrice > displayPrice;
  const discountPercent = hasDiscount 
    ? Math.round(((displayOriginalPrice - displayPrice) / displayOriginalPrice) * 100)
    : 0;
  
  const displayStock = hasVariants && selectedVariant 
    ? selectedVariant.stock
    : product.stock;

  return (
    <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm">
      {/* Brand */}
      <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">
        {brandName}
      </span>

      {/* Title */}
      <h1 className="text-xl md:text-2xl font-bold text-slate-800 mt-2 mb-4 leading-snug">
        {product.name}
      </h1>

      {/* Badges */}
      {(product.bestSeller || product.newProduct || product.featured) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {product.bestSeller && (
            <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-lg">
              🔥 Bán chạy
            </span>
          )}
          {product.newProduct && (
            <span className="px-3 py-1 bg-gradient-to-r from-primary-600 to-blue-500 text-white text-xs font-bold rounded-lg">
              ✨ Mới
            </span>
          )}
          {product.featured && (
            <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-lg">
              ⭐ Nổi bật
            </span>
          )}
        </div>
      )}

      {/* Rating */}
      {product.rating > 0 && (
        <div className="flex items-center gap-3 mb-4">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={star <= Math.round(product.rating) ? "#f59e0b" : "#e2e8f0"}
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-slate-500">
            {Number(product.rating).toFixed(1)} ({product.ratingCount || 0} đánh giá)
          </span>
        </div>
      )}

      {/* Price */}
      <div className="flex items-baseline gap-3 mb-4 flex-wrap">
        <span className="text-3xl md:text-4xl font-bold text-red-600">
          {Number(displayPrice).toLocaleString()}đ
        </span>
        {hasDiscount && (
          <>
            <span className="text-lg text-slate-400 line-through">
              {Number(displayOriginalPrice).toLocaleString()}đ
            </span>
            <span className="px-2 py-1 bg-red-50 text-red-500 text-sm font-bold rounded-lg">
              -{discountPercent}%
            </span>
          </>
        )}
      </div>

      {/* Stock & Sold */}
      <div className="flex items-center gap-4 text-sm mb-4">
        {displayStock > 0 ? (
          <div className="flex items-center gap-1.5 text-green-600 font-semibold">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <span>Còn hàng ({displayStock})</span>
          </div>
        ) : (
          <span className="text-red-500 font-semibold">Hết hàng</span>
        )}
        {product.sold > 0 && (
          <span className="text-slate-400">| Đã bán: {product.sold}</span>
        )}
      </div>

      {/* Short Description */}
      {product.shortDescription && (
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          {product.shortDescription}
        </p>
      )}

      {/* Tags */}
      {product.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag, index) => (
            <span 
              key={index} 
              className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

// ============================================
// ACTION BUTTONS
// ============================================
const ProductActions = ({ 
  product, 
  selectedVariant,
  hasVariants,
  addToCart, 
  navigate 
}) => {
  const [addedToCart, setAddedToCart] = useState(false);
  
  // Kiểm tra stock
  const displayStock = hasVariants && selectedVariant 
    ? selectedVariant.stock
    : product.stock;
  const isOutOfStock = displayStock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    
    // Tạo cart item với variant info
    const cartItem = {
      id: product.id,
      name: product.name,
      thumbnail: hasVariants && selectedVariant?.thumbnail 
        ? selectedVariant.thumbnail 
        : product.thumbnail,
      // Nếu có variant, lưu variant info
      ...(hasVariants && selectedVariant && {
        variantId: selectedVariant.id,
        sku: selectedVariant.sku,
        optionValues: selectedVariant.optionValues,
        price: selectedVariant.discountPrice > 0 ? selectedVariant.discountPrice : selectedVariant.price,
        originalPrice: selectedVariant.price,
      }),
      // Fallback cho sản phẩm không có variant
      ...(!hasVariants && {
        price: product.discountPrice > 0 ? product.discountPrice : product.price,
        originalPrice: product.price,
      }),
    };
    
    addToCart(cartItem);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    
    const cartItem = {
      id: product.id,
      name: product.name,
      thumbnail: hasVariants && selectedVariant?.thumbnail 
        ? selectedVariant.thumbnail 
        : product.thumbnail,
      ...(hasVariants && selectedVariant && {
        variantId: selectedVariant.id,
        sku: selectedVariant.sku,
        optionValues: selectedVariant.optionValues,
        price: selectedVariant.discountPrice > 0 ? selectedVariant.discountPrice : selectedVariant.price,
        originalPrice: selectedVariant.price,
      }),
      ...(!hasVariants && {
        price: product.discountPrice > 0 ? product.discountPrice : product.price,
        originalPrice: product.price,
      }),
    };
    
    addToCart(cartItem);
    navigate("/checkout");
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      {/* Desktop Layout */}
      <div className="hidden sm:flex gap-3">
        {/* Thêm vào giỏ */}
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`
            flex-1 flex items-center justify-center gap-2 h-14 px-6
            rounded-xl font-bold text-base transition-all duration-200
            ${isOutOfStock 
              ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
              : addedToCart
                ? "bg-green-500 text-white"
                : "bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-50 active:scale-95"
            }
          `}
        >
          {addedToCart ? (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Đã thêm vào giỏ!
            </>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              Thêm vào giỏ
            </>
          )}
        </button>

        {/* Mua ngay */}
        <button
          onClick={handleBuyNow}
          disabled={isOutOfStock}
          className={`
            flex-1 flex items-center justify-center gap-2 h-14 px-6
            rounded-xl font-bold text-base transition-all duration-200
            ${isOutOfStock 
              ? "bg-slate-300 text-slate-500 cursor-not-allowed" 
              : "bg-gradient-to-r from-primary-600 to-blue-500 text-white shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 active:scale-95"
            }
          `}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Mua ngay
        </button>
      </div>

      {/* Mobile Layout - Sticky Bottom Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-slate-100 p-4 z-50 rounded-t-2xl shadow-lg">
        <div className="flex gap-3">
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`
              flex items-center justify-center gap-2 h-12 px-4
              rounded-xl font-bold text-sm transition-all duration-200 flex-1
              ${isOutOfStock 
                ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                : addedToCart
                  ? "bg-green-500 text-white"
                  : "bg-white border-2 border-primary-600 text-primary-600"
              }
            `}
          >
            {addedToCart ? "Đã thêm!" : "Thêm vào giỏ"}
          </button>

          <button
            onClick={handleBuyNow}
            disabled={isOutOfStock}
            className={`
              flex items-center justify-center gap-2 h-12 px-4
              rounded-xl font-bold text-sm transition-all duration-200 flex-1
              ${isOutOfStock 
                ? "bg-slate-300 text-slate-500 cursor-not-allowed" 
                : "bg-gradient-to-r from-primary-600 to-blue-500 text-white shadow-lg"
              }
            `}
          >
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// PRODUCT META GRID
// ============================================
const ProductMeta = ({ product, categoryName, brandName, selectedVariant, hasVariants }) => {
  const displayStock = hasVariants && selectedVariant ? selectedVariant.stock : product.stock;
  const displaySku = hasVariants && selectedVariant?.sku ? selectedVariant.sku : product.sku;

  return (
    <div className="grid grid-cols-2 gap-3 bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex flex-col gap-1 p-3 bg-slate-50 rounded-xl">
        <span className="text-[11px] text-slate-400 font-semibold uppercase">Danh mục</span>
        <span className="text-sm text-slate-800 font-medium">{categoryName}</span>
      </div>
      <div className="flex flex-col gap-1 p-3 bg-slate-50 rounded-xl">
        <span className="text-[11px] text-slate-400 font-semibold uppercase">Thương hiệu</span>
        <span className="text-sm text-slate-800 font-medium">{brandName}</span>
      </div>
      <div className="flex flex-col gap-1 p-3 bg-slate-50 rounded-xl">
        <span className="text-[11px] text-slate-400 font-semibold uppercase">SKU</span>
        <span className="text-sm text-slate-800 font-medium font-mono">
          {displaySku || "N/A"}
        </span>
      </div>
      <div className="flex flex-col gap-1 p-3 bg-slate-50 rounded-xl">
        <span className="text-[11px] text-slate-400 font-semibold uppercase">Tình trạng</span>
        <span className={`text-sm font-medium ${displayStock > 0 ? "text-green-600" : "text-red-500"}`}>
          {displayStock > 0 ? "Còn hàng" : "Hết hàng"}
        </span>
      </div>
    </div>
  );
};

// ============================================
// RELATED PRODUCTS
// ============================================
const RelatedProducts = ({ products }) => {
  if (!products || products.length === 0) return null;

  return (
    <section className="mt-10 md:mt-12 mb-24 md:mb-12">
      <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">
        Sản phẩm liên quan
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [brandName, setBrandName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  
  // Variant state
  const [selectedOptions, setSelectedOptions] = useState({});

  // Check if product has variants
  const hasVariants = product?.options?.length > 0 && product?.variants?.length > 0;

  // Find selected variant based on options
  const selectedVariant = useMemo(() => {
    if (!hasVariants) return null;
    return findVariantByOptions(product.variants, selectedOptions);
  }, [hasVariants, product?.variants, selectedOptions]);

  // Get images for gallery (variant thumbnail or product images)
  const displayImages = useMemo(() => {
    if (selectedVariant?.thumbnail) {
      return [selectedVariant.thumbnail, ...(product?.images || [])];
    }
    return product?.thumbnail 
      ? [product.thumbnail, ...(product.images || [])]
      : product?.images || [];
  }, [selectedVariant, product]);

  // Initialize selected options when product loads
  useEffect(() => {
    if (product?.options && product.options.length > 0) {
      const initialOptions = {};
      product.options.forEach((option) => {
        // Auto-select first available option
        if (option.values && option.values.length > 0) {
          initialOptions[option.name] = option.values[0];
        }
      });
      setSelectedOptions(initialOptions);
    } else {
      setSelectedOptions({});
    }
  }, [product]);

  // Handle option selection
  const handleOptionSelect = (optionName, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productData, allProducts] = await Promise.all([
          getProductById(id),
          getProducts()
        ]);

        setProduct(productData);
        setSelectedImage(0);

        if (productData?.brand) {
          const brand = await getBrandById(productData.brand);
          setBrandName(brand?.name || productData.brand);
        }
        if (productData?.category) {
          const catName = getCategoryName(productData.category);
          setCategoryName(catName);
        }

        if (productData?.category) {
          const related = allProducts
            .filter(p => p.category === productData.category && p.id !== id && p.status === "active")
            .slice(0, 5);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          <p className="text-slate-500">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Không tìm thấy sản phẩm</h2>
          <p className="text-slate-500 mb-6">Sản phẩm bạn đang tìm kiếm không tồn tại.</p>
          <button 
            onClick={() => navigate("/products")}
            className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
          >
            Quay lại cửa hàng
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-28 md:pb-16">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-6">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center gap-2 px-4 py-2 mb-4 md:mb-0 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Quay lại
        </button>

        {/* Breadcrumbs */}
        <Breadcrumbs product={product} navigate={navigate} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 mb-10">
          {/* Left: Gallery */}
          <ProductGallery
            images={displayImages}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />

          {/* Right: Info & Actions */}
          <div className="space-y-4">
            <ProductInfo
              product={product}
              selectedVariant={selectedVariant}
              hasVariants={hasVariants}
              brandName={brandName}
              categoryName={categoryName}
            />

            {/* Variant Selector */}
            {hasVariants && (
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <h3 className="text-base font-bold text-slate-800 mb-4">
                  Lựa chọn biến thể
                </h3>
                <VariantSelector
                  options={product.options}
                  variants={product.variants}
                  selectedOptions={selectedOptions}
                  onSelect={handleOptionSelect}
                />
                {selectedVariant && (
                  <SelectedVariantInfo variant={selectedVariant} product={product} />
                )}
              </div>
            )}

            {/* Actions */}
            <ProductActions
              product={product}
              selectedVariant={selectedVariant}
              hasVariants={hasVariants}
              addToCart={addToCart}
              navigate={navigate}
            />

            {/* Meta Grid */}
            <ProductMeta
              product={product}
              categoryName={categoryName}
              brandName={brandName}
              selectedVariant={selectedVariant}
              hasVariants={hasVariants}
            />
          </div>
        </div>

        {/* Description Section */}
        {(product.description || product.specifications?.length > 0) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            {product.description && (
              <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-800 mb-4 pb-3 border-b border-slate-100">
                  Mô tả sản phẩm
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
                  {product.description}
                </p>
              </div>
            )}

            {product.specifications?.length > 0 && (
              <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-800 mb-4 pb-3 border-b border-slate-100">
                  Thông số kỹ thuật
                </h2>
                <div className="space-y-3">
                  {product.specifications.map((spec, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between items-center p-3 bg-slate-50 rounded-xl"
                    >
                      <span className="text-sm text-slate-500 font-medium">{spec.key}</span>
                      <span className="text-sm text-slate-800 font-semibold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
