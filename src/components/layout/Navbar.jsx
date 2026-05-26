import { Link } from "react-router-dom";

const Navbar = () => {
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
        <h2>ElectroStore</h2>

        <div
          style={{
            display: "flex",
            gap: "20px",
          }}
        >
          <Link to="/">Trang chủ</Link>

          <Link to="/products">
            Sản phẩm
          </Link>

          <Link to="/cart">
            Giỏ hàng
          </Link>

          <Link to="/admin">
            Admin
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;