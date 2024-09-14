import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import DashboardSidePanel from '../../../components/common/admin/DashboardSidePanel.jsx';

const AdminHomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === ('/overview' && '/')) {
      navigate('/overview');
    } else if (location.pathname === '/product-management') {
      navigate('/product-management');
    }
  }, [location.pathname, navigate]);

  return (
    <div className="mt-16 grid h-full grid-rows-[auto,1fr] bg-neutral-50 dark:bg-neutral-900">
      <aside>
        <DashboardSidePanel />
      </aside>
      <div className="flex h-full w-auto flex-col pl-48">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminHomePage;
