import { Outlet, useLocation } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUser } from '@/api/v1/superAdmin/profile/profileApi.js';
import SuperAdminNavBar from '../common/superAdmin/SuperAdminNavBar.jsx';
import { useDarkMode } from '@/context/DarkModeContext.jsx';

const SuperAdminLayout = () => {
  const location = useLocation();
  const token = useSelector(
    (state) => state.superAdminAuthSlice.accessToken.payload,
  );

  const ignoreLocations = [
    '/login',
    '/signup',
    '/forgotpassword',
    '/super-admin-login',
    '/super-admin-signup',
    '/settings',
    '/settings/profile',
    '/settings/account',
  ];
  const shouldIgnore = ignoreLocations.includes(location.pathname);

  const [user, setUser] = useState(null);
  const { darkMode } = useDarkMode();

  const queries = useQueries({
    queries: [
      {
        queryKey: ['superAdminNavBarUserInfo', token?.superAdminId],
        queryFn: () => getUser(token.superAdminId),
        enabled: !!token,
      },
    ],
  });

  const [userQuery] = queries;

  useEffect(() => {
    if (userQuery.data) {
      setUser(userQuery.data);
    }
  }, [userQuery]);

  if (userQuery.isLoading) {
    return (
      <div
        className="h-max-content fixed z-40 flex h-16 w-full select-none items-center justify-end
          bg-neutral-950 px-6 outline outline-1 outline-gray-800 backdrop-blur-sm"></div>
    );
  }

  if (userQuery.error) {
    return <div>Error loading data: {userQuery.error?.message}</div>;
  }

  return (
    <div className={`${darkMode && 'dark'} flex h-screen flex-col`}>
      <div className="flex w-full flex-1 font-inter">
        {!shouldIgnore && (
          <SuperAdminNavBar user={user} />
        )}
        <div className="w-full overflow-y-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
