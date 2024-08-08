import { Link, useLocation } from 'react-router-dom';
import { AccountCircleOutlined, SettingsOutlined } from '@mui/icons-material';

const menuItems = [
  { to: '/settings/profile', label: 'Profile', icon: <AccountCircleOutlined /> },
  { to: '/settings/account', label: 'Account', icon: <SettingsOutlined /> },
];

const SidePanel = () => {
  const location = useLocation();

  return (
    <ul
      className="fixed top-16 flex h-screen flex-col gap-1 border-neutral-600 bg-neutral-800 p-2
        lg:left-56 lg:w-56 lg:border-x lg:p-2">
      {menuItems.map((item) => (
        <li key={item.to}>
          <Link
            to={item.to}
            replace
            className={`flex w-full items-center rounded-lg no-underline ${
            location.pathname === item.to
                ? 'bg-neutral-950 text-neutral-200'
                : 'text-neutral-500 hover:bg-neutral-900'
            }`}>
            <div className="flex items-center gap-2 rounded-md p-2 lg:p-1">
              <div
                className={`scale-75 text-xl lg:text-lg ${
                location.pathname === item.to
                    ? 'text-neutral-400'
                    : 'text-neutral-500'
                }`}>
                {item.icon}
              </div>
              <div className="hidden text-xs font-semibold lg:block">
                {item.label}
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidePanel;
