import { Button } from "@/components/ui/button";
import { ArrowLeft, BellIcon as  Whistle} from "lucide-react";

const NotFound: React.FC = () => {
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-blue-100 dark:from-red-900 dark:to-blue-900 p-4">
                <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                    <div className="p-6 sm:p-8">
                        <div className="flex justify-center mb-6">
                            <Whistle className="h-24 w-24 text-red-500 dark:text-red-400" />
                        </div>
                        <h1 className="text-3xl font-extrabold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">
                            Foul Play!
                        </h1>
                        <p className="text-xl text-center font-semibold text-gray-700 dark:text-gray-300 mb-6">
                            404 - Page Not Found
                        </p>
                        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
                            Oops! It looks like you've wandered out of bounds. The page you're looking for doesn't exist or has been moved.
                        </p>
                        <div className="flex justify-center">
                            <Button
                                onClick={() => window.history.back()}
                                className="bg-gradient-to-r from-red-500 to-blue-500 hover:from-red-600 hover:to-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-md transform transition duration-150 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Safety
                            </Button>
                        </div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 px-6 py-4">
                        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                            Need assistance? <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">Contact our support team</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NotFound;
