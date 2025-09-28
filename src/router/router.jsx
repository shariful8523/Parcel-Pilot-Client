import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import SignUp from "../Pages/Authentication/SignIn/SignUp";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home,
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path:'login',
                Component: Login,
            },
            {
                path: 'signup',
                Component: SignUp ,
            }
        ]
    }
]);

export default router;