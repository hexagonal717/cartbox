import { block } from "million/react";

import { useSelector } from "react-redux";

import NavBar from "../components/NavBar/NavBar.jsx";
import { Outlet, useLocation } from "react-router-dom";

const Layout = block(() => {
  const userToken = useSelector((state) => state.loginSlice.accessToken);
  const location = useLocation();

  return (
    <>
      {!userToken ||
      location.pathname === "/settings/account" ||
      location.pathname === "/settings/profile" ? (
        <>
          <Outlet />
        </>
      ) : (
        <>
          <NavBar />
          <Outlet />
        </>
      )}
    </>
  );
});

export default Layout;
