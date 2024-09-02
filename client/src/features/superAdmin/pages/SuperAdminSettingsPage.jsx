import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import SuperAdminProfilePage from './SuperAdminProfilePage.jsx';
import SuperAdminAccountSettings from './SuperAdminAccountSettings.jsx';
import SettingsSidePanel from '../../../components/common/admin/SettingsSidePanel.jsx';

const SuperAdminSettingsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/settings/profile', { replace: true });
  }, [navigate]);

  return (
    <div className="grid h-screen w-screen grid-cols-[auto,1fr] items-center justify-center">
      <SettingsSidePanel />
      {location.pathname === '/settings/profile' && <SuperAdminProfilePage />}
      {location.pathname === '/settings/account' && <SuperAdminAccountSettings />}
    </div>
  );
};

export default SuperAdminSettingsPage;
