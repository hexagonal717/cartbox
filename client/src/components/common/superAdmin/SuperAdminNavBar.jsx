import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearAccessToken } from '../../../features/admin/redux/adminAuthSlice.js';
import SuperAdminProfileButton
  from './SuperAdminProfileButton.jsx';

const SuperAdminNavBar = ({ user }) => {
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
          <Link to={'/overview'} replace>
            <div>Home</div>
          </Link>
        </li>
        <li className="relative">
          <SuperAdminProfileButton userData={user} handleLogout={handleLogout} />
        </li>
      </ul>
    </div>
  );
};

export default SuperAdminNavBar;
