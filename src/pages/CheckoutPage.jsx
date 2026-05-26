import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import { createOrder } from "../services/orderService";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const totalPrice = getTotalPrice();

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: "60px 20px", textAlign: "center" }}>
        <h2 style={{ marginBottom: "10px", color: "#666" }}>Giỏ hàng trống</h2>
        <p style={{ color: "#999", marginBottom: "24px" }}>
          Vui lòng thêm sản phẩm vào giỏ hàng trước khi đặt hàng
        </p>
        <Link
          to="/products"
          style={{
            padding: "12px 24px",
            backgroundColor: "#3498db",
            color: "white",
            textDecoration: "none",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập họ tên";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^(0[0-9]{9,10})$/.test(formData.phone.trim())) {
      newErrors.phone = "Số điện thoại không hợp lệ (0xxxxxxxxx)";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
     const order = {
  userInfo: {
    name: formData.name.trim() || "",
    phone: formData.phone.trim() || "",
    address: formData.address.trim() || "",
    note: formData.note.trim() || "",
  },

  items: cartItems.map((item) => ({
    id: item.id || "",
    name: item.name || "",
    price: item.price || 0,
    thumbnail: item.thumbnail || "",
    quantity: item.quantity || 1,
  })),

  totalPrice: totalPrice || 0,
  status: "pending",
  createdAt: new Date(),
};

      await createOrder(order);

      clearCart();

      alert("Đặt hàng thành công! Cảm ơn bạn đã mua sắm.");
      navigate("/products");
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      alert("Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "24px" }}>Thanh toán</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "32px",
        }}
      >
        {/* Form thông tin người mua */}
        <div>
          <h2 style={{ marginBottom: "16px" }}>Thông tin người mua</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
                Họ tên *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập họ tên"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: `1px solid ${errors.name ? "#e74c3c" : "#ddd"}`,
                  borderRadius: "6px",
                  fontSize: "14px",
                }}
              />
              {errors.name && (
                <span style={{ color: "#e74c3c", fontSize: "12px" }}>
                  {errors.name}
                </span>
              )}
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
                Số điện thoại *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0xxxxxxxxx"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: `1px solid ${errors.phone ? "#e74c3c" : "#ddd"}`,
                  borderRadius: "6px",
                  fontSize: "14px",
                }}
              />
              {errors.phone && (
                <span style={{ color: "#e74c3c", fontSize: "12px" }}>
                  {errors.phone}
                </span>
              )}
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
                Địa chỉ *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Nhập địa chỉ giao hàng"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: `1px solid ${errors.address ? "#e74c3c" : "#ddd"}`,
                  borderRadius: "6px",
                  fontSize: "14px",
                }}
              />
              {errors.address && (
                <span style={{ color: "#e74c3c", fontSize: "12px" }}>
                  {errors.address}
                </span>
              )}
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
                Ghi chú (tùy chọn)
              </label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                placeholder="Ghi chú thêm cho đơn hàng"
                rows="3"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "14px",
                  resize: "vertical",
                }}
              />
            </div>
          </form>
        </div>

        {/* Hiển thị cart items */}
        <div>
          <h2 style={{ marginBottom: "16px" }}>Đơn hàng của bạn</h2>
          <div
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              padding: "16px",
              backgroundColor: "#f8f9fa",
            }}
          >
            {cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 0",
                  borderBottom: "1px solid #e0e0e0",
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
                />
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontWeight: "bold",
                      marginBottom: "4px",
                      fontSize: "14px",
                    }}
                  >
                    {item.name}
                  </p>
                  <p style={{ color: "#666", fontSize: "12px" }}>
                    {item.quantity} x {Number(item.price).toLocaleString()}đ
                  </p>
                </div>
                <p style={{ fontWeight: "bold", color: "#27ae60" }}>
                  {Number(item.price * item.quantity).toLocaleString()}đ
                </p>
              </div>
            ))}

            <div
              style={{
                marginTop: "16px",
                paddingTop: "16px",
                borderTop: "2px solid #ddd",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p style={{ fontSize: "16px", fontWeight: "bold" }}>Tổng tiền:</p>
                <p style={{ fontSize: "24px", fontWeight: "bold", color: "#e74c3c" }}>
                  {Number(totalPrice).toLocaleString()}đ
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            style={{
              width: "100%",
              marginTop: "20px",
              padding: "14px",
              fontSize: "16px",
              fontWeight: "bold",
              backgroundColor: isLoading ? "#95a5a6" : "#27ae60",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            {isLoading ? "Đang xử lý..." : "Đặt hàng"}
          </button>

          <Link
            to="/cart"
            style={{
              display: "block",
              textAlign: "center",
              marginTop: "12px",
              color: "#3498db",
              textDecoration: "none",
            }}
          >
            ← Quay lại giỏ hàng
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
