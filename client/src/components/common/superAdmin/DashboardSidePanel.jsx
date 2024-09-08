import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui-custom/super-admin/button.jsx';
import { LayoutDashboard, UsersRound } from 'lucide-react';
import { AllInboxOutlined } from '@mui/icons-material';

const menuItems = [
  {
    to: '/overview',
    label: 'Overview',
    icon: <LayoutDashboard className="scale-[65%]" />,
  },
  {
    to: '/client-management',
    label: 'Manage Admins',
    icon: <UsersRound className="scale-[65%]" />,
  },
  {
    to: '/product-management',
    label: 'Manage Products',
    icon: <AllInboxOutlined className="scale-[65%]" />,
  },
];

const DashboardSidePanel = () => {
  const location = useLocation(); // Get the current route

  return (
    <ul
      className="fixed z-30 flex h-full w-48 flex-col gap-1 border-r bg-white p-2
        dark:border-neutral-800 dark:bg-neutral-950">
      {menuItems.map((item) => (
        <li key={item.to}>
          <Link to={item.to} className={'flex w-full no-underline'}>
            <Button
              variant={location.pathname === item.to ? 'default' : 'ghost'} // Highlight active item
              className={`flex w-full items-center justify-start gap-2 rounded-md ${
              location.pathname === item.to
                  ? 'bg-neutral-800 text-white' // Add active styling
                  : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900'
              }`}>
              <div className={'flex'}>{item.icon}</div>
              <div className="pr-3 text-xs font-semibold sm:block lg:block">
                {item.label}
              </div>
            </Button>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default DashboardSidePanel;
