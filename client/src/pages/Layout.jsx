import {Outlet} from "react-router-dom";
import {block} from "million/react";

const Layout = block(() => {
    return (
        <>
            <Outlet/>
        </>
    );
});

export default Layout;
