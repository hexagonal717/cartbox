import { ShoppingBagOutlined } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { getUser } from '../../api/customer/customerApi.js';
import { clearAccessToken } from '../../features/customer/redux/customerAuthSlice.js';
import ProfileButton from './ProfileButton.jsx';

const NavBar = () => {
  const token = useSelector((state) => state.customerAuthSlice.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(clearAccessToken());
    navigate('/');
  }

  const { status, data: userData } = useQuery({
    queryKey: ['userInfo', token?.customerId],
    queryFn: () =>
      getUser(token.customerId).then((data) => {
        console.log('last checking', data);
        return data;
      }),
    enabled: !!token,
  });

  if (status === 'loading') return <h1>Loading...</h1>;

  console.log(userData?.name, 'dsad');
  return (
    <div
      className={`h-max-content fixed z-40 flex w-full select-none items-center justify-end
        bg-neutral-950 px-6 py-3 outline outline-1 outline-gray-800 backdrop-blur-sm`}
    >
      <ul className={'flex list-none items-center justify-center gap-4'}>
        <li className={'relative'}>
          {token ? (
            <ProfileButton userData={userData} handleLogout={handleLogout} />
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
            <ShoppingBagOutlined
              className={'text-neutral-200 hover:cursor-pointer'}
            />
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
