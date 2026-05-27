import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

// Public Pages
import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";

// Admin Pages
import AdminPage from "../pages/AdminPage";
import AdminProductsPage from "../pages/admin/AdminProductsPage";
import AddProductPage from "../pages/admin/AddProductPage";
import AdminOrdersPage from "../pages/admin/AdminOrdersPage";
import AdminBannersPage from "../pages/admin/AdminBannersPage";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";

// Protected Route
import ProtectedRouteAdmin from "./ProtectedRouteAdmin";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />

        <Route
          path="/products"
          element={
            <MainLayout>
              <ProductsPage />
            </MainLayout>
          }
        />

        <Route
          path="/product/:id"
          element={
            <MainLayout>
              <ProductDetailPage />
            </MainLayout>
          }
        />

        <Route
          path="/cart"
          element={
            <MainLayout>
              <CartPage />
            </MainLayout>
          }
        />

        <Route
          path="/checkout"
          element={
            <MainLayout>
              <CheckoutPage />
            </MainLayout>
          }
        />

        {/* ADMIN ROUTES */}
        
        {/* Admin Login - Public */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Dashboard - Protected */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRouteAdmin>
              <AdminDashboard />
            </ProtectedRouteAdmin>
          }
        />

        {/* Admin Layout - Protected */}
        <Route
          path="/admin"
          element={
            <ProtectedRouteAdmin>
              <AdminPage />
            </ProtectedRouteAdmin>
          }
        >
          <Route
            path="products"
            element={<AdminProductsPage />}
          />

          <Route
            path="products/add"
            element={<AddProductPage />}
          />

          <Route
            path="orders"
            element={<AdminOrdersPage />}
          />

          <Route
            path="banners"
            element={<AdminBannersPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
