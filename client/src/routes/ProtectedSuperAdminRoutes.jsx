import { Route } from 'react-router-dom';
import SuperAdminLayout from '../components/layouts/SuperAdminLayout.jsx';
import SuperAdminOverviewPage from '../features/superAdmin/pages/SuperAdminOverviewPage.jsx';
import SuperAdminSettingsPage from '../features/superAdmin/pages/SuperAdminSettingsPage.jsx';
import SuperAdminProfilePage from '../features/superAdmin/pages/SuperAdminProfilePage.jsx';
import SuperAdminAccountSettings from '../features/superAdmin/pages/SuperAdminAccountSettings.jsx';
import SuperAdminHomePage from '../features/superAdmin/pages/SuperAdminHomePage.jsx';
import ClientManagementPage from '@/features/superAdmin/pages/ClientManagementPage.jsx';
import ProductManagementPage from '@/features/superAdmin/pages/ProductManagementPage.jsx';

const ProtectedAdminRoutes = () => {
  return (
    <Route element={<SuperAdminLayout />}>
      <Route path="/" element={<SuperAdminHomePage />}>
        <Route path="overview" element={<SuperAdminOverviewPage />} />
        <Route path="client-management" element={<ClientManagementPage />} />
        <Route path="product-management" element={<ProductManagementPage />} />
      </Route>
      <Route path="/settings" element={<SuperAdminSettingsPage />}>
        <Route path="profile" element={<SuperAdminProfilePage />} />
        <Route path="account" element={<SuperAdminAccountSettings />} />
      </Route>
    </Route>
  );
};

export default ProtectedAdminRoutes;
