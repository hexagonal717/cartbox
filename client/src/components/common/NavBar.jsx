import { ShoppingBagOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { clearAccessToken } from '../../features/customer/redux/customerAuthSlice.js';
import ProfileButton from './ProfileButton.jsx';

const NavBar = ({ user, cart }) => {
  const token = useSelector((state) => state.customerAuthSlice.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearAccessToken());
    navigate('/');
  };

  return (
    <div
      className="h-max-content fixed z-40 flex h-16 w-full select-none items-center justify-end
        bg-neutral-950 px-6 outline outline-1 outline-neutral-800 backdrop-blur-sm">
      <ul className="flex list-none items-center justify-center gap-4">
        <li>
          {' '}
          <Link to={'/'} replace>
            <div> Home</div>
          </Link>{' '}
        </li>
        <li>
          <input
            placeholder={'Search...'}
            className={`container h-10 w-96 rounded-lg border border-neutral-500 bg-neutral-900 px-2 text-xs
              outline-0 focus:border-neutral-200`}></input>
        </li>
        <li className="relative">
          {token ? (
            <ProfileButton userData={user} handleLogout={handleLogout} />
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="flex w-36 cursor-pointer items-center justify-center rounded-lg border-none
                bg-blue-500 bg-opacity-10 py-2.5 text-xs font-bold text-blue-500 outline outline-1
                outline-blue-900 hover:bg-blue-500/15">
              Log In
            </button>
          )}
        </li>
        <li>
          <NavLink to="/cart">
            <div className="relative">
              <ShoppingBagOutlined className="text-neutral-200 hover:cursor-pointer" />
              <div
                className="absolute flex h-4 w-4 -translate-y-8 translate-x-4 items-center justify-center
                  rounded-full bg-yellow-300 text-center text-xs font-semibold text-black">
                {cart?.length ?? 0}
              </div>
            </div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
