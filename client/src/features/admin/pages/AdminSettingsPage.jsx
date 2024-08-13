import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AdminProfilePage from './AdminProfilePage.jsx';
import AdminAccountSettings from './AdminAccountSettings.jsx';
import SettingsSidePanel from '../../../components/common/admin/SettingsSidePanel.jsx';

const AdminSettingsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/settings/profile', { replace: true });
  }, [navigate]);

  return (
    <div className="grid h-screen w-screen grid-cols-[auto,1fr] items-center justify-center">
      <SettingsSidePanel />
      {location.pathname === '/settings/profile' && <AdminProfilePage />}
      {location.pathname === '/settings/account' && <AdminAccountSettings />}
    </div>
  );
};

export default AdminSettingsPage;
