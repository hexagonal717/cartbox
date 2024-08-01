import {
  AccountCircleOutlined,
  ArrowBackIosOutlined,
  ExitToAppOutlined,
  ListAltOutlined,
  ShoppingBagOutlined,
} from '@mui/icons-material';
import {
  useState,
} from 'react';
import {
  clearAccessToken,
} from '../../features/customer/redux/customerAuthSlice.js';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  getCustomerInfoByParams,
} from '../../api/customer/customerApi.js';
import {
  NavLink,
  useNavigate,
} from 'react-router-dom';
import {
  useQuery,
} from '@tanstack/react-query';

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
        bg-neutral-950 px-6 py-3 outline outline-1 outline-gray-800 backdrop-blur-sm"
    >
      <ul className={'flex list-none items-center justify-center gap-4'}>
        {token ? (
          <li className="relative">
            <button
              className={`flex w-36 cursor-pointer items-center justify-evenly rounded-lg border-none
                bg-blue-500 bg-opacity-10 py-1.5 text-xs font-bold outline outline-1
                outline-blue-500/40 hover:bg-blue-500/15`}
              onClick={() => setDropdownVisible(!dropdownVisible)}
            >
              <div className={'ml-1 text-blue-500'}>
                {userData?.firstName || 'User'}
              </div>

              <div>
                {userData?.image ? (
                  <img
                    src={userData?.image}
                    alt=""
                    className={'ml-1.5 h-6 w-6 rounded-full object-cover'}
                  />
                ) : (
                  <AccountCircleOutlined className="ml-1.5 scale-90 text-blue-500" />
                )}
              </div>

              <ArrowBackIosOutlined className="-rotate-90 scale-50 text-blue-500" />
            </button>
            {dropdownVisible && (
              <div
                className="absolute top-11 z-50 w-36 rounded-lg bg-black p-1 text-xs font-bold outline outline-1
                  outline-white/15"
              >
                <NavLink to="/settings/profile" className="no-underline">
                  <div
                    className="flex cursor-pointer items-center gap-3 rounded-md p-2 text-neutral-400
                      hover:bg-neutral-900 hover:text-white"
                  >
                    <AccountCircleOutlined className={'scale-75 text-neutral-100'} />
                    <div>My Profile</div>
                  </div>
                </NavLink>
                <NavLink to="/settings/profile" className="no-underline">
                  <div
                    className="flex cursor-pointer items-center gap-3 rounded-md p-2 text-neutral-400
                      hover:bg-neutral-900 hover:text-white"
                  >
                    <ListAltOutlined className={'scale-75 text-neutral-100'} />
                    <div>Orders</div>
                  </div>
                </NavLink>
                <div
                  onClick={handleLogout}
                  className="flex cursor-pointer items-center gap-3 rounded-md p-2 text-neutral-400
                    hover:bg-neutral-900 hover:text-white"
                >
                  <ExitToAppOutlined className={'scale-75 text-neutral-100'} />
                  <div>Logout</div>
                </div>
              </div>
            )}
          </li>
        ) : (
          <li>
            <button
              onClick={() => navigate('/login')}
              className="flex w-36 cursor-pointer items-center justify-center rounded-lg border-none
                bg-blue-500 bg-opacity-10 py-2.5 text-xs font-bold text-blue-500 outline outline-1
                outline-blue-900 hover:bg-blue-500/15"
            >
              Log In
            </button>
          </li>
        )}
        <li>
          <NavLink to={'/cart'}>
            <ShoppingBagOutlined className={'hover:cursor-pointer text-neutral-200'} />
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
