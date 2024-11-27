import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import GuestLayout from "@/layout/GuestLayout";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import NotFound from "@/pages/NotFound";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
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