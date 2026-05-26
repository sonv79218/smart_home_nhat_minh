import { Link, useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";

const CartPage = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getTotalPrice,
  } = useCart();

  const totalPrice = getTotalPrice();

  if (cartItems.length === 0) {
    return (
      <div
        style={{
          padding: "60px 20px",
          textAlign: "center",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ccc"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginBottom: "20px" }}
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        <h2 style={{ marginBottom: "10px", color: "#666" }}>Giỏ hàng trống</h2>
        <p style={{ color: "#999", marginBottom: "24px" }}>
          Bạn chưa thêm sản phẩm nào vào giỏ hàng
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

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h1>Giỏ hàng của bạn</h1>
        <button
          onClick={clearCart}
          style={{
            padding: "8px 16px",
            backgroundColor: "#e74c3c",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Xóa tất cả
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {cartItems.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              padding: "16px",
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              backgroundColor: "#fff",
            }}
          >
            <Link to={`/product/${item.id}`}>
              <img
                src={item.thumbnail}
                alt={item.name}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </Link>

            <div style={{ flex: 1 }}>
              <Link
                to={`/product/${item.id}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                {item.name}
              </Link>
              <p style={{ color: "#e74c3c", fontWeight: "bold", marginTop: "4px" }}>
                {Number(item.price).toLocaleString()}đ
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button
                onClick={() => decreaseQuantity(item.id)}
                style={{
                  width: "32px",
                  height: "32px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  backgroundColor: "#f5f5f5",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                −
              </button>
              <span
                style={{
                  minWidth: "40px",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {item.quantity}
              </span>
              <button
                onClick={() => increaseQuantity(item.id)}
                style={{
                  width: "32px",
                  height: "32px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  backgroundColor: "#f5f5f5",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                +
              </button>
            </div>

            <div style={{ textAlign: "right", minWidth: "120px" }}>
              <p style={{ fontWeight: "bold", color: "#27ae60" }}>
                {Number(item.price * item.quantity).toLocaleString()}đ
              </p>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              style={{
                padding: "8px",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#e74c3c",
              }}
              title="Xóa sản phẩm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "32px",
          padding: "24px",
          backgroundColor: "#f8f9fa",
          borderRadius: "12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <p style={{ color: "#666", marginBottom: "4px" }}>
            Tổng số sản phẩm: <strong>{cartItems.length}</strong>
          </p>
          <h2 style={{ fontSize: "24px", color: "#27ae60" }}>
            Tổng tiền: {Number(totalPrice).toLocaleString()}đ
          </h2>
        </div>
        <button
          onClick={() => navigate("/checkout")}
          style={{
            padding: "14px 32px",
            fontSize: "16px",
            fontWeight: "bold",
            backgroundColor: "#27ae60",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
};

export default CartPage;