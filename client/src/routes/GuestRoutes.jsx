import { Route } from 'react-router-dom';
import HomePage from '../features/customer/pages/HomePage.jsx';
import LogInPage from '../features/customer/pages/LogInPage.jsx';
import SignUpPage from '../features/customer/pages/SignUpPage.jsx';
import ForgotPasswordPage from '../features/customer/pages/ForgotPasswordPage.jsx';
import VerifyOtpPage from '../features/customer/pages/VerifyOtpPage.jsx';
import ChangePasswordPage from '../features/customer/pages/ChangePasswordPage.jsx';
import ChangePasswordSuccessRedirect from '../features/customer/pages/ChangePasswordSuccessRedirect.jsx';
import ProductDetailPage from '../features/customer/pages/ProductDetailPage.jsx';
import CartPage from '../features/customer/pages/CartPage.jsx';
import CategoryPage from '../features/customer/pages/CategoryPage.jsx';
import SearchResultPage from '../features/customer/pages/SearchResultPage.jsx';
import AdminLogInPage from '../features/admin/pages/AdminLogInPage.jsx';
import AdminSignUpPage from '../features/admin/pages/AdminSignUpPage.jsx';
import GuestLayout from '../components/layouts/GuestLayout.jsx';
import SuperAdminLogInPage from '../features/superAdmin/pages/SuperAdminLogInPage.jsx';

const GuestRoutes = () => {
  return (
    <>
      <Route element={<GuestLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route
          path="/change-password-success-redirect"
          element={<ChangePasswordSuccessRedirect />}
        />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product-category" element={<CategoryPage />} />
        <Route path="/product-search" element={<SearchResultPage />} />
        <Route path="/admin-login" element={<AdminLogInPage />} />
        <Route path="/admin-signup" element={<AdminSignUpPage />} />
        <Route path="/super-admin-login" element={<SuperAdminLogInPage />} />
      </Route>
    </>
  );
};

export default GuestRoutes;
