import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import ScrollToTop from "../components/common/ScrollToTop";
import MainLayout from "../layouts/MainLayout";
import AdminLoginRoute from "./AdminLoginRoute";

// Public Pages
import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import AboutPage from "../pages/AboutPage";
import NotFoundPage from "../pages/NotFoundPage";
import SolutionDetailPage from "../pages/SolutionDetailPage";

// Blog Pages
import BlogListPage from "../pages/blog/BlogListPage";
import BlogDetailPage from "../pages/blog/BlogDetailPage";

// Ecosystem Pages
import LumiPage from "../pages/ecosystem/LumiPage";
import Hunonic from "../pages/ecosystem/HunonicPage";
import AqaraPage from "../pages/ecosystem/AqaraPage";
import SolutionsByHousePage from "../pages/projects/ProjectsPage";



// Admin Pages
import AdminPage from "../pages/AdminPage";
import AdminProductsPage from "../pages/admin/AdminProductsPage";
import AddProductPage from "../pages/admin/AddProductPage";
import EditProductPage from "../pages/admin/EditProductPage";
import AdminOrdersPage from "../pages/admin/AdminOrdersPage";
import AdminBannersPage from "../pages/admin/AdminBannersPage";
import AdminBlogListPage from "../pages/admin/AdminBlogListPage";
import AdminBlogFormPage from "../pages/admin/AdminBlogFormPage";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";

// Protected Route
import ProtectedRouteAdmin from "./ProtectedRouteAdmin";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
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

        <Route
          path="/about"
          element={
            <MainLayout>
              <AboutPage />
            </MainLayout>
          }
        />

        {/* ECOSYSTEM ROUTES */}
        <Route
          path="/ecosystem/lumi"
          element={
            <MainLayout>
              <LumiPage />
            </MainLayout>
          }
        />
        <Route
          path="/ecosystem/hunonic"
          element={
            <MainLayout>
              <Hunonic />
            </MainLayout>
          }
        />
        <Route
          path="/ecosystem/aqara"
          element={
            <MainLayout>
              <AqaraPage />
            </MainLayout>
          }
        />
        <Route
          path="/solutions-by-house"
          element={
            <MainLayout>
              <SolutionsByHousePage />
            </MainLayout>
          }
        />

        <Route
          path="/solutions"
          element={
            <MainLayout>
              <BlogListPage type="solution" />
            </MainLayout>
          }
        />
        <Route
          path="/solutions/:slug"
          element={
            <MainLayout>
              <BlogDetailPage />
            </MainLayout>
          }
        />

        {/* GUIDES ROUTES */}
        <Route
          path="/guides"
          element={
            <MainLayout>
              <BlogListPage type="guide" />
            </MainLayout>
          }
        />
        <Route
          path="/guides/:slug"
          element={
            <MainLayout>
              <BlogDetailPage />
            </MainLayout>
          }
        />

        {/* PROJECTS ROUTES */}
        <Route
          path="/projects"
          element={
            <MainLayout>
              <BlogListPage type="project" />
            </MainLayout>
          }
        />
        <Route
          path="/projects/:slug"
          element={
            <MainLayout>
              <BlogDetailPage />
            </MainLayout>
          }
        />

        {/* BLOG ROUTES */}
        <Route
          path="/blogs"
          element={
            <MainLayout>
              <BlogListPage type="blog" />
            </MainLayout>
          }
        />
        <Route
          path="/blogs/:slug"
          element={
            <MainLayout>
              <BlogDetailPage />
            </MainLayout>
          }
        />

        {/* ADMIN ROUTES */}
        
        {/* Admin Login - Public */}
        <Route
  path="/admin/login"
  element={
    <AdminLoginRoute>
      <AdminLogin />
    </AdminLoginRoute>
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
  <Route index element={<AdminDashboard />} />

  <Route
    path="dashboard"
    element={<AdminDashboard />}
  />

  <Route
    path="products"
    element={<AdminProductsPage />}
  />

  <Route
    path="products/add"
    element={<AddProductPage />}
  />

  <Route
    path="products/edit/:id"
    element={<EditProductPage />}
  />

  <Route
    path="orders"
    element={<AdminOrdersPage />}
  />

  <Route
    path="banners"
    element={<AdminBannersPage />}
  />

  <Route
    path="blogs"
    element={<AdminBlogListPage />}
  />

  <Route
    path="blogs/add"
    element={<AdminBlogFormPage />}
  />

  <Route
    path="blogs/edit/:id"
    element={<AdminBlogFormPage />}
  />
</Route>

        {/* 404 - Not Found */}
        <Route
          path="*"
          element={
            <MainLayout>
              <NotFoundPage />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
