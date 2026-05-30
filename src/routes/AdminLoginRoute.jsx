import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "../components/common/LoadingSpinner";

const AdminLoginRoute = ({ children }) => {
  const { adminUser, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullHeight />;
  }

  if (adminUser) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default AdminLoginRoute;