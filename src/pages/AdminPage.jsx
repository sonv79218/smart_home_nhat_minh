// ============================================
// ADMIN PAGE - Layout with Sidebar
// ============================================
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AdminPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-sm">
              🏠
            </span>
            Admin Panel
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          <NavLink to="/admin/dashboard" icon="📊">
            Dashboard
          </NavLink>
          <NavLink to="/admin/products" icon="📦">
            Quản lý sản phẩm
          </NavLink>
          <NavLink to="/admin/orders" icon="📋">
            Quản lý đơn hàng
          </NavLink>
          <NavLink to="/admin/banners" icon="🖼️">
            Quản lý Banner
          </NavLink>
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-700 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <span>🌐</span>
            <span className="text-sm font-medium">Xem website</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <span>🚪</span>
            <span className="text-sm font-medium">Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

const NavLink = ({ to, icon, children }) => (
  <Link
    to={to}
    className="flex items-center gap-3 px-4 py-2.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
  >
    <span>{icon}</span>
    <span className="text-sm font-medium">{children}</span>
  </Link>
);

export default AdminPage;
