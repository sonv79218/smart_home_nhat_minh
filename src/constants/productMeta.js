// ============================================
// PRODUCT METADATA - Utility functions only
// NOTE: CATEGORIES and BRANDS moved to:
// - public/data/categories.json
// - public/data/brands.json
// Use categoryService.js and brandService.js instead
// ============================================

export const PRODUCT_STATUS = [
  { id: "active", name: "Hoạt động", color: "#27ae60" },
  { id: "inactive", name: "Không hoạt động", color: "#95a5a6" },
  { id: "draft", name: "Bản nháp", color: "#f39c12" },
];

export const generateSlug = (text) => {
  if (!text) return "";
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

export const generateSKU = (name, category) => {
  if (!name) return "";
  const prefix = category?.toUpperCase().slice(0, 3) || "PRD";
  const namePart = name
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 4);
  const random = Math.floor(Math.random() * 9000) + 1000;
  return `${prefix}-${namePart}-${random}`;
};

export const sanitizeProductData = (data) => {
  const sanitized = {};

  Object.keys(data).forEach((key) => {
    const value = data[key];

    if (value === undefined || value === null || value === "") {
      return;
    }

    if (key === "specifications" && Array.isArray(value)) {
      const filteredSpecs = value.filter(
        (spec) => spec.key?.trim() && spec.value?.trim()
      );
      if (filteredSpecs.length > 0) {
        sanitized[key] = filteredSpecs;
      }
      return;
    }

    if (Array.isArray(value) && value.length === 0) {
      return;
    }

    sanitized[key] = value;
  });

  return sanitized;
};

export const formatPrice = (price) => {
  if (!price && price !== 0) return "0đ";
  return Number(price).toLocaleString("vi-VN") + "đ";
};

export const calculateDiscountPercent = (price, discountPrice) => {
  if (!price || !discountPrice || discountPrice >= price) return 0;
  return Math.round(((price - discountPrice) / price) * 100);
};
