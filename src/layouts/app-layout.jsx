import { Outlet } from "react-router-dom";
import Navbar from "../components/nav-bar";

const AppLayout = () => {
    return (
        <>
            <header className="bg-violet-600 w-full h-[8rem] md:rounded-es-[7rem] flex items-center md:px-32 px-5">
                <Navbar />
            </header>
            <main className="">
                <Outlet />
            </main>
        </>
    );
};

export default AppLayout;
