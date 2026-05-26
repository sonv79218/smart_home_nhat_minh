import { useState } from "react";

import { addProduct } from "../../services/productService";

import { uploadImageToCloudinary } from "../../services/cloudinaryService";

const AddProductPage = () => {
  const [formData, setFormData] =
    useState({
      name: "",
      brand: "",
      category: "",
      price: "",
      discountPrice: "",
      stock: "",
      shortDescription: "",
      description: "",

      specifications: {
        wifi: "",
        appSupport: "",
        voiceAssistant: "",
      },

      featured: false,

      status: "active",
    });
const [thumbnailFile, setThumbnailFile] = useState(null);
const [imageFiles, setImageFiles] = useState([]);

  const [loading, setLoading] =  useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setFormData((prev) => ({
      ...prev,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSpecChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,

      specifications: {
        ...prev.specifications,

        [name]: value,
      },
    }));
  };

  const createSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/\s+/g, "-");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
    let thumbnailUrl = "";
        // upload thumbnail
    if (thumbnailFile) {
      thumbnailUrl = await uploadImageToCloudinary(thumbnailFile);
    }
    
let uploadedImages = [];

if (imageFiles.length > 0) {
  uploadedImages =
    await Promise.all(
      imageFiles.map((file) =>
        uploadImageToCloudinary(
          file
        )
      )
    );
}

      const productData = {
        ...formData,

        slug: createSlug(
          formData.name
        ),

        price: Number(
          formData.price
        ),

        discountPrice: Number(
          formData.discountPrice
        ),

        stock: Number(
          formData.stock
        ),

  thumbnail: thumbnailUrl,
images: uploadedImages,

        sold: 0,

        rating: 0,

        createdAt: new Date(),

        updatedAt: new Date(),
      };

      await addProduct(productData);

      alert(
        "Thêm sản phẩm thành công"
      );

      setFormData({
        name: "",
        brand: "",
        category: "",
        price: "",
        discountPrice: "",
        stock: "",
        shortDescription: "",
        description: "",

        specifications: {
          wifi: "",
          appSupport: "",
          voiceAssistant: "",
        },

        featured: false,

        status: "active",
      });

      setImageFiles([]);
    } catch (error) {
      console.log(error);

      alert("Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Thêm sản phẩm</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          maxWidth: "600px",
          marginTop: "20px",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Tên sản phẩm"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="brand"
          placeholder="Thương hiệu"
          value={formData.brand}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">
            Chọn danh mục
          </option>

          <option value="camera">
            Camera
          </option>

          <option value="smart-plug">
            Ổ cắm thông minh
          </option>

          <option value="smart-switch">
            Công tắc thông minh
          </option>

          <option value="sensor">
            Cảm biến
          </option>
        </select>

        <input
          type="number"
          name="price"
          placeholder="Giá"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="discountPrice"
          placeholder="Giá giảm"
          value={
            formData.discountPrice
          }
          onChange={handleChange}
        />

        <input
          type="number"
          name="stock"
          placeholder="Tồn kho"
          value={formData.stock}
          onChange={handleChange}
          required
        />

        <textarea
          name="shortDescription"
          placeholder="Mô tả ngắn"
          rows="2"
          value={
            formData.shortDescription
          }
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Mô tả chi tiết"
          rows="5"
          value={formData.description}
          onChange={handleChange}
        />

        <h3>Thông số kỹ thuật</h3>

        <input
          type="text"
          name="wifi"
          placeholder="Wifi"
          value={
            formData.specifications
              .wifi
          }
          onChange={handleSpecChange}
        />

        <input
          type="text"
          name="appSupport"
          placeholder="App hỗ trợ"
          value={
            formData.specifications
              .appSupport
          }
          onChange={handleSpecChange}
        />

        <input
          type="text"
          name="voiceAssistant"
          placeholder="Voice Assistant"
          value={
            formData.specifications
              .voiceAssistant
          }
          onChange={handleSpecChange}
        />

        <label>
          <input
            type="checkbox"
            name="featured"
            checked={
              formData.featured
            }
            onChange={handleChange}
          />

          Sản phẩm nổi bật
        </label>
<input
  type="file"
  accept="image/*"
  onChange={(e) =>
    setThumbnailFile(e.target.files[0])
  }
  required
/>
<input
  type="file"
  multiple
  onChange={(e) =>
    setImageFiles(
      Array.from(e.target.files)
    )
  }
  required
/>

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Đang thêm..."
            : "Thêm sản phẩm"}
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;