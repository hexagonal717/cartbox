import { useSelector } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';

import HomePage from './features/customer/pages/HomePage.jsx';
import LogInPage from './features/customer/pages/LogInPage.jsx';
import SignUpPage from './features/customer/pages/SignUpPage.jsx';
import ForgotPasswordPage from './features/customer/pages/ForgotPasswordPage.jsx';
import VerifyCodePage from './features/customer/pages/VerifyCodePage.jsx';
import ChangePasswordPage from './features/customer/pages/ChangePasswordPage.jsx';
import LogInRedirectPage from './features/customer/pages/LogInRedirectPage.jsx';
import ProductDetailPage from './features/customer/pages/ProductDetailPage.jsx';
import CartPage from './features/customer/pages/CartPage.jsx';
import CategoryPage from './features/customer/pages/CategoryPage.jsx';
import SearchResultPage from './features/customer/pages/SearchResultPage.jsx';
import AdminLogInPage from './features/admin/pages/AdminLogInPage.jsx';
import AdminSignUpPage from './features/admin/pages/AdminSignUpPage.jsx';
import ProtectedRoutes from './routes/ProtectedRoutes.jsx';
import GuestLayout from './components/layouts/GuestLayout.jsx';
import AdminLayout from './components/layouts/AdminLayout.jsx';
import AdminHomePage from './features/admin/pages/AdminHomePage.jsx';
import OverviewPage from './features/admin/pages/OverviewPage.jsx';
import ProductManagementPage from './features/admin/pages/ProductManagementPage.jsx';
import AdminSettingsPage from './features/admin/pages/AdminSettingsPage.jsx';
import AdminProfilePage from './features/admin/pages/AdminProfilePage.jsx';
import AccountSettings from './features/customer/pages/AccountSettings.jsx';
import CustomerLayout from './components/layouts/CustomerLayout.jsx';
import SettingsPage from './features/customer/pages/SettingsPage.jsx';
import ProfilePage from './features/customer/pages/ProfilePage.jsx';
import PaymentPage from './features/customer/pages/PaymentPage.jsx';
import AddressPage
  from './features/customer/pages/AddressPage.jsx';
import OrderDetailPage
  from './features/customer/pages/OrderDetailPage.jsx';
import OrdersPage
  from './features/customer/pages/OrdersPage.jsx';
import OrderSuccessPage
  from './features/customer/pages/OrderSuccessPage.jsx';
import SuperAdminHomePage
  from './features/superAdmin/pages/SuperAdminHomePage.jsx';
import SuperAdminSettingsPage
  from './features/superAdmin/pages/SuperAdminSettingsPage.jsx';
import SuperAdminProfilePage
  from './features/superAdmin/pages/SuperAdminProfilePage.jsx';
import SuperAdminAccountSettings
  from './features/superAdmin/pages/SuperAdminAccountSettings.jsx';

function App() {
  const customerToken = useSelector(
    (state) => state.customerAuthSlice.accessToken?.status,
  );
  const adminToken = useSelector(
    (state) => state.adminAuthSlice.accessToken?.status,
  );
  const superAdminToken = useSelector(
    (state) => state.superAdminAuthSlice.accessToken?.status,
  );

  const pageRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {!customerToken && !adminToken && !superAdminToken && (
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
        )}

        {/*Protected Routes*/}
        <Route element={<ProtectedRoutes />}>
          {/*Protected Redirected Routes*/}
          <>
            <Route path="/login" element={<Navigate to={'/'} />} />
            <Route path="/signup" element={<Navigate to={'/'} />} />
            <Route path="/admin-login" element={<Navigate to={'/'} />} />
            <Route path="/admin-signup" element={<Navigate to={'/'} />} />
            <Route path="/forgotpassword" element={<Navigate to={'/'} />} />
            <Route path="/verifycode" element={<Navigate to={'/'} />} />
            <Route path="/changepassword" element={<Navigate to={'/'} />} />
            <Route path="/loginredirectPage" element={<Navigate to={'/'} />} />
            <Route path="/payment" element={<Navigate to={'/'} />} />
            <Route path="/orders" element={<Navigate to={'/'} />} />
            {/*<Route path="/order-success" element={<Navigate to={'/'} />} />*/}
            <Route path="/settings" element={<Navigate to={'/'} />}>
              <Route path="settings/profile" element={<Navigate to={'/'} />} />
              <Route path="settings/account" element={<Navigate to={'/'} />} />
              <Route path="settings/address" element={<Navigate to={'/'} />} />
              <Route path="settings/address/add-address" element={<Navigate to={'/'} />} />
              <Route path="settings/address/edit-address" element={<Navigate to={'/'} />} />
            </Route>
          </>

          {/*Protected Admin Routes*/}
          {adminToken ? (
            <Route element={<AdminLayout />}>
              <Route path="/" element={<AdminHomePage />}>
                <Route path="overview" element={<OverviewPage />} />
                <Route
                  path="product-management"
                  element={<ProductManagementPage />}
                />
              </Route>
              <Route path="/settings" element={<AdminSettingsPage />}>
                <Route path="profile" element={<AdminProfilePage />} />
                <Route path="account" element={<AccountSettings />} />
              </Route>
            </Route>
          ) ? (
            <>
              {/*Protected Customer Routes*/}
              customerToken && (
              <Route element={<CustomerLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:productId" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/product-category" element={<CategoryPage />} />
                <Route path="/product-search" element={<SearchResultPage />} />
                <Route path="/payment/:id" element={<PaymentPage />} />
                <Route path="/orders/" element={<OrdersPage />} />
                <Route path="/order/:orderId" element={<OrderDetailPage />} />
                <Route path="/order-success" element={<OrderSuccessPage />} />
                <Route path="/settings" element={<SettingsPage />}>
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="account" element={<AccountSettings />} />
                  <Route path="address" element={<AddressPage />} />
                </Route>
              </Route>
              )
            </>
          ) : (
            <>
              {/*Protected Super Admin Routes*/}
              customerToken && (
              <Route element={<SuperAdminLayout />}>
                <Route path="/" element={<SuperAdminHomePage />}>
                  <Route path="overview" element={<OverviewPage />} />
                  <Route
                    path="product-management"
                    element={<ProductManagementPage />}
                  />
                </Route>
                <Route path="/settings" element={<SuperAdminSettingsPage />}>
                  <Route path="profile" element={<SuperAdminProfilePage />} />
                  <Route path="account" element={<SuperAdminAccountSettings />} />
                </Route>
              </Route>
              )
            </>
          ) :null





          }
        </Route>
      </Route>,
    ),
  );

  return <RouterProvider router={pageRouter} />;
}

export default App;
