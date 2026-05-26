import { Link, Outlet } from "react-router-dom";

const AdminPage = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: "240px",
          backgroundColor: "#2c3e50",
          color: "#fff",
          padding: "20px 0",
        }}
      >
        <h2
          style={{
            padding: "0 20px",
            marginBottom: "30px",
            fontSize: "20px",
          }}
        >
          Admin Panel
        </h2>

        <nav>
          <Link
            to="/admin/products"
            style={navLinkStyle}
          >
            📦 Quản lý sản phẩm
          </Link>

          <Link
            to="/admin/orders"
            style={navLinkStyle}
          >
            📋 Quản lý đơn hàng
          </Link>

          <Link
            to="/admin/banners"
            style={navLinkStyle}
          >
            🖼️ Quản lý Banner
          </Link>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: "20px", backgroundColor: "#f5f5f5" }}>
        <Outlet />
      </main>
    </div>
  );
};

const navLinkStyle = {
  display: "block",
  padding: "12px 20px",
  color: "#fff",
  textDecoration: "none",
  transition: "background-color 0.2s",
};

export default AdminPage;