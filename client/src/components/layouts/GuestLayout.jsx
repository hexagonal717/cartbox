import { Outlet, useLocation } from 'react-router-dom';
import GuestNavBar from '../common/guest/GuestNavBar.jsx';

const GuestLayout = () => {
  const location = useLocation();

  const ignoreLocations = [
    '/login',
    '/signup',
    '/forgotpassword',
    '/admin-login',
    '/super-admin-login',
    '/admin-signup',
    '/settings',
    '/settings/profile',
    '/settings/account',
  ];
  const shouldIgnore = ignoreLocations.includes(location.pathname);

  return (
    <div className={'font-inter'}>
      {!shouldIgnore && <GuestNavBar />}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default GuestLayout;
