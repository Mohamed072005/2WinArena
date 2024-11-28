import Header from "@/components/layout/Header";
import SideBar from "@/components/layout/SideBar";
import { getLocalStorage } from "@/helpers/localStorage";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const MainLayout = () => {
    const token = getLocalStorage('token');
    const navigate = useNavigate()
    useEffect(() => {
        if (token === null) {
            navigate('/auth/login');
        }
    }, [])

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(false)

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

    return (
        <>
            <div className='flex bg-gray-100 dark:bg-gray-900'>
                <SideBar isOpen={sidebarOpen} setSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <div className="flex-1 flex flex-col overflow-hidden">
                    <Header toggleSidebar={toggleSidebar} />
                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    )
}

export default MainLayout;