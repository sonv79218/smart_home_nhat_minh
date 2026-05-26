import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../services/productService";
import { uploadImageToCloudinary } from "../../services/cloudinaryService";
import {
  CATEGORIES,
  BRANDS,
  generateSlug,
  generateSKU,
} from "../../constants/productMeta";

const AddProductPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    brand: "",
    category: "",
    price: "",
    discountPrice: "",
    costPrice: "",
    stock: "",
    minStockAlert: "5",
    shortDescription: "",
    description: "",
    tags: "",
    featured: false,
    bestSeller: false,
    newProduct: false,
    status: "active",
  });

  const [specifications, setSpecifications] = useState([
    { key: "", value: "" },
  ]);

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setImageFiles(files);
      const previews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
    }
  };

  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...specifications];
    newSpecs[index][field] = value;
    setSpecifications(newSpecs);
  };

  const addSpecification = () => {
    setSpecifications([...specifications, { key: "", value: "" }]);
  };

  const removeSpecification = (index) => {
    const newSpecs = specifications.filter((_, i) => i !== index);
    setSpecifications(newSpecs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.category || !formData.brand) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    try {
      setLoading(true);

      let thumbnailUrl = "";
      if (thumbnailFile) {
        thumbnailUrl = await uploadImageToCloudinary(thumbnailFile);
      }

      let uploadedImages = [];
      if (imageFiles.length > 0) {
        uploadedImages = await Promise.all(
          imageFiles.map((file) => uploadImageToCloudinary(file))
        );
      }

      const specsArray = specifications
        .filter((spec) => spec.key.trim() && spec.value.trim())
        .map((spec) => ({
          key: spec.key.trim(),
          value: spec.value.trim(),
        }));

      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);

      const productData = {
        ...formData,
        slug: generateSlug(formData.name),
        sku: formData.sku || generateSKU(formData.name, formData.category),
        price: Number(formData.price),
        discountPrice: formData.discountPrice ? Number(formData.discountPrice) : 0,
        costPrice: formData.costPrice ? Number(formData.costPrice) : 0,
        stock: Number(formData.stock) || 0,
        minStockAlert: Number(formData.minStockAlert) || 5,
        specifications: specsArray,
        tags: tagsArray,
        thumbnail: thumbnailUrl,
        images: uploadedImages,
        sold: 0,
        rating: 0,
        ratingCount: 0,
      };

      await addProduct(productData);

      alert("Thêm sản phẩm thành công!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Có lỗi xảy ra khi thêm sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      sku: "",
      brand: "",
      category: "",
      price: "",
      discountPrice: "",
      costPrice: "",
      stock: "",
      minStockAlert: "5",
      shortDescription: "",
      description: "",
      tags: "",
      featured: false,
      bestSeller: false,
      newProduct: false,
      status: "active",
    });
    setSpecifications([{ key: "", value: "" }]);
    setThumbnailFile(null);
    setThumbnailPreview("");
    setImageFiles([]);
    setImagePreviews([]);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px" }}>
      <h1>Thêm sản phẩm mới</h1>

      <form onSubmit={handleSubmit}>
        <div style={sectionStyle}>
          <h3 style={sectionTitle}>Thông tin cơ bản</h3>

          <div style={formGroup}>
            <label style={labelStyle}>Tên sản phẩm *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="VD: Camera IP Xiaomi 360"
              style={inputStyle}
              required
            />
          </div>

          <div style={grid2Cols}>
            <div style={formGroup}>
              <label style={labelStyle}>SKU</label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                placeholder="Tự động tạo nếu để trống"
                style={inputStyle}
              />
            </div>

            <div style={formGroup}>
              <label style={labelStyle}>Danh mục *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={selectStyle}
                required
              >
                <option value="">Chọn danh mục</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={formGroup}>
            <label style={labelStyle}>Thương hiệu *</label>
            <select
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              style={selectStyle}
              required
            >
              <option value="">Chọn thương hiệu</option>
              {BRANDS.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitle}>Giá & Tồn kho</h3>

          <div style={grid3Cols}>
            <div style={formGroup}>
              <label style={labelStyle}>Giá bán *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0"
                style={inputStyle}
                min="0"
                required
              />
            </div>

            <div style={formGroup}>
              <label style={labelStyle}>Giá gốc</label>
              <input
                type="number"
                name="costPrice"
                value={formData.costPrice}
                onChange={handleChange}
                placeholder="0"
                style={inputStyle}
                min="0"
              />
            </div>

            <div style={formGroup}>
              <label style={labelStyle}>Giá giảm</label>
              <input
                type="number"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleChange}
                placeholder="0"
                style={inputStyle}
                min="0"
              />
            </div>
          </div>

          <div style={grid2Cols}>
            <div style={formGroup}>
              <label style={labelStyle}>Số lượng tồn kho</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="0"
                style={inputStyle}
                min="0"
              />
            </div>

            <div style={formGroup}>
              <label style={labelStyle}>Cảnh báo tồn kho tối thiểu</label>
              <input
                type="number"
                name="minStockAlert"
                value={formData.minStockAlert}
                onChange={handleChange}
                placeholder="5"
                style={inputStyle}
                min="0"
              />
            </div>
          </div>
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitle}>Hình ảnh</h3>

          <div style={grid2Cols}>
            <div style={formGroup}>
              <label style={labelStyle}>Ảnh đại diện (Thumbnail) *</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                style={fileInputStyle}
                required={!thumbnailPreview}
              />
              {thumbnailPreview && (
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail preview"
                  style={previewImage}
                />
              )}
            </div>

            <div style={formGroup}>
              <label style={labelStyle}>Ảnh phụ (Gallery)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImagesChange}
                style={fileInputStyle}
              />
              {imagePreviews.length > 0 && (
                <div style={previewGallery}>
                  {imagePreviews.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      style={previewThumb}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitle}>Mô tả</h3>

          <div style={formGroup}>
            <label style={labelStyle}>Mô tả ngắn</label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="Mô tả ngắn gọn về sản phẩm..."
              rows="2"
              style={textareaStyle}
            />
          </div>

          <div style={formGroup}>
            <label style={labelStyle}>Mô tả chi tiết</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Mô tả chi tiết sản phẩm..."
              rows="5"
              style={textareaStyle}
            />
          </div>
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitle}>Thông số kỹ thuật</h3>

          {specifications.map((spec, index) => (
            <div key={index} style={specRow}>
              <input
                type="text"
                value={spec.key}
                onChange={(e) => handleSpecChange(index, "key", e.target.value)}
                placeholder="VD: Wifi"
                style={{ ...inputStyle, flex: 1 }}
              />
              <input
                type="text"
                value={spec.value}
                onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                placeholder="VD: 802.11 b/g/n"
                style={{ ...inputStyle, flex: 1 }}
              />
              <button
                type="button"
                onClick={() => removeSpecification(index)}
                style={removeBtn}
                disabled={specifications.length === 1}
              >
                ×
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addSpecification}
            style={addBtn}
          >
            + Thêm thông số
          </button>
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitle}>Tags & Phân loại</h3>

          <div style={formGroup}>
            <label style={labelStyle}>Tags (phân cách bằng dấu phẩy)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="VD: wifi, camera, indoor"
              style={inputStyle}
            />
          </div>

          <div style={checkboxGroup}>
            <label style={checkboxLabel}>
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
              />
              <span>⭐ Sản phẩm nổi bật</span>
            </label>

            <label style={checkboxLabel}>
              <input
                type="checkbox"
                name="bestSeller"
                checked={formData.bestSeller}
                onChange={handleChange}
              />
              <span>🔥 Sản phẩm bán chạy</span>
            </label>

            <label style={checkboxLabel}>
              <input
                type="checkbox"
                name="newProduct"
                checked={formData.newProduct}
                onChange={handleChange}
              />
              <span>✨ Sản phẩm mới</span>
            </label>
          </div>

          <div style={formGroup}>
            <label style={labelStyle}>Trạng thái</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              style={selectStyle}
            >
              <option value="active">Hoạt động</option>
              <option value="inactive">Không hoạt động</option>
              <option value="draft">Bản nháp</option>
            </select>
          </div>
        </div>

        <div style={formActions}>
          <button type="submit" disabled={loading} style={submitBtn}>
            {loading ? "Đang thêm..." : "Thêm sản phẩm"}
          </button>
          <button type="button" onClick={resetForm} style={resetBtn}>
            Reset
          </button>
          <button type="button" onClick={() => navigate("/admin/products")} style={cancelBtn}>
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

const sectionStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  marginBottom: "20px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
};

const sectionTitle = {
  marginTop: 0,
  marginBottom: "16px",
  paddingBottom: "10px",
  borderBottom: "1px solid #eee",
  fontSize: "16px",
};

const formGroup = {
  marginBottom: "16px",
};

const labelStyle = {
  display: "block",
  marginBottom: "6px",
  fontWeight: "500",
  fontSize: "14px",
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #ddd",
  borderRadius: "6px",
  fontSize: "14px",
  boxSizing: "border-box",
};

const selectStyle = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #ddd",
  borderRadius: "6px",
  fontSize: "14px",
  backgroundColor: "#fff",
  cursor: "pointer",
};

