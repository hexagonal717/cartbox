import { Outlet, useLocation } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import NavBar from '../common/customer/NavBar.jsx';
import { getCart, getUser } from '../../api/v1/customer/customerApi.js';

const CustomerLayout = () => {
  const location = useLocation();
  const token = useSelector((state) => state.customerAuthSlice.accessToken);

  const ignoreLocations = [
    '/login',
    '/signup',
    '/forgotpassword',
    '/demo',
    '/admin-login',
    '/admin-signup',
    '/settings',
    '/settings/profile',
    '/settings/account',
    '/settings/address',
    '/settings/address/add-address',
    '/settings/address/edit-address',
  ];
  const shouldIgnore = ignoreLocations.includes(location.pathname);

  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);

  const queries = useQueries({
    queries: [
      {
        queryKey: ['navBarUser', token?.customerId],
        queryFn: () => getUser(token.customerId),
        enabled: !!token,
      },
      {
        queryKey: ['navBarCart', token?.customerId],
        queryFn: () =>
          getCart(token.customerId).then((data) => data.payload.cartItems),
        enabled: !!token,
      },
    ],
  });

  const [userQuery, cartQuery] = queries;

  useEffect(() => {
    if (userQuery.data) {
      setUser(userQuery.data);
    }
    if (cartQuery.data) {
      setCart(cartQuery.data);
    }
  }, [userQuery?.data, cartQuery?.data]);

  if (userQuery.isLoading || cartQuery.isLoading) {
    return (
      <div
        className="h-max-content fixed z-40 flex h-16 w-full select-none items-center justify-end
          bg-neutral-950 px-6 outline outline-1 outline-gray-800 backdrop-blur-sm"></div>
    );
  }

  if (userQuery.error || cartQuery.error) {
    return (
      <div>
        Error loading data: {userQuery.error?.message || cartQuery.error?.message}
      </div>
    );
  }

  return (
    <div className="flex flex-col font-inter">
      {!shouldIgnore && <NavBar user={user} cart={cart} />}
      <div>
        <Outlet data={cart} />
      </div>
    </div>
  );
};

export default CustomerLayout;
