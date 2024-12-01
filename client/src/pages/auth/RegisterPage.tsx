import { Link } from "react-router-dom";
import RightSideImage from '@/assets/img/sportsEvents.webp'
import RegisterAPI from "@/components/auth/RegisterAPI";

const RegisterPage = () => {
    return (
        <>
            <div className="min-h-screen flex flex-col md:flex-row">
                {/* Left side - Registration Form */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-gray-900">
                    <div className="w-full max-w-md">
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">
                                Join 2WinArena
                            </h1>
                            <p className="text-xl font-semibold text-gray-600 dark:text-gray-400">
                                Create your account
                            </p>
                        </div>
                        <RegisterAPI />
                        <div className="mt-8 text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Already have an account?{' '}
                                <Link to="/auth/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-150 ease-in-out">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
                {/* Right side - Sports Image */}
                <div className="w-full md:w-1/2 bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
                    <img
                        src={RightSideImage}
                        alt="Sports collage"
                        className="absolute inset-0 w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center p-6 bg-white bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80 rounded-lg shadow-xl">
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Welcome to 2WinArena</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300">Join our community of sports enthusiasts</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisterPage;
