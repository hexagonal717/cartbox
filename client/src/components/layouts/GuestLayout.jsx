import { Outlet, useLocation } from 'react-router-dom';
import GuestNavBar from '../common/guest/GuestNavBar.jsx';
import { useDarkMode } from '@/context/DarkModeContext.jsx';

const GuestLayout = () => {
  const location = useLocation();

  const ignoreLocations = [
    '/login',
    '/signup',
    '/forgot-password',
    '/change-password',
    '/verify-otp',
    '/change-password-success-redirect',
    '/admin-login',
    '/super-admin-login',
    '/admin-signup',
    '/settings',
    '/settings/profile',
    '/settings/account',
  ];
  const shouldIgnore = ignoreLocations.includes(location.pathname);
  const { darkMode } = useDarkMode();
  return (
    <div className={`${darkMode && 'dark'} `}>
      <div className={'flex flex-col font-inter'}>
        {!shouldIgnore && <GuestNavBar />}
        <div
          className={
            'bg-neutral-100 text-neutral-950 dark:bg-neutral-900 dark:text-white'
          }>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default GuestLayout;
