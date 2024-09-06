import { Outlet, useLocation } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import AdminNavBar from '../common/admin/AdminNavBar.jsx';
import { getUser } from '../../api/v1/admin/adminApi.js';

const AdminLayout = () => {
  const location = useLocation();
  const token = useSelector((state) => state.adminAuthSlice.accessToken);

  const ignoreLocations = [
    '/login',
    '/signup',
    '/forgotpassword',
    '/admin-login',
    '/admin-signup',
    '/settings',
    '/settings/profile',
    '/settings/account',
  ];
  const shouldIgnore = ignoreLocations.includes(location.pathname);

  const [user, setUser] = useState(null);

  const queries = useQueries({
    queries: [
      {
        queryKey: ['adminNavBarUserInfo', token?.adminId],
        queryFn: () => getUser(token.adminId),
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
    <div className="flex font-inter">
      {!shouldIgnore && <AdminNavBar user={user} />}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
