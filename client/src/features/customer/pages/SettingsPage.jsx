import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useEffect } from 'react';

import SettingsSidePanel from '../../../components/common/customer/SettingsSidePanel.jsx';
import MobileSettingsPageNavBar
  from '@/components/common/customer/MobileSettingsPageNavBar.jsx';

const SettingsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === ('/settings' && '/')) {
      navigate('/profile');
    }
  }, [location.pathname, navigate]);

  return (
    <div className="flex h-full bg-neutral-50 dark:bg-neutral-900">
      <div>
        <MobileSettingsPageNavBar/>
      </div>
      <aside className={'hidden sm:block'}>
        <SettingsSidePanel />
      </aside>
      <div className="flex w-full py-8 sm:pl-[11.9rem]">
        <Outlet />
      </div>
    </div>
  );
};
export default SettingsPage;
