import { ShoppingBagOutlined } from '@mui/icons-material';
import { useQueries } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { getCart, getUser } from '../../api/customer/customerApi.js';
import { clearAccessToken } from '../../features/customer/redux/customerAuthSlice.js';
import ProfileButton from './ProfileButton.jsx';
import { useEffect } from 'react';

const NavBar = () => {
  const token = useSelector((state) => state.customerAuthSlice.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(clearAccessToken());
    navigate('/');
  }

  // Run multiple queries in parallel
  const queries = useQueries({
    queries: [
      {
        queryKey: ['navBarUser', token?.customerId],
        queryFn: () => getUser(token.customerId).then((data) => data),
        enabled: !!token,
      },
      {
        queryKey: ['navBarCart', token?.customerId],
        queryFn: () => getCart(token.customerId).then((data) => data.payload.cart),
        enabled: !!token,
      },
    ],
  });

  const [userQuery, cartQuery] = queries;

  useEffect(() => {}, []);

  if (userQuery?.isLoading || cartQuery?.isLoading) {
    return (
      <div
        className={`h-max-content fixed z-40 flex h-16 w-full select-none items-center justify-end
          bg-neutral-950 px-6 outline outline-1 outline-gray-800 backdrop-blur-sm`}
      ></div>
    );
  }

  if (userQuery?.error || cartQuery?.error) {
    return (
      <div>
        Error loading data: {userQuery?.error.message || cartQuery?.error.message}
      </div>
    );
  }

  const user = userQuery.data;
  const cart = cartQuery.data;

  console.log(cart, 'LLLL');

  return (
    <div
      className={`h-max-content fixed z-40 flex h-16 w-full select-none items-center justify-end
        bg-neutral-950 px-6 outline outline-1 outline-gray-800 backdrop-blur-sm`}
    >
      <ul className={'flex list-none items-center justify-center gap-4'}>
        <li className={'relative'}>
          {token ? (
            <ProfileButton userData={user} handleLogout={handleLogout} />
          ) : (
            <button
              onClick={() => navigate('/login')}
              className={`flex w-36 cursor-pointer items-center justify-center rounded-lg border-none
                bg-blue-500 bg-opacity-10 py-2.5 text-xs font-bold text-blue-500 outline outline-1
                outline-blue-900 hover:bg-blue-500/15`}
            >
              Log In
            </button>
          )}
        </li>

        <li>
          <NavLink to={'/cart'}>
            <div className={'relative'}>
              <ShoppingBagOutlined
                className={'text-neutral-200 hover:cursor-pointer'}
              />
              <div
                className={`absolute flex h-4 w-4 -translate-y-8 translate-x-4 items-center justify-center
                  rounded-full bg-yellow-300 text-center text-xs font-semibold text-black`}
              >
                {cart?.length}
              </div>
            </div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
