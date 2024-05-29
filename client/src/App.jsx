import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider,} from "react-router-dom";
import Layout from "./Pages/Layout.jsx";
import Home from "./Pages/Home/Home.jsx";
import SignUp from "./Pages/SignUp/SignUp.jsx";
import {useSelector} from "react-redux";
import Login from "./Pages/Login/Login.jsx";

function App() {
    const data = useSelector((state) => state.loginSlice.accessTokenList);

    if (data) {
        var loginStatus = data.success
    }

    console.log(data, "fffffffffffffffffffffffffffffffff")

    const pageRouter = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Layout/>}>
                <Route index element={loginStatus ? <Home/> : <Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>
            </Route>,
        ),
    );

    return <RouterProvider router={pageRouter}/>;
}

export default App;
