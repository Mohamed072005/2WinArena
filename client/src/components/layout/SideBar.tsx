import { Home, Calendar, Users, Settings, BarChart, Menu, X } from 'lucide-react'
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

interface SidebarProps {
    isOpen: boolean
    setSidebar: () => void
}

const SideBar: React.FC<SidebarProps> = ({ isOpen, setSidebar }) => {
    const menuItems = [
        { icon: Home, label: 'Dashboard', link: '/' },
        { icon: Calendar, label: 'Events', link: '/event' },
        { icon: Users, label: 'Teams', link: '/registrations' },
        { icon: BarChart, label: 'Analytics', link: '/' },
        { icon: Settings, label: 'Settings', link: '/' },
    ]
    return (
        <>
            <aside className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} fixed left-0 top-0 z-40 w-64 h-screen transition-transform duration-300 ease-in-out bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700`}>
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-around h-16 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-2xl font-semibold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                            2WinArena
                        </span>
                        <Button variant="ghost" size="icon" onClick={setSidebar} className="mr-4">
                            <X className="h-8 w-8" />
                        </Button>
                    </div>
                    <nav className="flex-grow">
                        <ul className="space-y-2 p-4">
                            {menuItems.map((item, index) => (
                                <li key={index} className='px-3 my-3'>
                                    <Link
                                        to={item.link}
                                        className="w-full flex justify-start my-5 items-center"
                                    >
                                        <item.icon className="mr-2 h-5 w-5" />
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    );
}

export default SideBar;