const textareaStyle = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #ddd",
  borderRadius: "6px",
  fontSize: "14px",
  resize: "vertical",
  fontFamily: "inherit",
};

const fileInputStyle = {
  width: "100%",
  padding: "8px",
  border: "1px dashed #ddd",
  borderRadius: "6px",
  fontSize: "14px",
};

const previewImage = {
  marginTop: "10px",
  width: "150px",
  height: "150px",
  objectFit: "cover",
  borderRadius: "8px",
  border: "1px solid #ddd",
};

const previewGallery = {
  display: "flex",
  gap: "8px",
  marginTop: "10px",
  flexWrap: "wrap",
};

const previewThumb = {
  width: "60px",
  height: "60px",
  objectFit: "cover",
  borderRadius: "6px",
  border: "1px solid #ddd",
};

const grid2Cols = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "16px",
};

const grid3Cols = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "16px",
};

const specRow = {
  display: "flex",
  gap: "12px",
  marginBottom: "12px",
  alignItems: "center",
};

const addBtn = {
  padding: "8px 16px",
  backgroundColor: "#3498db",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
};

const removeBtn = {
  width: "36px",
  height: "36px",
  backgroundColor: "#e74c3c",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "18px",
  fontWeight: "bold",
};

const checkboxGroup = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  marginBottom: "16px",
};

const checkboxLabel = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
  fontSize: "14px",
};

const formActions = {
  display: "flex",
  gap: "12px",
  marginTop: "20px",
};

const submitBtn = {
  padding: "12px 32px",
  backgroundColor: "#27ae60",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "bold",
};

const resetBtn = {
  padding: "12px 24px",
  backgroundColor: "#95a5a6",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
};

const cancelBtn = {
  padding: "12px 24px",
  backgroundColor: "#fff",
  color: "#333",
  border: "1px solid #ddd",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
};

export default AddProductPage;
