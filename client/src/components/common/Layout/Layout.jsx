import {block} from "million/react";

import {Outlet} from "react-router-dom";
import NavBar from "../NavBar/NavBar.jsx";

const Layout = block(() => {
    // const userToken = useSelector((state) => state.customerAuthSlice.accessToken);
    // const location = useLocation();
    //


    return <>
<NavBar></NavBar>
        <Outlet/>
    </>

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
