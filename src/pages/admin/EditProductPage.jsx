// ============================================
// EDIT PRODUCT PAGE - Fully Responsive
// ============================================
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../../services/productService";
import { uploadImageToCloudinary } from "../../services/cloudinaryService";
import { CATEGORIES, BRANDS } from "../../constants/productMeta";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

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

  const [specifications, setSpecifications] = useState([{ key: "", value: "" }]);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [existingThumbnail, setExistingThumbnail] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const product = await getProductById(id);

        if (!product) {
          setError("Không tìm thấy sản phẩm");
          return;
        }

        setFormData({
          name: product.name || "",
          sku: product.sku || "",
          brand: product.brand || "",
          category: product.category || "",
          price: product.price?.toString() || "",
          discountPrice: product.discountPrice?.toString() || "",
          costPrice: product.costPrice?.toString() || "",
          stock: product.stock?.toString() || "",
          minStockAlert: product.minStockAlert?.toString() || "5",
          shortDescription: product.shortDescription || "",
          description: product.description || "",
          tags: Array.isArray(product.tags) ? product.tags.join(", ") : "",
          featured: Boolean(product.featured),
          bestSeller: Boolean(product.bestSeller),
          newProduct: Boolean(product.newProduct),
          status: product.status || "active",
        });

        setSpecifications(
          Array.isArray(product.specifications) && product.specifications.length > 0
            ? product.specifications
            : [{ key: "", value: "" }]
        );

        if (product.thumbnail) {
          setExistingThumbnail(product.thumbnail);
          setThumbnailPreview(product.thumbnail);
        }

        if (Array.isArray(product.images) && product.images.length > 0) {
          setExistingImages(product.images);
          setImagePreviews(product.images);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Có lỗi khi tải thông tin sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

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
      setExistingThumbnail("");
    }
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const currentTotal = existingImages.length + imageFiles.length;
    const maxImages = 5;
    
    if (currentTotal >= maxImages) {
      return;
    }

    const remainingSlots = maxImages - currentTotal;
    const filesToAdd = files.slice(0, remainingSlots);
    
    if (filesToAdd.length > 0) {
      const newFiles = [...imageFiles, ...filesToAdd];
      setImageFiles(newFiles);
      const newPreviews = filesToAdd.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleRemoveNewImage = (index) => {
    const actualIndex = existingImages.length + index;
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== actualIndex));
  };

  const handleRemoveExistingImage = (index) => {
    const newExistingImages = existingImages.filter((_, i) => i !== index);
    setExistingImages(newExistingImages);
    setImagePreviews(newExistingImages);
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
    if (specifications.length === 1) {
      setSpecifications([{ key: "", value: "" }]);
    } else {
      const newSpecs = specifications.filter((_, i) => i !== index);
      setSpecifications(newSpecs);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.category || !formData.brand) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    try {
      setSubmitting(true);

      let thumbnailUrl = existingThumbnail;
      if (thumbnailFile) {
        thumbnailUrl = await uploadImageToCloudinary(thumbnailFile);
      }

      let uploadedImages = [...existingImages];
      if (imageFiles.length > 0) {
        const newUploads = await Promise.all(
          imageFiles.map((file) => uploadImageToCloudinary(file))
        );
        uploadedImages = [...existingImages, ...newUploads];
      }

      const specsArray = specifications
        .filter((spec) => spec.key?.trim() && spec.value?.trim())
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
        price: Number(formData.price),
        discountPrice: formData.discountPrice ? Number(formData.discountPrice) : 0,
        costPrice: formData.costPrice ? Number(formData.costPrice) : 0,
        stock: Number(formData.stock) || 0,
        minStockAlert: Number(formData.minStockAlert) || 5,
        specifications: specsArray,
        tags: tagsArray,
        thumbnail: thumbnailUrl,
        images: uploadedImages,
      };

      await updateProduct(id, productData);

      alert("Cập nhật sản phẩm thành công!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Có lỗi xảy ra khi cập nhật sản phẩm");
    } finally {
      setSubmitting(false);
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
    setThumbnailPreview(existingThumbnail || "");
    setImageFiles([]);
    setImagePreviews(existingImages);
    setExistingImages(existingImages);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          <p className="text-slate-500">Đang tải thông tin sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <ErrorIcon className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-lg font-medium text-slate-800">{error}</p>
          <button
            onClick={() => navigate("/admin/products")}
            className="px-6 py-2.5 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors"
          >
            Quay lại danh sách sản phẩm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => navigate("/admin/products")}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <BackIcon className="w-5 h-5 text-slate-600" />
          </button>
          <h1 className="text-2xl font-bold text-slate-800">Chỉnh sửa sản phẩm</h1>
        </div>
        <p className="text-slate-500 mt-1 ml-10">Cập nhật thông tin sản phẩm bên dưới</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info Section */}
        <Section title="Thông tin cơ bản" icon={<InfoIcon className="w-5 h-5" />}>
          <div className="space-y-4">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Tên sản phẩm <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="VD: Camera IP Xiaomi 360"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm"
                required
              />
            </div>

            {/* SKU & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">SKU</label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  placeholder="Mã sản phẩm"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm bg-slate-50"
                  disabled
                />
                <p className="text-xs text-slate-400 mt-1">SKU không thể thay đổi</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Danh mục <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm bg-white"
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

            {/* Brand */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Thương hiệu <span className="text-red-500">*</span>
              </label>
              <select
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm bg-white"
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
        </Section>

        {/* Price & Stock Section */}
        <Section title="Giá & Tồn kho" icon={<PriceIcon className="w-5 h-5" />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Giá bán <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  className="w-full px-4 py-2.5 pr-12 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm"
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">đ</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Giá gốc</label>
              <div className="relative">
                <input
                  type="number"
                  name="costPrice"
                  value={formData.costPrice}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  className="w-full px-4 py-2.5 pr-12 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">đ</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Giá giảm</label>
              <div className="relative">
                <input
                  type="number"
                  name="discountPrice"
                  value={formData.discountPrice}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  className="w-full px-4 py-2.5 pr-12 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">đ</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Số lượng tồn kho</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="0"
                min="0"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Cảnh báo tồn kho tối thiểu</label>
              <input
                type="number"
                name="minStockAlert"
                value={formData.minStockAlert}
                onChange={handleChange}
                placeholder="5"
                min="0"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm"
              />
            </div>
          </div>
        </Section>

        {/* Images Section */}
        <Section title="Hình ảnh" icon={<ImageIcon className="w-5 h-5" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Thumbnail */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Ảnh đại diện
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="hidden"
                id="thumbnail-upload"
              />
              <label
                htmlFor="thumbnail-upload"
                className="flex flex-col items-center justify-center w-full h-40 border-2 border-slate-200 border-dashed rounded-xl cursor-pointer hover:border-primary-400 hover:bg-slate-50 transition-colors relative"
              >
                {thumbnailPreview ? (
                  <>
                    <img src={thumbnailPreview} alt="Thumbnail" className="w-full h-full object-contain p-2" />
                    <span className="absolute bottom-2 left-2 px-2 py-1 bg-primary-600 text-white text-xs rounded-lg">
                      {thumbnailFile ? "Mới" : "Hiện tại"}
                    </span>
                  </>
                ) : (
                  <>
                    <UploadIcon className="w-8 h-8 text-slate-400 mb-2" />
                    <span className="text-sm text-slate-500">Click để chọn ảnh</span>
                  </>
                )}
              </label>
              {thumbnailPreview && thumbnailFile && (
                <button
                  type="button"
                  onClick={() => {
                    setThumbnailFile(null);
                    setThumbnailPreview(existingThumbnail);
                  }}
                  className="mt-2 text-sm text-slate-500 hover:text-slate-700"
                >
                  Khôi phục ảnh cũ
                </button>
              )}
            </div>

            {/* Gallery */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Ảnh phụ (Gallery) - {existingImages.length + imageFiles.length}/5 ảnh
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImagesChange}
                className="hidden"
                id="gallery-upload"
                disabled={existingImages.length + imageFiles.length >= 5}
              />
              <label
                htmlFor="gallery-upload"
                className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
                  existingImages.length + imageFiles.length >= 5
                    ? "border-slate-200 bg-slate-50 cursor-not-allowed"
                    : "border-slate-200 hover:border-primary-400 hover:bg-slate-50"
                }`}
              >
                <UploadIcon className="w-8 h-8 text-slate-400 mb-2" />
                <span className="text-sm text-slate-500">
                  {existingImages.length + imageFiles.length >= 5
                    ? "Đã đạt giới hạn ảnh"
                    : "Thêm ảnh mới"}
                </span>
              </label>
              {(existingImages.length > 0 || imageFiles.length > 0) && (
                <div className="flex gap-2 flex-wrap mt-3">
                  {existingImages.map((img, index) => (
                    <div key={`existing-${index}`} className="relative group">
                      <img
                        src={img}
                        alt={`Gallery ${index + 1}`}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveExistingImage(index)}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <CloseIcon className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {imageFiles.map((_, index) => {
                    const previewIndex = existingImages.length + index;
                    const preview = imagePreviews[previewIndex];
                    if (!preview) return null;
                    return (
                      <div key={`new-${index}`} className="relative group">
                        <img
                          src={preview}
                          alt={`New ${index + 1}`}
                          className="w-16 h-16 object-cover rounded-lg border-2 border-primary-300"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveNewImage(index)}
                          className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <CloseIcon className="w-3 h-3" />
                        </button>
                        <span className="absolute bottom-0 left-0 right-0 bg-primary-600 text-white text-xs text-center rounded-b-lg py-0.5">
                          Mới
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </Section>

        {/* Description Section */}
        <Section title="Mô tả" icon={<DescIcon className="w-5 h-5" />}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Mô tả ngắn</label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                placeholder="Mô tả ngắn gọn về sản phẩm..."
                rows="2"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Mô tả chi tiết</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Mô tả chi tiết sản phẩm..."
                rows="5"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm resize-none"
              />
            </div>
          </div>
        </Section>

        {/* Specifications Section */}
        <Section title="Thông số kỹ thuật" icon={<SpecIcon className="w-5 h-5" />}>
          <div className="space-y-3">
            {specifications.map((spec, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="text"
                  value={spec.key}
                  onChange={(e) => handleSpecChange(index, "key", e.target.value)}
                  placeholder="VD: Wifi"
                  className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm"
                />
                <input
                  type="text"
                  value={spec.value}
                  onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                  placeholder="VD: 802.11 b/g/n"
                  className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => removeSpecification(index)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                >
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSpecification}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
            >
              <PlusIcon className="w-4 h-4" />
              Thêm thông số
            </button>
          </div>
        </Section>

        {/* Tags & Classification Section */}
        <Section title="Tags & Phân loại" icon={<TagIcon className="w-5 h-5" />}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Tags (phân cách bằng dấu phẩy)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="VD: wifi, camera, indoor"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm"
              />
            </div>

            {/* Checkboxes */}
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-slate-700">Sản phẩm nổi bật</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="bestSeller"
                  checked={formData.bestSeller}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-slate-700">Sản phẩm bán chạy</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="newProduct"
                  checked={formData.newProduct}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-slate-700">Sản phẩm mới</span>
              </label>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Trạng thái</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm bg-white max-w-xs"
              >
                <option value="active">Hoạt động</option>
                <option value="inactive">Không hoạt động</option>
                <option value="draft">Bản nháp</option>
              </select>
            </div>
          </div>
        </Section>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 sm:flex-none px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/25 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Đang cập nhật...
              </>
            ) : (
              <>
                <SaveIcon className="w-5 h-5" />
                Lưu thay đổi
              </>
            )}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="flex-1 sm:flex-none px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
          >
            Khôi phục
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="flex-1 sm:flex-none px-6 py-3 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

// ========== COMPONENTS ==========
const Section = ({ title, icon, children }) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
    <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
      <h2 className="font-semibold text-slate-800 flex items-center gap-2">
        {icon}
        {title}
      </h2>
    </div>
    <div className="p-5">
      {children}
    </div>
  </div>
);

// ========== ICONS ==========
const InfoIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const PriceIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ImageIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const DescIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const SpecIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

const TagIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
  </svg>
);

const UploadIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const PlusIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const CloseIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const SaveIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);

const BackIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const ErrorIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

export default EditProductPage;
