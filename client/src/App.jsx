import { useSelector } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Layout from './components/common/Layout.jsx';
import AccountSettings from './features/customer/pages/AccountSettings.jsx';
import CartPage from './features/customer/pages/CartPage.jsx';
import ChangePasswordPage from './features/customer/pages/ChangePasswordPage.jsx';
import DemoPage from './features/customer/pages/DemoPage.jsx';
import ForgotPasswordPage from './features/customer/pages/ForgotPasswordPage.jsx';
import HomePage from './features/customer/pages/HomePage.jsx';
import LogInPage from './features/customer/pages/LogInPage.jsx';
import LogInRedirectPage from './features/customer/pages/LogInRedirectPage.jsx';
import ProductDetailPage from './features/customer/pages/ProductDetailPage.jsx';
import ProfilePage from './features/customer/pages/ProfilePage.jsx';
import SettingsPage from './features/customer/pages/SettingsPage.jsx';
import SignUpPage from './features/customer/pages/SignUpPage.jsx';
import VerifyCodePage from './features/customer/pages/VerifyCodePage.jsx';

function App() {
  const customerToken = useSelector((state) => state.customerAuthSlice.accessToken);

  if (customerToken) {
    var loginStatus = customerToken.success;
  }
  // if (adminToken) {
  //     var adminLoginStatus = adminToken.success;
  // }
  const pageRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="/verifycode" element={<VerifyCodePage />} />
        <Route path="/changepassword" element={<ChangePasswordPage />} />
        <Route path="/loginredirectPage" element={<LogInRedirectPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route
          path="/settings"
          element={loginStatus ? <SettingsPage /> : <LogInPage />}>
          <Route
            path="profile"
            element={loginStatus ? <ProfilePage /> : <LogInPage />}
          />
          <Route
            path="account"
            element={loginStatus ? <AccountSettings /> : <LogInPage />}
          />
        </Route>
      </Route>,
    ),
  );

  return <RouterProvider router={pageRouter} />;
}

export default App;
