import { useEffect, useState } from "react";
import { getBanners, addBanner, updateBanner, deleteBanner } from "../../services/bannerService";
import { uploadImageToCloudinary } from "../../services/cloudinaryService";

const AdminBannersPage = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    image: "",
    link: "",
    isActive: true,
  });

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const data = await getBanners();
      const sorted = data.sort((a, b) => {
        const dateA = a.createdAt?.seconds || 0;
        const dateB = b.createdAt?.seconds || 0;
        return dateB - dateA;
      });
      setBanners(sorted);
    } catch (error) {
      console.error("Error fetching banners:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await uploadImageToCloudinary(file);
      setFormData((prev) => ({ ...prev, image: url }));
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Upload ảnh thất bại");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.subtitle || !formData.image) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    try {
      if (editingBanner) {
        await updateBanner(editingBanner.id, formData);
        setBanners((prev) =>
          prev.map((b) => (b.id === editingBanner.id ? { ...b, ...formData } : b))
        );
        alert("Cập nhật banner thành công!");
      } else {
        const docRef = await addBanner(formData);
        setBanners((prev) => [{ id: docRef.id, ...formData, createdAt: new Date() }, ...prev]);
        alert("Thêm banner thành công!");
      }

      resetForm();
    } catch (error) {
      console.error("Error saving banner:", error);
      alert("Lưu banner thất bại");
    }
  };

  const handleEdit = (banner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle,
      image: banner.image || "",
      link: banner.link || "",
      isActive: banner.isActive !== false,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa banner này?")) return;

    try {
      await deleteBanner(id);
      setBanners((prev) => prev.filter((b) => b.id !== id));
      alert("Xóa banner thành công!");
    } catch (error) {
      console.error("Error deleting banner:", error);
      alert("Xóa banner thất bại");
    }
  };

  const handleToggleActive = async (banner) => {
    try {
      const newStatus = !banner.isActive;
      await updateBanner(banner.id, { isActive: newStatus });
      setBanners((prev) =>
        prev.map((b) => (b.id === banner.id ? { ...b, isActive: newStatus } : b))
      );
    } catch (error) {
      console.error("Error toggling banner status:", error);
      alert("Cập nhật trạng thái thất bại");
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingBanner(null);
    setFormData({
      title: "",
      subtitle: "",
      image: "",
      link: "",
      isActive: true,
    });
  };

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Đang tải dữ liệu...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <div>
          <h1>Quản lý Banner</h1>
          <p style={{ color: "#666", marginTop: "4px" }}>
            Tổng số: <strong>{banners.length}</strong> banner
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          style={{
            padding: "10px 20px",
            backgroundColor: "#27ae60",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          + Thêm Banner
        </button>
      </div>

      {showForm && (
        <div
          style={{
            backgroundColor: "#fff",
            padding: "24px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            marginBottom: "24px",
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: "20px" }}>
            {editingBanner ? "Sửa Banner" : "Thêm Banner Mới"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
                  Tiêu đề *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="VD: Ưu đãi mùa hè"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
                  Phụ đề *
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData((prev) => ({ ...prev, subtitle: e.target.value }))}
                  placeholder="VD: Giảm giá lên đến 50%"
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ marginTop: "16px" }}>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
                Link (tùy chọn)
              </label>
              <input
                type="text"
                value={formData.link}
                onChange={(e) => setFormData((prev) => ({ ...prev, link: e.target.value }))}
                placeholder="VD: /products hoặc https://..."
                style={inputStyle}
              />
            </div>

            <div style={{ marginTop: "16px" }}>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
                Hình ảnh *
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ marginBottom: "12px" }}
              />
              {uploading && <span>Đang upload...</span>}
              {formData.image && (
                <div style={{ marginTop: "10px" }}>
                  <img
                    src={formData.image}
                    alt="Preview"
                    style={{
                      width: "200px",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                    }}
                  />
                </div>
              )}
            </div>

            <div style={{ marginTop: "16px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
                />
                <span>Hiển thị banner này</span>
              </label>
            </div>

            <div style={{ marginTop: "24px", display: "flex", gap: "12px" }}>
              <button
                type="submit"
                style={{
                  padding: "10px 24px",
                  backgroundColor: "#27ae60",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                {editingBanner ? "Cập nhật" : "Thêm mới"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                style={{
                  padding: "10px 24px",
                  backgroundColor: "#95a5a6",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      {banners.length === 0 ? (
        <div style={{ padding: "40px", textAlign: "center", color: "#999" }}>
          <p>Chưa có banner nào. Hãy thêm banner mới!</p>
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr style={{ backgroundColor: "#f8f9fa" }}>
                <th style={thStyle}>Hình ảnh</th>
                <th style={thStyle}>Tiêu đề</th>
                <th style={thStyle}>Phụ đề</th>
                <th style={thStyle}>Trạng thái</th>
                <th style={thStyle}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {banners.map((banner) => (
                <tr key={banner.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={tdStyle}>
                    <img
                      src={banner.image}
                      alt={banner.title}
                      style={{
                        width: "120px",
                        height: "70px",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </td>
                  <td style={tdStyle}>{banner.title}</td>
                  <td style={tdStyle}>{banner.subtitle}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleToggleActive(banner)}
                      style={{
                        padding: "4px 12px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        border: "none",
                        backgroundColor: banner.isActive ? "#27ae60" : "#95a5a6",
                        color: "#fff",
                      }}
                    >
                      {banner.isActive ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => handleEdit(banner)}
                        style={actionButton("#3498db")}
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(banner.id)}
                        style={actionButton("#e74c3c")}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #ddd",
  borderRadius: "6px",
  fontSize: "14px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "#fff",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  borderRadius: "8px",
  overflow: "hidden",
};

const thStyle = {
  padding: "14px 12px",
  textAlign: "left",
  fontWeight: "bold",
  fontSize: "13px",
  color: "#333",
};

const tdStyle = {
  padding: "14px 12px",
  fontSize: "14px",
};

const actionButton = (bgColor) => ({
  padding: "6px 12px",
  backgroundColor: bgColor,
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "12px",
});

export default AdminBannersPage;
