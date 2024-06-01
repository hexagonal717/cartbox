import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider,} from "react-router-dom";
import Layout from "./pages/Layout.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage/SignUpPage.jsx";
import {useSelector} from "react-redux";
import LogInPage from "./pages/LogInPage/LogInPage.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import AccountSettings from "./pages/AccountSettings/AccountSettings.jsx";
import SettingsPage from "./pages/SettingsPage/SettingsPage.jsx";

function App() {
    const data = useSelector((state) => state.loginSlice.accessToken);

    if (data) {
        var loginStatus = data.success;
    }
    const pageRouter = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Layout/>}>
                <Route index element={loginStatus ? <HomePage/> : <LogInPage/>}/>
                <Route path="/signup" element={<SignUpPage/>}/>
                <Route
                    path="settings"
                    element={loginStatus ? <SettingsPage/> : <LogInPage/>}
                >
                    <Route
                        path="profile"
                        element={loginStatus ? <ProfilePage/> : <LogInPage/>}
                    />
                    <Route
                        path="account"
                        element={loginStatus ? <AccountSettings/> : <LogInPage/>}
                    />
                </Route>
            </Route>,
        ),
    );

    return <RouterProvider router={pageRouter}/>;
}

export default App;
