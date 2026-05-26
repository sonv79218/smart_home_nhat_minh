import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";

const Navbar = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <header
      style={{
        padding: "16px 32px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h2>ElectroStore</h2>
        </Link>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Link to="/">Trang chủ</Link>

          <Link to="/products">Sản phẩm</Link>

          <Link
            to="/cart"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              position: "relative",
            }}
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
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Giỏ hàng
            {totalItems > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-12px",
                  backgroundColor: "#e74c3c",
                  color: "white",
                  borderRadius: "50%",
                  width: "18px",
                  height: "18px",
                  fontSize: "11px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>

          <Link to="admin/products">Admin</Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;