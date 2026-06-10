// ============================================
// ADMIN DASHBOARD - Responsive Design
// ============================================
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { adminUser } = useAuth();

  // Mock data - replace with actual data from Firebase
  const stats = [
    { label: "Tổng sản phẩm", value: "0", change: "+0", color: "blue", icon: ProductsIcon },
    { label: "Đơn hàng mới", value: "0", change: "+0", color: "green", icon: OrdersIcon },
    { label: "Doanh thu", value: "0đ", change: "+0đ", color: "purple", icon: RevenueIcon },
    // { label: "Người dùng", value: "0", change: "+0", color: "orange", icon: UsersIcon },
  ];

  const quickActions = [
    { label: "Thêm sản phẩm", sublabel: "Tạo sản phẩm mới", color: "blue", icon: PlusIcon, path: "/admin/products/add" },
    { label: "Xem đơn hàng", sublabel: "0 đơn hàng chưa xử lý", color: "green", icon: ListIcon, path: "/admin/orders" },
    { label: "Quản lý Banner", sublabel: "Cập nhật banners", color: "purple", icon: ImageIcon, path: "/admin/banners" },
  ];

  const colorMap = {
    blue: { bg: "bg-blue-50", iconBg: "bg-blue-500", text: "text-blue-600" },
    green: { bg: "bg-green-50", iconBg: "bg-green-500", text: "text-green-600" },
    purple: { bg: "bg-purple-50", iconBg: "bg-purple-500", text: "text-purple-600" },
    orange: { bg: "bg-orange-50", iconBg: "bg-orange-500", text: "text-orange-600" },
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">
          Dashboard
        </h1>
        <p className="text-slate-500 mt-1">
          Chào mừng trở lại, <span className="font-medium text-primary-600">{adminUser?.email?.split("@")[0] || "Admin"}</span>
        </p>
      </div>

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`
              ${colorMap[stat.color].bg} rounded-2xl p-5 lg:p-6
              border border-slate-100/50 shadow-sm
              transition-all duration-200 hover:shadow-md hover:-translate-y-0.5
            `}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
                <p className="text-2xl lg:text-3xl font-bold text-slate-800">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${colorMap[stat.color].iconBg} rounded-xl flex items-center justify-center shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-sm">
              <span className="font-semibold text-green-600">{stat.change}</span>
              <span className="text-slate-400">trong tháng này</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions - Responsive Grid */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm mb-6 lg:mb-8">
        <div className="p-5 lg:p-6 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800">Thao tác nhanh</h2>
        </div>
        <div className="p-5 lg:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => navigate(action.path)}
                className={`
                  flex items-center gap-4 p-4 rounded-xl
                  ${colorMap[action.color].bg}
                  hover:shadow-md active:scale-[0.98]
                  transition-all duration-200 text-left
                `}
              >
                <div className={`w-12 h-12 ${colorMap[action.color].iconBg} rounded-xl flex items-center justify-center shadow-sm flex-shrink-0`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-slate-800 truncate">{action.label}</p>
                  <p className="text-sm text-slate-500 truncate">{action.sublabel}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
        <div className="p-5 lg:p-6 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800">Hoạt động gần đây</h2>
        </div>
        <div className="p-8 lg:p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <EmptyIcon className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-slate-500 font-medium">Chưa có hoạt động nào</p>
          <p className="text-sm text-slate-400 mt-1">Các hoạt động sẽ được hiển thị tại đây</p>
        </div>
      </div>
    </div>
  );
};

// ========== ICONS ==========
const ProductsIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const OrdersIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);

const RevenueIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const UsersIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const PlusIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const ListIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
);

const ImageIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const EmptyIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);

export default AdminDashboard;
