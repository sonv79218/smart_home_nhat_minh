
import { useEffect, useMemo, useState } from "react";
import {
  getOrders,
  updateOrderStatus,
  deleteOrder,
} from "../../services/orderService";

const ITEMS_PER_PAGE = 10;

const STATUS_OPTIONS = ["pending", "processing", "shipped", "done"];

const STATUS_COLORS = {
  pending: "bg-amber-500",
  processing: "bg-blue-500",
  shipped: "bg-purple-500",
  done: "bg-green-500",
};

const STATUS_LABELS = {
  pending: "Chờ xử lý",
  processing: "Đang xử lý",
  shipped: "Đang giao",
  done: "Hoàn thành",
};

const AdminOrdersPage = () => {
  // =========================
  // STATES
  // =========================

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // =========================
  // EFFECTS
  // =========================

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

  // =========================
  // FETCH
  // =========================

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const data = await getOrders();

      const sorted = data.sort((a, b) => {
        const dateA = a.createdAt?.seconds || 0;
        const dateB = b.createdAt?.seconds || 0;

        return dateB - dateA;
      });

      setOrders(sorted);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // HELPERS
  // =========================

  const formatDate = (timestamp) => {
    if (!timestamp?.seconds) return "N/A";

    return new Date(timestamp.seconds * 1000).toLocaleString("vi-VN");
  };

  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString("vi-VN");
  };

  const truncateId = (id) => {
    return id ? id.slice(0, 8) + "..." : "N/A";
  };

  const getNextStatus = (currentStatus) => {
    const currentIndex = STATUS_OPTIONS.indexOf(currentStatus);

    if (currentIndex < STATUS_OPTIONS.length - 1) {
      return STATUS_OPTIONS[currentIndex + 1];
    }

    return null;
  };

  // =========================
  // MEMO FILTER
  // =========================

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus =
        filterStatus === "all" || order.status === filterStatus;

      const searchLower = searchTerm.toLowerCase();

      const matchesSearch =
        !searchTerm ||
        order.userInfo?.name?.toLowerCase().includes(searchLower) ||
        order.userInfo?.phone?.includes(searchLower);

      return matchesStatus && matchesSearch;
    });
  }, [orders, filterStatus, searchTerm]);

  // =========================
  // PAGINATION
  // =========================

  const totalPages = useMemo(() => {
    return Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  }, [filteredOrders]);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return filteredOrders.slice(startIndex, endIndex);
  }, [filteredOrders, currentPage]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const endIndex = startIndex + ITEMS_PER_PAGE;

  // =========================
  // ACTIONS
  // =========================

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? { ...order, status: newStatus }
            : order
        )
      );

      if (selectedOrder?.id === orderId) {
        setSelectedOrder((prev) => ({
          ...prev,
          status: newStatus,
        }));
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Cập nhật trạng thái thất bại");
    }
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm("Bạn có chắc muốn xóa đơn hàng này?")) return;

    try {
      await deleteOrder(orderId);

      setOrders((prev) =>
        prev.filter((order) => order.id !== orderId)
      );

      if (selectedOrder?.id === orderId) {
        setSelectedOrder(null);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Xóa đơn hàng thất bại");
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />

          <p className="text-slate-500 text-sm">
            Đang tải dữ liệu...
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // RENDER
  // =========================

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Quản lý đơn hàng
          </h1>

          <p className="text-slate-500 mt-1">
            Tổng số:{" "}
            <span className="font-semibold text-primary-600">
              {orders.length}
            </span>{" "}
            đơn hàng
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm mb-6">
        {/* Mobile Filter Header */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden w-full flex items-center justify-between p-4 border-b border-slate-100"
        >
          <span className="flex items-center gap-2 font-medium text-slate-700">
            <FilterIcon className="w-5 h-5" />
            Bộ lọc
          </span>

          <ChevronIcon
            className={`w-5 h-5 text-slate-400 transition-transform ${
              showFilters ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Filter Content */}
        <div
          className={`${
            showFilters ? "block" : "hidden"
          } lg:block p-4`}
        >
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  type="text"
                  placeholder="Tìm theo tên hoặc số điện thoại..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* Status */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm bg-white min-w-[160px]"
            >
              <option value="all">Tất cả trạng thái</option>

              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {STATUS_LABELS[status]}
                </option>
              ))}
            </select>

            {/* Clear */}
            {(searchTerm || filterStatus !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterStatus("all");
                }}
                className="px-4 py-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors text-sm font-medium"
              >
                Xóa bộ lọc
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Empty */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <EmptyIcon className="w-8 h-8 text-slate-400" />
          </div>

          <h3 className="text-lg font-semibold text-slate-700 mb-2">
            Không có đơn hàng nào
          </h3>

          <p className="text-slate-500">
            {searchTerm || filterStatus !== "all"
              ? "Thử thay đổi bộ lọc để xem thêm đơn hàng"
              : "Chưa có đơn hàng nào được tạo"}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Order ID
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Khách hàng
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Số điện thoại
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Tổng tiền
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Trạng thái
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Ngày tạo
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {paginatedOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <td className="px-4 py-3">
                      <code className="text-xs bg-slate-100 px-2 py-1 rounded">
                        {truncateId(order.id)}
                      </code>
                    </td>

                    <td className="px-4 py-3 text-sm font-medium text-slate-800">
                      {order.userInfo?.name || "N/A"}
                    </td>

                    <td className="px-4 py-3 text-sm text-slate-600">
                      {order.userInfo?.phone || "N/A"}
                    </td>

                    <td className="px-4 py-3">
                      <span className="font-semibold text-green-600 text-sm">
                        {formatPrice(order.totalPrice)}đ
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold text-white ${
                          STATUS_COLORS[order.status] ||
                          "bg-slate-400"
                        }`}
                      >
                        {STATUS_LABELS[order.status] ||
                          order.status}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-sm text-slate-500">
                      {formatDate(order.createdAt)}
                    </td>

                    <td
                      className="px-4 py-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(order.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="md:hidden divide-y divide-slate-100">
            {paginatedOrders.map((order) => (
              <div
                key={order.id}
                className="p-4 cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => setSelectedOrder(order)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <code className="text-xs bg-slate-100 px-2 py-1 rounded">
                      {truncateId(order.id)}
                    </code>

                    <p className="font-medium text-slate-800 mt-1">
                      {order.userInfo?.name || "N/A"}
                    </p>

                    <p className="text-sm text-slate-500">
                      {order.userInfo?.phone || "N/A"}
                    </p>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold text-white ${
                      STATUS_COLORS[order.status] ||
                      "bg-slate-400"
                    }`}
                  >
                    {STATUS_LABELS[order.status] || order.status}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-green-600">
                    {formatPrice(order.totalPrice)}đ
                  </span>

                  <span className="text-xs text-slate-400">
                    {formatDate(order.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-4 border-t border-slate-100">
              <p className="text-sm text-slate-500">
                Hiển thị{" "}
                <span className="font-semibold">
                  {startIndex + 1}-
                  {Math.min(
                    endIndex,
                    filteredOrders.length
                  )}
                </span>{" "}
                trên{" "}
                <span className="font-semibold">
                  {filteredOrders.length}
                </span>{" "}
                đơn hàng
              </p>

              <div className="flex items-center gap-2 flex-wrap">
                {/* Prev */}
                <button
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => prev - 1)
                  }
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    currentPage === 1
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : "border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  Trước
                </button>

                {/* Pages */}
                {Array.from(
                  { length: totalPages },
                  (_, index) => {
                    const page = index + 1;

                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${
                          currentPage === page
                            ? "bg-primary-600 text-white"
                            : "border border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  }
                )}

                {/* Next */}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => prev + 1)
                  }
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    currentPage === totalPages
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : "border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  Sau
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODAL */}
      {selectedOrder && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  Chi tiết đơn hàng
                </h2>

                <p className="text-xs text-slate-400 mt-0.5">
                  ID: {selectedOrder.id}
                </p>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
              >
                <CloseIcon className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="p-6">
              {/* Status */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`px-3 py-1.5 rounded-full text-sm font-semibold text-white ${
                      STATUS_COLORS[selectedOrder.status] ||
                      "bg-slate-400"
                    }`}
                  >
                    {STATUS_LABELS[selectedOrder.status] ||
                      selectedOrder.status}
                  </span>

                  <span className="text-sm text-slate-500">
                    {formatDate(selectedOrder.createdAt)}
                  </span>
                </div>

                {getNextStatus(selectedOrder.status) && (
                  <button
                    onClick={() =>
                      handleStatusChange(
                        selectedOrder.id,
                        getNextStatus(selectedOrder.status)
                      )
                    }
                    className="w-full py-2.5 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors"
                  >
                    Chuyển sang "
                    {
                      STATUS_LABELS[
                        getNextStatus(selectedOrder.status)
                      ]
                    }
                    "
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// =========================
// ICONS
// =========================

const SearchIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const FilterIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
    />
  </svg>
);

const ChevronIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const EyeIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const TrashIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

const EmptyIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
    />
  </svg>
);

const CloseIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export default AdminOrdersPage;

