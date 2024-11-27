import { getLocalStorage } from "@/helpers/localStorage";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const MainLayout = () => {
    const token = getLocalStorage('token');
    const navigate = useNavigate()
    useEffect(() => {
        if(token === null){
            navigate('/auth/login');
        }
    }, [])

    return (
        <>
            <div>
                <h1 className="text-blue-600">Hello Organizer</h1>
                {/* <Outlet /> */}
            </div>
        </>
    )
}

export default MainLayout;