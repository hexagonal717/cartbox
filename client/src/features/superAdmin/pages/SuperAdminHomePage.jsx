
import SuperAdminOverviewPage from './SuperAdminOverviewPage.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import DashboardSidePanel from '../../../components/common/admin/DashboardSidePanel.jsx';

const SuperAdminHomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === ('/overview' && '/')) {
      navigate('/overview');
    } /*else if (location.pathname === '/product-management') {
      navigate('/product-management');
    }*/
  }, [location.pathname, navigate]);

  return (
    <div className="grid h-screen w-screen grid-cols-[auto,1fr] items-center justify-center pt-16">
      <DashboardSidePanel />
      {location.pathname === '/overview' && <SuperAdminOverviewPage />}
      {/*{location.pathname === '/product-management' && <AdminManagementPage />}*/}
    </div>
  );
};

export default SuperAdminHomePage;
