import { Bell, Menu } from "lucide-react";
import { Button } from "../ui/button";

interface HeaderProps {
    toggleSidebar: () => void
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    return (
        <>
            <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                    <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-4">
                        <Menu className="h-6 w-6" />
                    </Button>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                        2WinArena
                    </h1>
                </div>
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="icon">
                        <Bell className="h-5 w-5" />
                    </Button>
                </div>
            </header>
        </>
    );
}

export default Header;
