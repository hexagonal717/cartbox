import { useSelector } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import ProtectedRoutes from './routes/ProtectedRoutes.jsx';
import ProtectedAdminRoutes from './routes/ProtectedAdminRoutes.jsx';
import ProtectedCustomerRoutes from './routes/ProtectedCustomerRoutes.jsx';
import ProtectedSuperAdminRoutes from './routes/ProtectedSuperAdminRoutes.jsx';
import ProtectedRedirectedRoutes from './routes/ProtectedRedirectedRoutes.jsx';
import GuestRoutes from './routes/GuestRoutes.jsx';

function App() {
  const customerToken = useSelector(
    (state) => state.customerAuthSlice.accessToken?.status,
  );
  const adminToken = useSelector(
    (state) => state.adminAuthSlice.accessToken?.status,
  );
  const superAdminToken = useSelector(
    (state) => state.superAdminAuthSlice.accessToken?.status,
  );

  const pageRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {!customerToken && !adminToken && !superAdminToken && GuestRoutes()}

        {/*Protected Routes*/}
        <Route element={<ProtectedRoutes />}>
          {/*Protected Redirected Routes*/}
          {ProtectedRedirectedRoutes()}

          {/*Protected Admin Routes*/}
          {adminToken && ProtectedAdminRoutes()}

          {/*Protected Customer Routes*/}
          {customerToken && ProtectedCustomerRoutes()}

          {/*Protected Super Admin Routes*/}
          {superAdminToken && ProtectedSuperAdminRoutes()}
        </Route>
      </Route>,
    ),
  );

  return <RouterProvider router={pageRouter} />;
}

export default App;
