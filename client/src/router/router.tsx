import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import GuestLayout from "@/layout/GuestLayout";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/app/Dadhboard";
import Events from "@/pages/app/Events";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Dashboard />
            },
            {
                path: '/event',
                element: <Events />
            }
        ]
    },
    {
        path: '/auth',
        element: <GuestLayout />,
        children: [
            {
                index: true,
                element: <NotFound />
            },
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'register',
                element: <RegisterPage />,
            },
        ],
    },
    {
        path: '*', // Catch-all for unmatched routes
        element: <NotFound />,
    },
]);

export default router;