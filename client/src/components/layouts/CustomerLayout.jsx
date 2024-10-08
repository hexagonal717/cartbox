import { Outlet, useLocation } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import NavBar from '../common/customer/NavBar.jsx';
import { getUser } from '@/api/v1/customer/profile/profileApi.js';
import { useDarkMode } from '@/context/DarkModeContext.jsx';
import { getCart } from '@/api/v1/customer/cart/cartActions.js';
const CustomerLayout = () => {
  const location = useLocation();
  const customerId = useSelector(
    (state) => state.customerAuthSlice.accessToken?.customerId,
  );
  const ignoreLocations = [
    '/login',
    '/signup',
    '/forgot-password',
    '/change-password',
    '/verify-otp',
    '/change-password-success-redirect',
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
  const { darkMode } = useDarkMode();
  const dispatch = useDispatch();

  const queries = useQueries({
    queries: [
      {
        queryKey: ['navBarUser', customerId],
        queryFn: () => getUser(customerId),
        enabled: !!customerId,
      },
    ],
  });

  const [userQuery] = queries;
  const cartItems = useSelector((state) => {
    if (customerId) {
      return state.cartSlice.cart?.items;
    } else {
      return state.guestCartSlice.cart?.items;
    }
  });
  useEffect(() => {
    if (userQuery.data) {
      setUser(userQuery.data);
      dispatch(getCart({ customerId: customerId }));
    }
  }, [userQuery.data, dispatch, customerId]);

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
        {!shouldIgnore && <NavBar user={user} cartItems={cartItems} />}
        <div className="w-full overflow-y-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CustomerLayout;
