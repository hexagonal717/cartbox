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
    <div className="fixed bg-neutral-950 backdrop-blur-sm h-max-content w-full p-3 z-50 flex justify-end items-center outline outline-1 outline-gray-800 select-none">
      <ul className="list-none">
        {token ? (
          <li className="relative">
            <button
              className="flex gap-4 font-bold items-center bg-blue-500 bg-opacity-10 border-none px-4 py-2 rounded-lg outline outline-1 outline-blue-500/40 hover:bg-blue-500/15 cursor-pointer"
              onClick={() => setDropdownVisible(!dropdownVisible)}
            >
              <div className="text-blue-500">
                {userData?.firstName || 'Profile'}
              </div>
              <div className="flex justify-center items-center">
                <AccountCircleOutlined className="text-xl text-blue-500" />
                <ArrowBackIosOutlined className="ml-2 text-xs text-blue-500 rotate-90" />
              </div>
            </button>
            {dropdownVisible && (
              <div className="absolute right-4 top-12 p-3 text-sm font-bold bg-black rounded-lg shadow-md z-50 overflow-hidden outline outline-1 outline-white/15">
                <NavLink to="/settings/profile" className="no-underline">
                  <div className="flex gap-3 p-2 text-gray-400 rounded-md cursor-pointer hover:bg-gray-900 hover:text-white">
                    <AccountCircleOutlined className="text-lg text-white" />
                    <div>My Profile</div>
                  </div>
                </NavLink>
                <NavLink to="/settings/profile" className="no-underline">
                  <div className="flex gap-3 p-2 text-gray-400 rounded-md cursor-pointer hover:bg-gray-900 hover:text-white">
                    <ListAltOutlined className="text-lg text-white" />
                    <div>Orders</div>
                  </div>
                </NavLink>
                <div
                  onClick={handleLogout}
                  className="flex gap-3 p-2 text-gray-400 rounded-md cursor-pointer hover:bg-gray-900 hover:text-white"
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
              className="flex items-center text-sm font-bold bg-blue-500 bg-opacity-10 border-none px-4 py-2 rounded-lg outline outline-1 outline-blue-900 text-blue-500 hover:bg-blue-500/15 cursor-pointer"
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
