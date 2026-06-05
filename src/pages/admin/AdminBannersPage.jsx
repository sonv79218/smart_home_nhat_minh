// ============================================
// ADMIN BANNERS PAGE - Fully Responsive
// ============================================
import { useEffect, useState } from "react";
import { getBanners, addBanner, updateBanner, deleteBanner } from "../../services/bannerService";
import { uploadImageToCloudinary } from "../../services/cloudinaryService";
import { useToast, useConfirm } from "../../contexts/ToastContext";

const AdminBannersPage = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [uploading, setUploading] = useState(false);
  const toast = useToast();
  const { confirm } = useConfirm();

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
      toast.error("Không thể tải ảnh banner lên. Vui lòng thử lại.", {
        title: "Upload ảnh thất bại",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.subtitle || !formData.image) {
      toast.warning("Vui lòng điền đầy đủ tiêu đề, phụ đề và hình ảnh banner.", {
        title: "Thiếu thông tin",
      });
      return;
    }

    try {
      if (editingBanner) {
        await updateBanner(editingBanner.id, formData);
        setBanners((prev) =>
          prev.map((b) => (b.id === editingBanner.id ? { ...b, ...formData } : b))
        );
        toast.success("Banner đã được cập nhật thành công.", {
          title: "Cập nhật banner thành công",
        });
      } else {
        const docRef = await addBanner(formData);
        setBanners((prev) => [{ id: docRef.id, ...formData, createdAt: new Date() }, ...prev]);
        toast.success("Banner mới đã được thêm vào hệ thống.", {
          title: "Thêm banner thành công",
        });
      }

      resetForm();
    } catch (error) {
      console.error("Error saving banner:", error);
      toast.error("Không thể lưu banner lúc này. Vui lòng thử lại.", {
        title: "Lưu banner thất bại",
      });
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
    const accepted = await confirm({
      title: "Xóa banner",
      message: "Bạn có chắc muốn xóa banner này không?",
      confirmText: "Xóa banner",
      cancelText: "Hủy",
    });

    if (!accepted) return;

    try {
      await deleteBanner(id);
      setBanners((prev) => prev.filter((b) => b.id !== id));
      toast.success("Banner đã được xóa khỏi hệ thống.", {
        title: "Xóa banner thành công",
      });
    } catch (error) {
      console.error("Error deleting banner:", error);
      toast.error("Không thể xóa banner lúc này.", {
        title: "Xóa banner thất bại",
      });
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
      toast.error("Không thể cập nhật trạng thái banner.", {
        title: "Cập nhật trạng thái thất bại",
      });
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
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          <p className="text-slate-500 text-sm">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản lý Banner</h1>
          <p className="text-slate-500 mt-1">
            Tổng số: <span className="font-semibold text-primary-600">{banners.length}</span> banner
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/25 hover:bg-primary-700 hover:-translate-y-0.5 transition-all duration-200"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Thêm Banner</span>
        </button>
      </div>

      {/* Banner Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 lg:p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800">
              {editingBanner ? "Sửa Banner" : "Thêm Banner Mới"}
            </h2>
            <button
              onClick={resetForm}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
            >
              <CloseIcon className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Title & Subtitle - Responsive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Tiêu đề <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="VD: Ưu đãi mùa hè"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Phụ đề <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData((prev) => ({ ...prev, subtitle: e.target.value }))}
                  placeholder="VD: Giảm giá lên đến 50%"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm"
                  required
                />
              </div>
            </div>

            {/* Link */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Link (tùy chọn)
              </label>
              <input
                type="text"
                value={formData.link}
                onChange={(e) => setFormData((prev) => ({ ...prev, link: e.target.value }))}
                placeholder="VD: /products hoặc https://..."
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm"
              />
            </div>

            {/* Image Upload */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Hình ảnh <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col sm:flex-row gap-3 items-start">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="banner-image-upload"
                />
                <label
                  htmlFor="banner-image-upload"
                  className="px-4 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-xl cursor-pointer hover:bg-slate-200 transition-colors text-sm"
                >
                  {uploading ? "Đang upload..." : "Chọn ảnh"}
                </label>
                {formData.image && (
                  <div className="relative group">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-32 h-20 object-cover rounded-xl border border-slate-200"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, image: "" }))}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <CloseIcon className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Active Toggle */}
            <div className="mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
                    className="sr-only"
                  />
                  <div className={`w-11 h-6 rounded-full transition-colors ${formData.isActive ? "bg-primary-600" : "bg-slate-200"}`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform mt-0.5 ${formData.isActive ? "translate-x-5 ml-0.5" : "translate-x-0.5"}`} />
                  </div>
                </div>
                <span className="text-sm font-medium text-slate-700">Hiển thị banner này</span>
              </label>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 sm:flex-none px-6 py-2.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
              >
                {editingBanner ? "Cập nhật" : "Thêm mới"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 sm:flex-none px-6 py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Banners Grid */}
      {banners.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ImageIcon className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-700 mb-2">Chưa có banner nào</h3>
          <p className="text-slate-500 mb-4">Hãy thêm banner mới để bắt đầu</p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            Thêm Banner
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className={`bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all hover:shadow-md ${
                !banner.isActive ? "opacity-60" : ""
              }`}
            >
              {/* Banner Image */}
              <div className="relative aspect-[16/9] bg-slate-100">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold text-white ${
                      banner.isActive ? "bg-green-500" : "bg-slate-400"
                    }`}
                  >
                    {banner.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              {/* Banner Info */}
              <div className="p-4">
                <h3 className="font-semibold text-slate-800 line-clamp-1">{banner.title}</h3>
                <p className="text-sm text-slate-500 mt-1 line-clamp-2">{banner.subtitle}</p>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-4">
                  <button
                    onClick={() => handleToggleActive(banner)}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                      banner.isActive
                        ? "bg-amber-50 text-amber-600 hover:bg-amber-100"
                        : "bg-green-50 text-green-600 hover:bg-green-100"
                    }`}
                  >
                    {banner.isActive ? "Tắt" : "Bật"}
                  </button>
                  <button
                    onClick={() => handleEdit(banner)}
                    className="flex-1 py-2 bg-blue-50 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(banner.id)}
                    className="flex-1 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-lg hover:bg-red-100 transition-colors"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ========== ICONS ==========
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

const ImageIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

export default AdminBannersPage;
