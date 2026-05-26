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

// Admin Pages
import AdminPage from "../pages/AdminPage";

import AdminProductsPage from "../pages/admin/AdminProductsPage";

import AddProductPage from "../pages/admin/AddProductPage";

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

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={<AdminPage />}
        />

        <Route
          path="/admin/products"
          element={
            <AdminProductsPage />
          }
        />

        <Route
          path="/admin/products/add"
          element={<AddProductPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;