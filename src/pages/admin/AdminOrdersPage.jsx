import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus, deleteOrder } from "../../services/orderService";

const STATUS_OPTIONS = ["pending", "processing", "shipped", "done"];

const STATUS_COLORS = {
  pending: "#f39c12",
  processing: "#3498db",
  shipped: "#9b59b6",
  done: "#27ae60",
};

const STATUS_LABELS = {
  pending: "Chờ xử lý",
  processing: "Đang xử lý",
  shipped: "Đang giao",
  done: "Hoàn thành",
};

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

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

  const formatDate = (timestamp) => {
    if (!timestamp?.seconds) return "N/A";
    return new Date(timestamp.seconds * 1000).toLocaleString("vi-VN");
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      if (selectedOrder?.id === orderId) {
        setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
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
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(null);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Xóa đơn hàng thất bại");
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filterStatus === "all" || order.status === filterStatus;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      order.userInfo?.name?.toLowerCase().includes(searchLower) ||
      order.userInfo?.phone?.includes(searchLower);
    return matchesStatus && matchesSearch;
  });

  const getNextStatus = (currentStatus) => {
    const currentIndex = STATUS_OPTIONS.indexOf(currentStatus);
    if (currentIndex < STATUS_OPTIONS.length - 1) {
      return STATUS_OPTIONS[currentIndex + 1];
    }
    return null;
  };

  const truncateId = (id) => {
    return id ? id.slice(0, 8) + "..." : "N/A";
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
      <div style={{ marginBottom: "24px" }}>
        <h1>Quản lý đơn hàng</h1>
        <p style={{ color: "#666", marginTop: "4px" }}>
          Tổng số: <strong>{orders.length}</strong> đơn hàng
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Tìm theo tên hoặc số điện thoại..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px 14px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            width: "280px",
          }}
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{
            padding: "10px 14px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            minWidth: "160px",
          }}
        >
          <option value="all">Tất cả trạng thái</option>
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {STATUS_LABELS[status]}
            </option>
          ))}
        </select>
      </div>

      {filteredOrders.length === 0 ? (
        <div style={{ padding: "40px", textAlign: "center", color: "#999" }}>
          <p>Không có đơn hàng nào</p>
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "#fff",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f8f9fa" }}>
                <th style={thStyle}>Order ID</th>
                <th style={thStyle}>Khách hàng</th>
                <th style={thStyle}>Số điện thoại</th>
                <th style={thStyle}>Địa chỉ</th>
                <th style={thStyle}>Tổng tiền</th>
                <th style={thStyle}>Trạng thái</th>
                <th style={thStyle}>Ngày tạo</th>
                <th style={thStyle}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  style={{
                    borderBottom: "1px solid #eee",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedOrder(order)}
                >
                  <td style={tdStyle}>
                    <code style={{ fontSize: "12px" }}>
                      {truncateId(order.id)}
                    </code>
                  </td>
                  <td style={tdStyle}>{order.userInfo?.name || "N/A"}</td>
                  <td style={tdStyle}>{order.userInfo?.phone || "N/A"}</td>
                  <td style={{ ...tdStyle, maxWidth: "150px" }}>
                    <span
                      style={{
                        display: "block",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                      title={order.userInfo?.address}
                    >
                      {order.userInfo?.address || "N/A"}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <strong style={{ color: "#27ae60" }}>
                      {Number(order.totalPrice || 0).toLocaleString()}đ
                    </strong>
                  </td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        backgroundColor: STATUS_COLORS[order.status] || "#999",
                        color: "#fff",
                      }}
                    >
                      {STATUS_LABELS[order.status] || order.status}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, fontSize: "13px" }}>
                    {formatDate(order.createdAt)}
                  </td>
                  <td style={tdStyle}>
                    <div
                      style={{ display: "flex", gap: "8px" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => setSelectedOrder(order)}
                        style={actionButton("#3498db")}
                      >
                        Chi tiết
                      </button>
                      <button
                        onClick={() => handleDelete(order.id)}
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

      {selectedOrder && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setSelectedOrder(null)}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              padding: "24px",
              maxWidth: "600px",
              width: "90%",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ margin: 0 }}>Chi tiết đơn hàng</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <p style={{ marginBottom: "8px" }}>
                <strong>Order ID:</strong>{" "}
                <code style={{ fontSize: "12px" }}>{selectedOrder.id}</code>
              </p>
              <p style={{ marginBottom: "8px" }}>
                <strong>Ngày tạo:</strong> {formatDate(selectedOrder.createdAt)}
              </p>
              <p style={{ marginBottom: "12px" }}>
                <strong>Trạng thái hiện tại:</strong>{" "}
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: "12px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    backgroundColor:
                      STATUS_COLORS[selectedOrder.status] || "#999",
                    color: "#fff",
                  }}
                >
                  {STATUS_LABELS[selectedOrder.status] || selectedOrder.status}
                </span>
              </p>

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {getNextStatus(selectedOrder.status) && (
                  <button
                    onClick={() =>
                      handleStatusChange(
                        selectedOrder.id,
                        getNextStatus(selectedOrder.status)
                      )
                    }
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#27ae60",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Chuyển sang "{STATUS_LABELS[getNextStatus(selectedOrder.status)]}"
                  </button>
                )}
              </div>
            </div>

            <div
              style={{
                padding: "16px",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
                marginBottom: "20px",
              }}
            >
              <h3 style={{ marginTop: 0, marginBottom: "12px" }}>
                Thông tin khách hàng
              </h3>
              <p style={{ marginBottom: "6px" }}>
                <strong>Tên:</strong> {selectedOrder.userInfo?.name}
              </p>
              <p style={{ marginBottom: "6px" }}>
                <strong>Phone:</strong> {selectedOrder.userInfo?.phone}
              </p>
              <p style={{ marginBottom: "6px" }}>
                <strong>Địa chỉ:</strong> {selectedOrder.userInfo?.address}
              </p>
              {selectedOrder.userInfo?.note && (
                <p style={{ marginBottom: 0 }}>
                  <strong>Ghi chú:</strong> {selectedOrder.userInfo.note}
                </p>
              )}
            </div>

            <div>
              <h3 style={{ marginTop: 0, marginBottom: "12px" }}>
                Sản phẩm ({selectedOrder.items?.length || 0})
              </h3>
              {selectedOrder.items?.map((item, index) => (
                <div
                  key={item.id || index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 0",
                    borderBottom:
                      index < selectedOrder.items.length - 1
                        ? "1px solid #eee"
                        : "none",
                  }}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontWeight: "bold" }}>{item.name}</p>
                    <p style={{ margin: "4px 0 0", color: "#666", fontSize: "13px" }}>
                      {item.quantity} x {Number(item.price).toLocaleString()}đ
                    </p>
                  </div>
                  <strong style={{ color: "#27ae60" }}>
                    {Number(item.price * item.quantity).toLocaleString()}đ
                  </strong>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "20px",
                paddingTop: "16px",
                borderTop: "2px solid #ddd",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <strong style={{ fontSize: "18px" }}>Tổng tiền:</strong>
              <strong style={{ fontSize: "24px", color: "#e74c3c" }}>
                {Number(selectedOrder.totalPrice || 0).toLocaleString()}đ
              </strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
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
  padding: "6px 10px",
  backgroundColor: bgColor,
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "12px",
});

export default AdminOrdersPage;
