import { Link, useLocation } from 'react-router-dom';
import {
  AccountCircleOutlined,
  LocationOnOutlined,
  SettingsOutlined,
} from '@mui/icons-material';

const menuItems = [
  {
    to: '/settings/profile',
    label: 'Profile',
    icon: <AccountCircleOutlined className="m-1 scale-75" />,
  },
  {
    to: '/settings/account',
    label: 'Account',
    icon: <SettingsOutlined className="m-1 scale-75" />,
  },
  {
    to: '/settings/address',
    label: 'My Addresses',
    icon: <LocationOnOutlined className="m-1 scale-75" />,
  },
];

const SettingsSidePanel = () => {
  const location = useLocation();
  const ignoreLocations = [
    // '/settings/address/add-address',
    // '/settings/address/edit-address',
  ];
  const shouldIgnore = ignoreLocations.includes(location.pathname);

  if (shouldIgnore) return null;

  return (
    <ul
      className="flex h-full flex-col gap-1 border-neutral-600 bg-neutral-800 p-2 sm:w-auto lg:w-56 lg:p-2">
      {menuItems.map((item) => (
        <li key={item.to}>
          <Link
            to={item.to}
            className={`flex w-full items-center rounded-lg no-underline p-2 ${
              location.pathname === item.to
                ? 'bg-neutral-950 text-neutral-200'
                : 'text-neutral-500 hover:bg-neutral-900'
            }`}>
            <div className="flex items-center gap-2">
              <div
                className={`flex items-center justify-center text-xl lg:text-lg ${
                  location.pathname === item.to
                    ? 'text-neutral-400'
                    : 'text-neutral-500'
                }`}>
                {item.icon}
              </div>
              <div className="hidden pr-3 text-xs font-semibold sm:block lg:block">
                {item.label}
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SettingsSidePanel;
