import { Route } from 'react-router-dom';
import CustomerLayout from '../components/layouts/CustomerLayout.jsx';
import HomePage from '../features/customer/pages/HomePage.jsx';
import ProductDetailPage from '../features/customer/pages/ProductDetailPage.jsx';
import CartPage from '../features/customer/pages/CartPage.jsx';
import CategoryPage from '../features/customer/pages/CategoryPage.jsx';
import SearchResultPage from '../features/customer/pages/SearchResultPage.jsx';
import SettingsPage from '../features/customer/pages/SettingsPage.jsx';
import ProfilePage from '../features/customer/pages/ProfilePage.jsx';
import AccountSettings from '../features/customer/pages/AccountSettings.jsx';
import PaymentPage from '../features/customer/pages/PaymentPage.jsx';
import OrdersPage from '../features/customer/pages/OrdersPage.jsx';
import OrderDetailPage from '../features/customer/pages/OrderDetailPage.jsx';
import OrderSuccessPage from '../features/customer/pages/OrderSuccessPage.jsx';
import AddressPage from '../features/customer/pages/AddressPage.jsx';

const ProtectedCustomerRoutes = () => {
  return (
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
  );
};

export default ProtectedCustomerRoutes;
