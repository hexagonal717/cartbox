import { Outlet, useLocation } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import NavBar from '../common/customer/NavBar.jsx';
import {  getUser } from '@/api/v1/customer/customerApi.js';
import { useDarkMode } from '@/context/DarkModeContext.jsx';
import {
  getCart
} from '@/api/v1/customer/cart/cartActions.js';
const CustomerLayout = () => {
  const location = useLocation();
  const customerId = useSelector((state) => state.customerAuthSlice.accessToken?.customerId);
  const cartItems = useSelector((state) => state.cartSlice.cart?.items);
  const { darkMode } = useDarkMode();
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
    return (
      <div>
        Error loading data: {userQuery.error?.message}
      </div>
    );
  }

  return (
    <div className={`${darkMode && 'dark'} `}>
      <div className="flex flex-col font-inter">
        {!shouldIgnore && <NavBar user={user} cartItems={cartItems} />}
        <div
          className={
            'bg-neutral-100 text-neutral-950 dark:bg-neutral-900 dark:text-white'
          }>
          <Outlet cart={cartItems} />
        </div>
      </div>
    </div>
  );
};

export default CustomerLayout;
