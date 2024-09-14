import { Route } from 'react-router-dom';
import AdminLayout from '../components/layouts/AdminLayout.jsx';
import AdminHomePage from '../features/admin/pages/AdminHomePage.jsx';
import OverviewPage from '../features/admin/pages/OverviewPage.jsx';
import ProductManagementPage from '../features/admin/pages/ProductManagementPage.jsx';
import AdminSettingsPage from '../features/admin/pages/AdminSettingsPage.jsx';
import AdminProfilePage from '../features/admin/pages/AdminProfilePage.jsx';
import AdminAccountSettings from '@/features/admin/pages/AdminAccountSettings.jsx';

const ProtectedAdminRoutes = () => {
  return (
    <Route element={<AdminLayout />}>
      <Route path="/" element={<AdminHomePage />}>
        <Route path="overview" element={<OverviewPage />} />
        <Route path="product-management" element={<ProductManagementPage />} />
      </Route>
      <Route path="/settings" element={<AdminSettingsPage />}>
        <Route path="profile" element={<AdminProfilePage />} />
        <Route path="account" element={<AdminAccountSettings />} />
      </Route>
    </Route>
  );
};

export default ProtectedAdminRoutes;
