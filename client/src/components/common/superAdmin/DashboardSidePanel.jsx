import { Link, useLocation } from 'react-router-dom';
import { AllInboxOutlined, DashboardOutlined } from '@mui/icons-material';

const menuItems = [
  {
    to: '/overview',
    label: 'Overview',
    icon: <DashboardOutlined className="m-1 scale-75" />,
  },
  {
    to: '/client-management',
    label: 'Manage Admins',
    icon: <AllInboxOutlined className="m-1 scale-75" />,
  },
];

const DashboardSidePanel = () => {
  const location = useLocation();

  return (
    <ul
      className="flex h-full flex-col gap-1 border-r border-neutral-700 bg-neutral-800 p-2 sm:w-auto
        lg:w-56 lg:p-2">
      {menuItems.map((item) => (
        <li key={item.to}>
          <Link
            to={item.to}
            // replace
            className={`flex w-full items-center rounded-lg no-underline ${
            location.pathname === item.to
                ? 'text-neutral-00 bg-neutral-950'
                : 'text-neutral-400 hover:bg-neutral-700'
            }`}>
            <div className="flex items-center gap-2 rounded-md p-2 text-center lg:p-1">
              <div
                className={`flex items-center justify-center text-xl lg:text-lg ${
                location.pathname === item.to
                    ? 'text-neutral-300'
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

export default DashboardSidePanel;
