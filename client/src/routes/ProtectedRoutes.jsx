import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const customerToken = useSelector(
    (state) => state.customerAuthSlice.accessToken?.status,
  );
  const adminToken = useSelector(
    (state) => state.adminAuthSlice.accessToken?.status,
  );

  const superAdminToken = useSelector(
    (state) => state.superAdminAuthSlice.accessToken?.status,
  );

  return (customerToken || adminToken || superAdminToken) === 'success' ? (
    <Outlet />
  ) : (
    <Navigate to={'/'} />
  );
};

export default ProtectedRoutes;
