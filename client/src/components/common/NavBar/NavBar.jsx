import {
  AccountCircleOutlined,
  ArrowBackIosOutlined,
  ExitToAppOutlined,
  ListAltOutlined,
} from '@mui/icons-material';
import { useState } from 'react';
import { clearAccessToken } from '../../../features/customer/redux/customerAuthSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerInfoByParams } from '../../../api/customer/customerApi.js';
import { NavLink, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const NavBar = () => {
  const token = useSelector((state) => state.customerAuthSlice.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  function handleLogout() {
    dispatch(clearAccessToken());
    navigate('/');
  }

  const {
    status,
    error,
    data: userData,
  } = useQuery({
    queryKey: ['customerData', token?.customerId],
    queryFn: () =>
      getCustomerInfoByParams(token.customerId).then((data) => {
        console.log('last checking', data);
        return data;
      }),
    enabled: !!token, // Only run the query if the token is present
  });

  if (status === 'loading') return <h1>Loading...</h1>;
  if (status === 'error') return <h1>{JSON.stringify(error)}</h1>;

  return (
    <div
      className="h-max-content fixed z-50 flex w-full select-none items-center justify-end
        bg-neutral-950 p-3 outline outline-1 outline-gray-800 backdrop-blur-sm"
    >
      <ul className="list-none">
        {token ? (
          <li className="relative">
            <button
              className="flex cursor-pointer items-center gap-4 rounded-lg border-none bg-blue-500
                bg-opacity-10 px-4 py-2 font-bold outline outline-1 outline-blue-500/40
                hover:bg-blue-500/15"
              onClick={() => setDropdownVisible(!dropdownVisible)}
            >
              <div className="text-blue-500">
                {userData?.firstName || 'Profile'}
              </div>
              <div className="flex items-center justify-center">
                <AccountCircleOutlined className="text-xl text-blue-500" />
                <ArrowBackIosOutlined className="ml-2 rotate-90 text-xs text-blue-500" />
              </div>
            </button>
            {dropdownVisible && (
              <div
                className="absolute right-4 top-12 z-50 overflow-hidden rounded-lg bg-black p-3 text-sm
                  font-bold shadow-md outline outline-1 outline-white/15"
              >
                <NavLink to="/settings/profile" className="no-underline">
                  <div
                    className="flex cursor-pointer gap-3 rounded-md p-2 text-gray-400 hover:bg-gray-900
                      hover:text-white"
                  >
                    <AccountCircleOutlined className="text-lg text-white" />
                    <div>My Profile</div>
                  </div>
                </NavLink>
                <NavLink to="/settings/profile" className="no-underline">
                  <div
                    className="flex cursor-pointer gap-3 rounded-md p-2 text-gray-400 hover:bg-gray-900
                      hover:text-white"
                  >
                    <ListAltOutlined className="text-lg text-white" />
                    <div>Orders</div>
                  </div>
                </NavLink>
                <div
                  onClick={handleLogout}
                  className="flex cursor-pointer gap-3 rounded-md p-2 text-gray-400 hover:bg-gray-900
                    hover:text-white"
                >
                  <ExitToAppOutlined className="text-lg text-white" />
                  <div>Logout</div>
                </div>
              </div>
            )}
          </li>
        ) : (
          <li>
            <button
              onClick={() => navigate('/login')}
              className="flex cursor-pointer items-center rounded-lg border-none bg-blue-500
                bg-opacity-10 px-4 py-2 text-sm font-bold text-blue-500 outline outline-1
                outline-blue-900 hover:bg-blue-500/15"
            >
              Log In
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
