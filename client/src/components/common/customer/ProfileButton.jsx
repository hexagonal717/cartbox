import {
  AccountCircleOutlined,
  ArrowBackIosOutlined,
  ExitToAppOutlined,
  ListAltOutlined,
} from '@mui/icons-material';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const ProfileButton = ({ userData, handleLogout }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <>
      <button
        className={`flex w-36 cursor-pointer items-center justify-evenly rounded-lg border-none
          bg-blue-500 bg-opacity-10 py-1.5 text-xs font-bold outline outline-1
          outline-blue-500/40 hover:bg-blue-500/15`}
        onClick={() => setDropdownVisible(!dropdownVisible)}>
        <div className={'ml-1 text-blue-500'}>{userData?.firstName || 'User'}</div>

        <div>
          {userData?.image ? (
            <img
              src={userData?.image}
              alt="User Avatar"
              className={'ml-1.5 h-6 w-6 rounded-full object-cover'}
            />
          ) : (
            <AccountCircleOutlined className={'ml-1.5 scale-90 text-blue-500'} />
          )}
        </div>

        <ArrowBackIosOutlined className={'-rotate-90 scale-50 text-blue-500'} />

        {dropdownVisible && (
          <div
            className={`absolute top-11 z-50 w-36 rounded-lg bg-black p-1 text-xs font-bold outline outline-1
            outline-white/15`}>
            <NavLink to={`/settings/profile`} className={'no-underline'}>
              <div
                className={`flex cursor-pointer items-center gap-3 rounded-md p-2 text-neutral-400
                hover:bg-neutral-900 hover:text-white`}>
                <AccountCircleOutlined className={'scale-75 text-neutral-100'} />
                <div>My Profile</div>
              </div>
            </NavLink>
            <NavLink to={`/orders`} className={'no-underline'}>
              <div
                className={`flex cursor-pointer items-center gap-3 rounded-md p-2 text-neutral-400
                hover:bg-neutral-900 hover:text-white`}>
                <ListAltOutlined className={'scale-75 text-neutral-100'} />
                <div>Orders</div>
              </div>
            </NavLink>
            <div
              onClick={handleLogout}
              className={`flex cursor-pointer items-center gap-3 rounded-md p-2 text-neutral-400
              hover:bg-neutral-900 hover:text-white`}>
              <ExitToAppOutlined className={'scale-75 text-neutral-100'} />
              <div>Logout</div>
            </div>
          </div>
        )}
      </button>
    </>
  );
};

export default ProfileButton;
