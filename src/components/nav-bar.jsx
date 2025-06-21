import { Link } from "react-router-dom";
import useAuth from "../context/auth-context";
import { Power, PowerCircle } from "lucide-react";

const Navbar = () => {
    const { userData, handleLogout } = useAuth();

    return (
        <nav className="flex items-center justify-between w-full p-4 ">
            <Link to="/" className="text-2xl md:text-3xl font-bold text-white">
                Welcome
            </Link>

            {userData && (
                <div className="flex items-center gap-4">
                    <span className="text-white hidden sm:block">
                        {userData}
                    </span>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    >
                        <Power />
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
