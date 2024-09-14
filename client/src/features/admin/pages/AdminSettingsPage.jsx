import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import SettingsSidePanel from '../../../components/common/admin/SettingsSidePanel.jsx';

const SuperAdminSettingsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/settings/profile', { replace: true });
  }, [navigate]);

  return (
    <div className="flex h-full bg-neutral-50 dark:bg-neutral-900">
      <aside>
        <SettingsSidePanel />
      </aside>
      <div className="flex w-full py-8 pl-[11.9rem]">
        <Outlet />
      </div>
    </div>
  );
};

export default SuperAdminSettingsPage;
