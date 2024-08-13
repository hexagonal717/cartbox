import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const customerToken = useSelector(
    (state) => state.customerAuthSlice.accessToken?.status,
  );
  const adminToken = useSelector(
    (state) => state.adminAuthSlice.accessToken?.status,
  );

  return (customerToken || adminToken) === 'success' ? (
    <Outlet />
  ) : (
    <Navigate to={'/'} />
  );
};

export default ProtectedRoutes;
