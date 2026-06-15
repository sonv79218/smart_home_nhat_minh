// ============================================
// PROTECTED ROUTE - ADMIN ONLY
// Redirect về login nếu không phải admin
// ============================================
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "../components/common/LoadingSpinner";

const ProtectedRouteAdmin = ({ children }) => {
  const { adminUser, loading } = useAuth();
  const location = useLocation();

  // Loading state - hiển thị spinner
  if (loading) {
    return <LoadingSpinner fullHeight />;
  }

  // Chưa login hoặc không phải admin - redirect về login
  if (!adminUser) {
    return <Navigate to="/qtvnmsmart/login" state={{ from: location }} replace />;
  }

  // Là admin - cho phép truy cập
  return children;
};

export default ProtectedRouteAdmin;
