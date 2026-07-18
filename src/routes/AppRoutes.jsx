import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import ScrollToTop from "../components/common/ScrollToTop";
import MainLayout from "../layouts/MainLayout";
import AdminLoginRoute from "./AdminLoginRoute";
import AdminLayout from "../admin/layouts/AdminLayout";

// Public Pages
import HomePage from "../features/home/pages/HomePage";
import ProductsPage from "../features/products/pages/ProductsPage";
import ProductDetailPage from "../features/products/pages/ProductDetailPage";
import CartPage from "../features/cart/pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import AboutPage from "../pages/AboutPage";
import PolicyPage from "../pages/PolicyPage";
import ContactPage from "../pages/ContactPage";
import NotFoundPage from "../pages/NotFoundPage";
import SmartHomePage from "../pages/SmartHomePage";

// Blog Pages
import BlogListPage from "../features/blog/pages/BlogListPage";
import BlogDetailPage from "../features/blog/pages/BlogDetailPage";

// Ecosystem Pages
import LumiPage from "../pages/LumiPage";
import AqaraPage from "../pages/AqaraPage";
import AqaraEcosystemPage from "../pages/ecosystem/AqaraPage";
import LumiEcosystemPage from "../pages/ecosystem/LumiPage";



// Admin Pages
import AdminProductsPage from "../admin/pages/AdminProductsPage";
import AddProductPage from "../admin/pages/AddProductPage";
import EditProductPage from "../admin/pages/EditProductPage";
import AdminOrdersPage from "../admin/pages/AdminOrdersPage";
import AdminBannersPage from "../admin/pages/AdminBannersPage";
import AdminBlogListPage from "../admin/pages/AdminBlogListPage";
import AdminBlogFormPage from "../admin/pages/AdminBlogFormPage";
import AdminContactsPage from "../admin/pages/AdminContactsPage";
import AdminLogin from "../admin/pages/AdminLogin";
import AdminDashboard from "../admin/pages/AdminDashboard";

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
              <AboutPage/>
            </MainLayout>
          }
        />

        <Route
          path="/chinh-sach"
          element={
            <MainLayout>
              <PolicyPage />
            </MainLayout>
          }
        />

        <Route
          path="/contact"
          element={
            <MainLayout>
              <ContactPage />
            </MainLayout>
          }
        />

        {/* ECOSYSTEM ROUTES */}
        <Route
          path="/ecosystem/lumi"
          element={
            <MainLayout>
              <LumiEcosystemPage />
            </MainLayout>
          }
        />

        <Route
          path="/ecosystem/aqara"
          element={
            <MainLayout>
              <AqaraEcosystemPage />
            </MainLayout>
          }
        />
                <Route
          path="/products/lumi"
          element={
            <MainLayout>
              <LumiPage />
            </MainLayout>
          }
        />
                <Route
          path="/products/aqara"
          element={
            <MainLayout>
              <AqaraPage />
            </MainLayout>
          }
        />
        {/* <Route
          path="/solutions-by-house"
          element={
            <MainLayout>
              <SolutionsByHousePage />
            </MainLayout>
          }
        /> */}

        {/* SMART HOME OVERVIEW ROUTE */}
        <Route
          path="/smart-home"
          element={
            <MainLayout>
              <SmartHomePage />
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

        {/* Redirect /admin/* to NotFoundPage */}
        <Route
          path="/admin/*"
          element={<NotFoundPage />}
        />

        {/* Admin Login - Public */}
        <Route
          path="/qtvnmsmart/login"
          element={
            <AdminLoginRoute>
              <AdminLogin />
            </AdminLoginRoute>
          }
        />

        {/* Admin Layout - Protected */}
        <Route
          path="/qtvnmsmart"
          element={
            <ProtectedRouteAdmin>
              <AdminLayout />
            </ProtectedRouteAdmin>
          }
        >
          <Route index element={<AdminDashboard />} />

          <Route path="dashboard" element={<AdminDashboard />} />

          <Route path="products" element={<AdminProductsPage />} />
          <Route path="products/add" element={<AddProductPage />} />
          <Route path="products/edit/:id" element={<EditProductPage />} />

  <Route path="orders" element={<AdminOrdersPage />} />
  <Route path="banners" element={<AdminBannersPage />} />
  <Route path="contacts" element={<AdminContactsPage />} />

  <Route path="blogs" element={<AdminBlogListPage />} />
          <Route path="blogs/add" element={<AdminBlogFormPage />} />
          <Route path="blogs/edit/:id" element={<AdminBlogFormPage />} />
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
