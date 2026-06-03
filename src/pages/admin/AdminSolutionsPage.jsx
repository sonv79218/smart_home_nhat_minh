// ============================================
// ADMIN SOLUTIONS PAGE
// Manage smart home solutions
// ============================================
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getSolutions,
  addSolution,
  updateSolution,
  deleteSolution,
  toggleSolutionStatus,
} from "../../services/solutionService";
import { DATA_SOURCE } from "../../config/dataSource";
import { generateSlug } from "../../constants/productMeta";
import { uploadImageToCloudinary } from "../../services/cloudinaryService";

const AdminSolutionsPage = () => {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    image: "",
    slug: "",
    description: "",
    status: "active",
    order: 1,
  });

  const isJsonMode = DATA_SOURCE.solutions === "json";

  // ============================================
  // FETCH DATA
  // ============================================
  const fetchSolutions = async () => {
    try {
      setLoading(true);
      const data = await getSolutions();
      // Sort by order
      const sorted = data.sort((a, b) => (a.order || 0) - (b.order || 0));
      setSolutions(sorted);
    } catch (error) {
      console.error("[AdminSolutions] Error fetching:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSolutions();
  }, []);

  // ============================================
  // FORM HANDLERS
  // ============================================
  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      image: "",
      slug: "",
      description: "",
      status: "active",
      order: solutions.length + 1,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (solution) => {
    setFormData({
      title: solution.title || "",
      subtitle: solution.subtitle || "",
      image: solution.image || "",
      slug: solution.slug || "",
      description: solution.description || "",
      status: solution.status || "active",
      order: solution.order || 1,
    });
    setEditingId(solution.id);
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      
      // Auto-generate slug from title if slug is empty
      if (name === "title" && !prev.slug) {
        updated.slug = generateSlug(value);
      }
      
      return updated;
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const imageUrl = await uploadImageToCloudinary(file);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload ảnh thất bại");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Vui lòng nhập tiêu đề");
      return;
    }

    if (!formData.slug.trim()) {
      formData.slug = generateSlug(formData.title);
    }

    try {
      if (editingId) {
        await updateSolution(editingId, formData);
        alert("Cập nhật thành công!");
      } else {
        await addSolution(formData);
        alert("Thêm mới thành công!");
      }
      resetForm();
      fetchSolutions();
    } catch (error) {
      alert(error.message || "Đã xảy ra lỗi");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa giải pháp này?")) return;

    try {
      await deleteSolution(id);
      alert("Xóa thành công!");
      fetchSolutions();
    } catch (error) {
      alert(error.message || "Đã xảy ra lỗi");
    }
  };

  const handleToggleStatus = async (solution) => {
    try {
      await toggleSolutionStatus(solution.id, solution.status);
      fetchSolutions();
    } catch (error) {
      alert(error.message || "Đã xảy ra lỗi");
    }
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản lý Giải pháp</h1>
          <p className="text-slate-500 mt-1">
            Tổng số: <span className="font-semibold text-primary-600">{solutions.length}</span> giải pháp
          </p>
        </div>

        {!isJsonMode && (
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Thêm mới
          </button>
        )}
      </div>

      {/* JSON Mode Warning */}
      {isJsonMode && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h3 className="font-semibold text-amber-800">Chế độ JSON</h3>
              <p className="text-sm text-amber-700 mt-1">
                Đang dùng dữ liệu JSON, Admin không thể ghi trực tiếp. Hãy sửa file{" "}
                <code className="bg-amber-100 px-1 rounded">public/data/solutions.json</code> hoặc chuyển{" "}
                <code className="bg-amber-100 px-1 rounded">DATA_SOURCE.solutions</code> sang{" "}
                <code className="bg-amber-100 px-1 rounded">firebase</code>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">
                {editingId ? "Sửa giải pháp" : "Thêm giải pháp mới"}
              </h2>
              <button
                onClick={resetForm}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100"
              >
                <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Tiêu đề <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  placeholder="VD: Chiếu sáng thông minh"
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Phụ đề
                </label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  placeholder="VD: Tích hợp Apple HomeKit"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Slug (URL)
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none font-mono text-sm"
                  placeholder="chieu-sang-thong-minh"
                />
                <p className="text-xs text-slate-400 mt-1">
                  Để trống để tự động tạo từ tiêu đề
                </p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Mô tả
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none"
                  placeholder="Mô tả chi tiết về giải pháp..."
                />
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Hình ảnh
                </label>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {formData.image ? (
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-24 h-24 object-cover rounded-xl border border-slate-200"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center">
                        <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading || isJsonMode}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className={`inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg cursor-pointer hover:bg-slate-200 transition-colors ${uploading || isJsonMode ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      {uploading ? "Đang upload..." : "Chọn ảnh"}
                    </label>
                    {formData.image && (
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, image: "" }))}
                        className="ml-2 text-red-500 text-sm hover:underline"
                      >
                        Xóa ảnh
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Order & Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Thứ tự
                  </label>
                  <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    min="1"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Trạng thái
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    disabled={isJsonMode}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white disabled:opacity-50"
                  >
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Không hoạt động</option>
                  </select>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2.5 border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isJsonMode}
                  className={`px-6 py-2.5 bg-primary-600 text-white rounded-xl font-semibold transition-colors ${isJsonMode ? "opacity-50 cursor-not-allowed" : "hover:bg-primary-700"}`}
                >
                  {editingId ? "Cập nhật" : "Thêm mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Solutions Table */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                    Thứ tự
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                    Hình ảnh
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                    Tiêu đề
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                    Slug
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                    Trạng thái
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {solutions.map((solution) => (
                  <tr key={solution.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {solution.order || 1}
                    </td>
                    <td className="px-4 py-3">
                      {solution.image ? (
                        <img
                          src={solution.image}
                          alt={solution.title}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-slate-200 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-slate-800">{solution.title}</p>
                        {solution.subtitle && (
                          <p className="text-xs text-slate-500">{solution.subtitle}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <code className="text-xs bg-slate-100 px-2 py-1 rounded">
                        {solution.slug}
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => !isJsonMode && handleToggleStatus(solution)}
                        disabled={isJsonMode}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                          solution.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-100 text-slate-500"
                        } ${!isJsonMode ? "cursor-pointer hover:opacity-80" : "opacity-50 cursor-not-allowed"}`}
                      >
                        {solution.status === "active" ? "Hoạt động" : "Tắt"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/solutions/${solution.slug}`}
                          target="_blank"
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </Link>
                        <button
                          onClick={() => !isJsonMode && handleEdit(solution)}
                          disabled={isJsonMode}
                          className={`p-2 text-yellow-500 hover:bg-yellow-50 rounded-lg transition-colors ${isJsonMode ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => !isJsonMode && handleDelete(solution.id)}
                          disabled={isJsonMode}
                          className={`p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors ${isJsonMode ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-slate-100">
            {solutions.map((solution) => (
              <div key={solution.id} className="p-4">
                <div className="flex items-start gap-3">
                  {solution.image ? (
                    <img
                      src={solution.image}
                      alt={solution.title}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-slate-200 rounded-lg flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded">
                        #{solution.order || 1}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        solution.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-500"
                      }`}>
                        {solution.status === "active" ? "Hoạt động" : "Tắt"}
                      </span>
                    </div>
                    <p className="font-medium text-slate-800 mt-1">{solution.title}</p>
                    {solution.subtitle && (
                      <p className="text-sm text-slate-500">{solution.subtitle}</p>
                    )}
                    <div className="flex items-center gap-2 mt-3">
                      <Link
                        to={`/solutions/${solution.slug}`}
                        target="_blank"
                        className="text-sm text-blue-500 hover:underline"
                      >
                        Xem
                      </Link>
                      {!isJsonMode && (
                        <>
                          <button
                            onClick={() => handleEdit(solution)}
                            className="text-sm text-yellow-500 hover:underline"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => handleDelete(solution.id)}
                            className="text-sm text-red-500 hover:underline"
                          >
                            Xóa
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {solutions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500">Chưa có giải pháp nào</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminSolutionsPage;
