import { useLocation, useNavigate } from 'react-router-dom';

import { useEffect } from 'react';

import ProfilePage from './ProfilePage.jsx';
import AccountSettings from './AccountSettings.jsx';
import SettingsSidePanel from '../../../components/common/customer/SettingsSidePanel.jsx';
import AddressPage from './AddressPage.jsx';

const SettingsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === ('/settings' && '/')) {
      navigate('/profile');
    }
  }, [location.pathname, navigate]);

  return (
    <div className="grid h-screen w-screen grid-cols-[auto,1fr] items-center justify-center">
      <SettingsSidePanel />
      {location.pathname === '/settings/profile' && <ProfilePage />}
      {location.pathname === '/settings/account' && <AccountSettings />}
      {location.pathname === '/settings/address' && <AddressPage />}
    </div>
  );
};
export default SettingsPage;
