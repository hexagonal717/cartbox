import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearAccessToken } from '@/features/superAdmin/redux/superAdminAuthSlice.js';

import { Button } from '@/components/ui-custom/button.jsx';
import { Moon, Sun } from 'lucide-react';
import SuperAdminProfileButton from '@/components/common/superAdmin/SuperAdminProfileButton.jsx';
import { useDarkMode } from '@/context/DarkModeContext.jsx';
const SuperAdminNavBar = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();

  const handleLogout = () => {
    dispatch(clearAccessToken());
    navigate('/');
  };

  return (
    <div
      className="fixed z-40 flex h-16 w-full select-none items-center bg-neutral-50 px-6 outline
        outline-1 outline-neutral-300 backdrop-blur-sm dark:bg-neutral-950
        dark:outline-neutral-800">
      <ul className="flex w-full list-none items-center justify-between gap-4">
        <li>
          <Link to={'/'} replace>
            <div className={'text text-lg font-bold dark:text-white'}>CartBox</div>
          </Link>
        </li>
        <li className={'flex items-center justify-center gap-3'}>
          <div className="relative">
            <SuperAdminProfileButton userData={user} handleLogout={handleLogout} />
          </div>

          <div className="relative">
            <Button
              variant={'outline'}
              onClick={toggleDarkMode}
              className={'rounded-lg p-2'}>
              {darkMode ? (
                <Moon className={'scale-75'} />
              ) : (
                <Sun className={'scale-75'} />
              )}
            </Button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SuperAdminNavBar;
