import { block } from 'million/react';

import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../NavBar/NavBar.jsx';

const Layout = block(() => {
  // const userToken = useSelector((state) => state.customerAuthSlice.accessToken);
  const location = useLocation();
  //

  const ignoreLocations = ['/login', '/signup', '/forgotpassword', '/demo'];

  const shouldIgnore = ignoreLocations.includes(location.pathname);

  return (
    <>
      {!shouldIgnore && <NavBar />}
      <Outlet />
    </>
  );

  /*return (
        <>
            {!userToken ||
            // location.pathname === "/adminlogin" ||
            location.pathname === "/settings/account" ||
            location.pathname === "/settings/profile" ? (
                <>
                    <Outlet/>
                </>
            ) : (
                <>
                    <NavBar/>
                    <Outlet/>
                </>
            )}
        </>
    );*/
});

export default Layout;
