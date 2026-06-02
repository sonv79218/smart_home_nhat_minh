// ============================================
// EDIT PRODUCT PAGE - With Variant Support
// ============================================
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductByIdForAdmin, updateProduct } from "../../services/productService";
import { uploadImageToCloudinary } from "../../services/cloudinaryService";
import { getCategories } from "../../services/categoryService";
import { getBrands } from "../../services/brandService";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
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
    rating: "",
    sold: "",
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

  // Variant states
  const [hasVariants, setHasVariants] = useState(false);
  const [options, setOptions] = useState([{ name: "", values: [""] }]);
  const [variants, setVariants] = useState([
    { id: "", sku: "", optionValues: [], price: "", discountPrice: "", stock: "", thumbnail: "" }
  ]);
  const [variantThumbnailFiles, setVariantThumbnailFiles] = useState({});
  const [variantThumbnailPreviews, setVariantThumbnailPreviews] = useState({});

  // Generate variant ID
  function generateVariantId() {
    return "var-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
  }

  // Fetch categories and brands
  useEffect(() => {
    const fetchMeta = async () => {
      const [cats, brds] = await Promise.all([getCategories(), getBrands()]);
      setCategories(cats);
      setBrands(brds);
    };
    fetchMeta();
  }, []);

  // Load product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const product = await getProductByIdForAdmin(id);

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
          rating: product.rating?.toString() || "",
          sold: product.sold?.toString() || "",
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

        // Load variants if product has them
        if (product.options?.length > 0 && product.variants?.length > 0) {
          setHasVariants(true);
          setOptions(product.options);
          
          const loadedVariants = product.variants.map(v => ({
            id: v.id || generateVariantId(),
            sku: v.sku || "",
            optionValues: v.optionValues || [],
            price: v.price?.toString() || "",
            discountPrice: v.discountPrice?.toString() || "",
            stock: v.stock?.toString() || "0",
            thumbnail: v.thumbnail || ""
          }));
          setVariants(loadedVariants);
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
    
    if (currentTotal >= maxImages) return;
    
    const remainingSlots = maxImages - currentTotal;
    const filesToAdd = files.slice(0, remainingSlots);
    
    if (filesToAdd.length > 0) {
      const newFiles = [...imageFiles, ...filesToAdd];
      setImageFiles(newFiles);
      const previews = filesToAdd.map((file) => URL.createObjectURL(file));
      setImagePreviews([...imagePreviews, ...previews]);
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
    if (specifications.length <= 1) return;
    const newSpecs = specifications.filter((_, i) => i !== index);
    setSpecifications(newSpecs);
  };

  const removeImage = (index) => {
    const newImages = imagePreviews.filter((_, i) => i !== index);
    const newFiles = imageFiles.filter((_, i) => i !== index);
    setImagePreviews(newImages);
    setImageFiles(newFiles);
  };

  // ========== VARIANT HANDLERS ==========

  const handleToggleVariants = (checked) => {
    setHasVariants(checked);
    if (checked && variants.length === 0) {
      setVariants([{
        id: generateVariantId(),
        sku: "",
        optionValues: options.map(() => ""),
        price: formData.price,
        discountPrice: formData.discountPrice,
        stock: formData.stock,
        thumbnail: ""
      }]);
    }
  };

  const addOption = () => {
    setOptions([...options, { name: "", values: [""] }]);
    setVariants(variants.map(v => ({
      ...v,
      optionValues: [...v.optionValues, ""]
    })));
  };

  const removeOption = (index) => {
    if (options.length <= 1) return;
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    setVariants(variants.map(v => ({
      ...v,
      optionValues: v.optionValues.filter((_, i) => i !== index)
    })));
  };

  const handleOptionNameChange = (index, name) => {
    const newOptions = [...options];
    newOptions[index].name = name;
    setOptions(newOptions);
  };

  const handleOptionValuesChange = (index, valuesStr) => {
    const newOptions = [...options];
    const values = valuesStr.split(",").map(v => v.trim()).filter(v => v);
    newOptions[index].values = values;
    setOptions(newOptions);
  };

  const addVariant = () => {
    const newVariant = {
      id: generateVariantId(),
      sku: "",
      optionValues: options.map(() => ""),
      price: formData.price,
      discountPrice: formData.discountPrice,
      stock: formData.stock,
      thumbnail: ""
    };
    setVariants([...variants, newVariant]);
  };

  const removeVariant = (index) => {
    if (variants.length <= 1) return;
    const newVariants = variants.filter((_, i) => i !== index);
    setVariants(newVariants);
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const handleVariantOptionChange = (variantIndex, optionIndex, value) => {
    const newVariants = [...variants];
    newVariants[variantIndex].optionValues[optionIndex] = value;
    setVariants(newVariants);
  };

  const handleVariantThumbnailChange = (variantIndex, e) => {
    const file = e.target.files[0];
    if (file) {
      const newFiles = { ...variantThumbnailFiles };
      const newPreviews = { ...variantThumbnailPreviews };
      newFiles[variantIndex] = file;
      newPreviews[variantIndex] = URL.createObjectURL(file);
      setVariantThumbnailFiles(newFiles);
      setVariantThumbnailPreviews(newPreviews);
    }
  };

  const generateVariants = () => {
    if (options.length === 0) return;
    
    const validOptions = options.filter(opt => opt.name.trim() && opt.values.length > 0);
    if (validOptions.length === 0) return;

    const combinations = validOptions.reduce((acc, opt) => {
      if (acc.length === 0) {
        return opt.values.map(v => [v]);
      }
      const newAcc = [];
      acc.forEach(combo => {
        opt.values.forEach(val => {
          newAcc.push([...combo, val]);
        });
      });
      return newAcc;
    }, []);

    const newVariants = combinations.map((combo, idx) => {
      const optionValues = options.map(opt => {
        const validOpt = validOptions.find(vo => vo.name === opt.name);
        if (validOpt) {
          const valIdx = validOptions.findIndex(vo => vo.name === opt.name);
          return combo[valIdx] || "";
        }
        return "";
      });

      const id = combo.join("-").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      const existingVariant = variants.find(v => v.id === id);
      
      return {
        id,
        sku: existingVariant?.sku || `${formData.sku || "SKU"}-${id}`.toUpperCase(),
        optionValues,
        price: existingVariant?.price || formData.price || "",
        discountPrice: existingVariant?.discountPrice || formData.discountPrice || "",
        stock: existingVariant?.stock || formData.stock || "0",
        thumbnail: existingVariant?.thumbnail || ""
      };
    });

    setVariants(newVariants);
  };

  const syncPriceToVariants = () => {
    setVariants(variants.map(v => ({
      ...v,
      price: formData.price,
      discountPrice: formData.discountPrice,
      stock: formData.stock
    })));
  };

  // ========== SUBMIT ==========

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
        const newImages = await Promise.all(
          imageFiles.map((file) => uploadImageToCloudinary(file))
        );
        uploadedImages = [...existingImages, ...newImages];
      }

      const uploadedVariantThumbnails = {};
      for (const [variantIndex, file] of Object.entries(variantThumbnailFiles)) {
        if (file) {
          const url = await uploadImageToCloudinary(file);
          uploadedVariantThumbnails[variantIndex] = url;
        }
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
        price: Number(formData.price),
        discountPrice: formData.discountPrice ? Number(formData.discountPrice) : 0,
        costPrice: formData.costPrice ? Number(formData.costPrice) : 0,
        stock: Number(formData.stock) || 0,
        minStockAlert: Number(formData.minStockAlert) || 5,
        rating: Number(formData.rating) || 0,
        sold: Number(formData.sold) || 0,
        specifications: specsArray,
        tags: tagsArray,
        thumbnail: thumbnailUrl,
        images: uploadedImages,
      };

      // Add variants if enabled
      if (hasVariants) {
        const validOptions = options.filter(opt => opt.name.trim() && opt.values.length > 0);
        if (validOptions.length > 0) {
          productData.options = validOptions.map(opt => ({
            name: opt.name.trim(),
            values: opt.values
          }));
          
          productData.variants = variants.map((v, idx) => ({
            id: v.id,
            sku: v.sku || `${formData.sku || "SKU"}-${v.id}`.toUpperCase(),
            optionValues: v.optionValues,
            price: Number(v.price) || 0,
            discountPrice: v.discountPrice ? Number(v.discountPrice) : 0,
            stock: Number(v.stock) || 0,
            thumbnail: uploadedVariantThumbnails[idx] || v.thumbnail || ""
          }));
        }
      }

      await updateProduct(id, productData);

      alert("Cập nhật sản phẩm thành công!");
      navigate("/admin/products");
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Có lỗi xảy ra khi cập nhật sản phẩm");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">{error}</h2>
        <button
          onClick={() => navigate("/admin/products")}
          className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700"
        >
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Sửa sản phẩm</h1>
        <p className="text-slate-500 mt-1">Cập nhật thông tin sản phẩm</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info Section */}
        <Section title="Thông tin cơ bản" icon={<InfoIcon className="w-5 h-5" />}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Tên sản phẩm <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

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
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </Section>

        {/* Price & Stock Section */}
        <Section title="Giá & Tồn kho" icon={<PriceIcon className="w-5 h-5" />}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Giá bán</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" min="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Giá gốc</label>
              <input type="number" name="discountPrice" value={formData.discountPrice} onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" min="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Giá vốn</label>
              <input type="number" name="costPrice" value={formData.costPrice} onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" min="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Tồn kho</label>
              <input type="number" name="stock" value={formData.stock} onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" min="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Báo low stock</label>
              <input type="number" name="minStockAlert" value={formData.minStockAlert} onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" min="0" />
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={hasVariants} onChange={(e) => handleToggleVariants(e.target.checked)}
                className="w-5 h-5 rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
              <span className="text-sm font-medium text-slate-700">Sản phẩm có biến thể</span>
            </label>
          </div>
        </Section>

        {/* Variants Section */}
        {hasVariants && (
          <Section title="Cấu hình biến thể" icon={<VariantIcon className="w-5 h-5" />}>
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-slate-700 mb-3">Tùy chọn biến thể</h4>
              
              {options.map((option, optIdx) => (
                <div key={optIdx} className="flex items-start gap-2 mb-3">
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    <input type="text" value={option.name}
                      onChange={(e) => handleOptionNameChange(optIdx, e.target.value)}
                      className="px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="VD: Phiên bản" />
                    <input type="text" value={option.values.join(", ")}
                      onChange={(e) => handleOptionValuesChange(optIdx, e.target.value)}
                      className="px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="VD: Q1, H2, H3" />
                  </div>
                  <button type="button" onClick={() => removeOption(optIdx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    disabled={options.length <= 1}>
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}
              
              <button type="button" onClick={addOption} className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
                <PlusIcon className="w-4 h-4" /> Thêm tùy chọn
              </button>
              <button type="button" onClick={generateVariants} className="ml-4 text-sm text-sky-600 hover:text-sky-700 font-medium">
                Tạo biến thể từ options
              </button>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-slate-700">Danh sách biến thể ({variants.length})</h4>
                <div className="flex gap-2">
                  <button type="button" onClick={syncPriceToVariants} className="text-xs text-slate-500 hover:text-slate-700">
                    Sync giá từ trên
                  </button>
                  <button type="button" onClick={addVariant} className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
                    <PlusIcon className="w-4 h-4" /> Thêm biến thể
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {variants.map((variant, varIdx) => (
                  <div key={variant.id || varIdx} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex flex-wrap gap-2">
                        {options.map((opt, optIdx) => (
                          <div key={optIdx} className="flex items-center gap-1">
                            <span className="text-xs text-slate-500">{opt.name}:</span>
                            <select value={variant.optionValues[optIdx] || ""}
                              onChange={(e) => handleVariantOptionChange(varIdx, optIdx, e.target.value)}
                              className="px-2 py-1 border border-slate-200 rounded text-sm bg-white">
                              <option value="">Chọn</option>
                              {opt.values.map((val) => (
                                <option key={val} value={val}>{val}</option>
                              ))}
                            </select>
                          </div>
                        ))}
                      </div>
                      <button type="button" onClick={() => removeVariant(varIdx)} className="p-1 text-red-500 hover:bg-red-100 rounded"
                        disabled={variants.length <= 1}>
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      <div className="md:col-span-2">
                        <label className="block text-xs text-slate-500 mb-1">SKU</label>
                        <input type="text" value={variant.sku}
                          onChange={(e) => handleVariantChange(varIdx, "sku", e.target.value)}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-mono" />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Giá</label>
                        <input type="number" value={variant.price}
                          onChange={(e) => handleVariantChange(varIdx, "price", e.target.value)}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Giảm giá</label>
                        <input type="number" value={variant.discountPrice}
                          onChange={(e) => handleVariantChange(varIdx, "discountPrice", e.target.value)}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Tồn kho</label>
                        <input type="number" value={variant.stock}
                          onChange={(e) => handleVariantChange(varIdx, "stock", e.target.value)}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        )}

        {/* Image Section */}
        <Section title="Hình ảnh" icon={<ImageIcon className="w-5 h-5" />}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Ảnh đại diện</label>
              <input type="file" accept="image/*" onChange={handleThumbnailChange}
                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-600 hover:file:bg-primary-100" />
              {thumbnailPreview && (
                <div className="mt-2 relative inline-block">
                  <img src={thumbnailPreview} alt="Preview" className="w-24 h-24 object-cover rounded-lg" />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Ảnh gallery ({imagePreviews.length}/5)</label>
              <input type="file" accept="image/*" multiple onChange={handleImagesChange}
                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-600 hover:file:bg-primary-100" />
              {imagePreviews.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {imagePreviews.map((preview, idx) => (
                    <div key={idx} className="relative">
                      <img src={preview} alt={`Preview ${idx + 1}`} className="w-20 h-20 object-cover rounded-lg" />
                      <button type="button" onClick={() => removeImage(idx)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs">×</button>
                    </div>
                  ))}
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
              <textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange} rows="2"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Mô tả chi tiết</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="6"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm resize-none" />
            </div>
          </div>
        </Section>

        {/* Specifications Section */}
        <Section title="Thông số kỹ thuật" icon={<SpecIcon className="w-5 h-5" />}>
          <div className="space-y-3">
            {specifications.map((spec, index) => (
              <div key={index} className="flex items-center gap-2">
                <input type="text" value={spec.key} onChange={(e) => handleSpecChange(index, "key", e.target.value)}
                  className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="VD: Kích thước" />
                <input type="text" value={spec.value} onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                  className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="VD: 86x86mm" />
                <button type="button" onClick={() => removeSpecification(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  disabled={specifications.length <= 1}>
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button type="button" onClick={addSpecification} className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
              <PlusIcon className="w-4 h-4" /> Thêm thông số
            </button>
          </div>
        </Section>

        {/* Tags Section */}
        <Section title="Tags" icon={<TagIcon className="w-5 h-5" />}>
          <input type="text" name="tags" value={formData.tags} onChange={handleChange}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"
            placeholder="VD: smart-home, aqara, zigbee (cách nhau bằng dấu phẩy)" />
        </Section>

        {/* Flags Section */}
        <Section title="Đánh dấu" icon={<FlagIcon className="w-5 h-5" />}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange}
                className="w-4 h-4 rounded border-slate-300 text-primary-600" />
              <span className="text-sm text-slate-700">Nổi bật</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="bestSeller" checked={formData.bestSeller} onChange={handleChange}
                className="w-4 h-4 rounded border-slate-300 text-primary-600" />
              <span className="text-sm text-slate-700">Bán chạy</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="newProduct" checked={formData.newProduct} onChange={handleChange}
                className="w-4 h-4 rounded border-slate-300 text-primary-600" />
              <span className="text-sm text-slate-700">Sản phẩm mới</span>
            </label>
          </div>
        </Section>

        {/* Status Section */}
        <Section title="Trạng thái" icon={<StatusIcon className="w-5 h-5" />}>
          <select name="status" value={formData.status} onChange={handleChange}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white max-w-xs">
            <option value="active">Hoạt động</option>
            <option value="inactive">Không hoạt động</option>
            <option value="draft">Bản nháp</option>
          </select>
        </Section>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button type="submit" disabled={submitting}
            className="flex-1 sm:flex-none px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 disabled:opacity-50 flex items-center justify-center gap-2">
            {submitting ? (
              <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Đang lưu...</>
            ) : (
              <>Lưu thay đổi</>
            )}
          </button>
          <button type="button" onClick={() => navigate("/admin/products")}
            className="flex-1 sm:flex-none px-6 py-3 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50">
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
      <h2 className="font-semibold text-slate-800 flex items-center gap-2">{icon}{title}</h2>
    </div>
    <div className="p-5">{children}</div>
  </div>
);

// ========== ICONS ==========
const InfoIcon = ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const PriceIcon = ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const VariantIcon = ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>;
const ImageIcon = ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const DescIcon = ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const SpecIcon = ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>;
const TagIcon = ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>;
const FlagIcon = ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
const StatusIcon = ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const PlusIcon = ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>;
const TrashIcon = ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;

export default EditProductPage;
