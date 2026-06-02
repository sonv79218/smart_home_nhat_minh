// ============================================
// VARIANT SELECTOR COMPONENT
// Hiển thị lựa chọn biến thể sản phẩm
// ============================================
import { useMemo } from "react";

/**
 * Tìm variant phù hợp với các option đã chọn
 */
export const findVariant = (variants, selectedOptions) => {
  if (!variants || variants.length === 0) return null;
  
  return variants.find((variant) => {
    return variant.optionValues.every((val, idx) => {
      const optionName = Object.keys(selectedOptions)[idx];
      return selectedOptions[optionName] === val;
    });
  });
};

/**
 * Kiểm tra xem một option value có khả dụng không (dựa trên variants)
 */
export const isOptionAvailable = (variants, optionName, optionValue, selectedOptions) => {
  if (!variants || variants.length === 0) return true;
  
  // Tạo một bản sao của selectedOptions và thử với optionValue này
  const testOptions = { ...selectedOptions, [optionName]: optionValue };
  
  // Kiểm tra xem có variant nào phù hợp với testOptions không
  return variants.some((variant) => {
    return variant.optionValues.every((val, idx) => {
      const name = Object.keys(testOptions)[idx];
      return testOptions[name] === val;
    });
  });
};

/**
 * Component chọn option đơn lẻ
 */
const OptionSelector = ({ 
  optionName, 
  values, 
  selectedValue, 
  onSelect, 
  availableValues = [] 
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {optionName}
      </label>
      <div className="flex flex-wrap gap-2">
        {values.map((value) => {
          const isSelected = selectedValue === value;
          const isAvailable = availableValues.length === 0 || availableValues.includes(value);
          const isDisabled = !isAvailable;
          
          return (
            <button
              key={value}
              type="button"
              disabled={isDisabled}
              onClick={() => !isDisabled && onSelect(optionName, value)}
              className={`
                px-4 py-2 rounded-lg border text-sm font-medium transition-all
                ${isSelected 
                  ? "border-primary-600 bg-primary-600 text-white shadow-sm" 
                  : isDisabled
                    ? "border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed opacity-50"
                    : "border-slate-200 bg-white text-slate-700 hover:border-primary-400 hover:bg-primary-50"
                }
              `}
            >
              {value}
              {isDisabled && <span className="ml-1 text-xs">(Hết hàng)</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

/**
 * VariantSelector - Main component
 */
const VariantSelector = ({ 
  options, 
  variants, 
  selectedOptions, 
  onSelect,
  className = "" 
}) => {
  // Tính toán các giá trị khả dụng cho mỗi option
  const availableOptions = useMemo(() => {
    if (!variants || variants.length === 0) return {};
    
    const available = {};
    options.forEach((option) => {
      const values = [];
      variants.forEach((variant) => {
        const optionIndex = options.indexOf(option);
        const value = variant.optionValues[optionIndex];
        if (value && !values.includes(value)) {
          // Kiểm tra xem variant này có stock > 0 không
          if (variant.stock > 0) {
            values.push(value);
          }
        }
      });
      available[option.name] = values;
    });
    return available;
  }, [options, variants]);

  if (!options || options.length === 0) return null;

  return (
    <div className={`variant-selector ${className}`}>
      {options.map((option) => (
        <OptionSelector
          key={option.name}
          optionName={option.name}
          values={option.values}
          selectedValue={selectedOptions[option.name]}
          onSelect={onSelect}
          availableValues={availableOptions[option.name] || []}
        />
      ))}
    </div>
  );
};

/**
 * Hiển thị thông tin variant đã chọn
 */
export const SelectedVariantInfo = ({ variant, product }) => {
  if (!variant) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
        <p className="text-red-600 text-sm font-medium">
          Không có phiên bản này
        </p>
      </div>
    );
  }

  const hasDiscount = variant.discountPrice > 0 && variant.discountPrice < variant.price;
  const discountPercent = hasDiscount 
    ? Math.round(((variant.price - variant.discountPrice) / variant.price) * 100) 
    : 0;

  return (
    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
      {/* SKU */}
      {variant.sku && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">SKU:</span>
          <span className="font-mono text-slate-700">{variant.sku}</span>
        </div>
      )}

      {/* Price */}
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className="text-2xl font-bold text-red-600">
          {Number(hasDiscount ? variant.discountPrice : variant.price).toLocaleString()}đ
        </span>
        {hasDiscount && (
          <>
            <span className="text-base text-slate-400 line-through">
              {Number(variant.price).toLocaleString()}đ
            </span>
            <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded">
              -{discountPercent}%
            </span>
          </>
        )}
      </div>

      {/* Stock */}
      <div className="flex items-center gap-2">
        {variant.stock > 0 ? (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <span className="text-green-600 text-sm font-medium">
              Còn hàng ({variant.stock})
            </span>
          </>
        ) : (
          <span className="text-red-500 text-sm font-medium">Hết hàng</span>
        )}
      </div>
    </div>
  );
};

export default VariantSelector;
