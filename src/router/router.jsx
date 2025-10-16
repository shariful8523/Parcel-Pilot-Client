import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import SignUp from "../Pages/Authentication/SignIn/SignUp";
import Coverage from "../Pages/Coverage/Coverage";
import SendParcel from "../Pages/SendParcel/SendParcel";
import PrivateRoute from "../routes/PrivateRouter";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcel from "../Pages/Dashboard/MyParcel";
import Payment from "../Pages/Dashboard/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory";
import TrackParcel from "../Pages/Dashboard/TrackParcel";
import BeARider from "../Pages/Dashboard/BeArider/BeArider";
import ActiveRider from "../Pages/Dashboard/BeArider/ActiveRider";
import PendingRider from "../Pages/Dashboard/BeArider/PendingRider";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";



const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: 'coverage',
                Component: Coverage,
                loader: () => fetch('./warehouses.json')
            },
            {
                path: 'sendparcel',
                element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute>,
                loader: () => fetch('./warehouses.json')
            },
            {
                path: 'beArider',
                element: <PrivateRoute><BeARider /></PrivateRoute>,
                loader: () => fetch('./warehouses.json')
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login,
            },
            {
                path: 'signup',
                Component: SignUp,
            },

        ]
    },

    {
        path: '/dashboard',
        element: <PrivateRoute> <DashboardLayout /> </PrivateRoute>,
        children: [
            {
                path: 'myParcel',
                Component: MyParcel,
            },
            {
                path: 'payment/:parcelId',
                Component: Payment,
            },
            {
                path: 'paymentHistory',
                Component: PaymentHistory,
            },
            {
                path: 'track',
                Component: TrackParcel,
            },
            {
                path:'activeRiders',
                Component: ActiveRider,
            },
            {
                path:'pendingRiders',
                Component: PendingRider,
            }
        ]
    }
]);

export default router;