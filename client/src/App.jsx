import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./pages/Layout.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage/SignUpPage.jsx";
import { useSelector } from "react-redux";
import LogInPage from "./pages/LogInPage/LogInPage.jsx";

function App() {
  const data = useSelector((state) => state.loginSlice.accessTokenList);

  if (data) {
    var loginStatus = data.success;
  }

  console.log(data, "fffffffffffffffffffffffffffffffff");

  const pageRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={loginStatus ? <HomePage /> : <LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Route>,
    ),
  );

  return <RouterProvider router={pageRouter} />;
}

export default App;
