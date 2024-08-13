import { Route } from 'react-router-dom';
import HomePage from '../features/customer/pages/HomePage.jsx';
import LogInPage from '../features/customer/pages/LogInPage.jsx';
import SignUpPage from '../features/customer/pages/SignUpPage.jsx';
import ForgotPasswordPage from '../features/customer/pages/ForgotPasswordPage.jsx';
import VerifyCodePage from '../features/customer/pages/VerifyCodePage.jsx';
import ChangePasswordPage from '../features/customer/pages/ChangePasswordPage.jsx';
import LogInRedirectPage from '../features/customer/pages/LogInRedirectPage.jsx';
import ProductDetailPage from '../features/customer/pages/ProductDetailPage.jsx';
import CartPage from '../features/customer/pages/CartPage.jsx';
import CategoryPage from '../features/customer/pages/CategoryPage.jsx';
import SearchResultPage from '../features/customer/pages/SearchResultPage.jsx';
import AdminLogInPage from '../features/admin/pages/AdminLogInPage.jsx';
import AdminSignUpPage from '../features/admin/pages/AdminSignUpPage.jsx';
import GuestLayout from '../components/layouts/GuestLayout.jsx';

const GuestRoutes = () => {
  return (
    <>
      <Route element={<GuestLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="/verifycode" element={<VerifyCodePage />} />
        <Route path="/changepassword" element={<ChangePasswordPage />} />
        <Route path="/loginredirectPage" element={<LogInRedirectPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product-category" element={<CategoryPage />} />
        <Route path="/product-search" element={<SearchResultPage />} />
        <Route path="/admin-login" element={<AdminLogInPage />} />
        <Route path="/admin-signup" element={<AdminSignUpPage />} />
      </Route>
    </>
  );
};

export default GuestRoutes;
