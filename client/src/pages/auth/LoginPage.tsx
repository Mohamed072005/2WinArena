import LoginAPI from "@/components/auth/LoginAPI";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 transition-all duration-300 ease-in-out">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md transform transition-all duration-300 ease-in-out hover:scale-105">
                    <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-red-600 to-blue-600 text-transparent bg-clip-text">Welcome to 2WinArena</h1>
                    <LoginAPI />
                    <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account?{' '}
                        <Link to="/auth/register" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-150 ease-in-out">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>

        </>
    )
}

export default LoginPage;
