import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const navigate = useNavigate();

    const [userData, setUserData] = useState(() => {
        return localStorage.getItem("user") || "";
    });

    const handleLogin = (username) => {
        setUserData(username);
    };

    const handleLogout = () => {
        setUserData("");
        localStorage.removeItem("user");
        navigate("/login");
    };

    useEffect(() => {
        if (userData) {
            localStorage.setItem("user", userData);
            navigate("/team");
        } else {
            localStorage.removeItem("user");

            navigate("/login");
        }
    }, [userData, navigate]);

    return (
        <AuthContext.Provider value={{ userData, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default function useAuth() {
    return useContext(AuthContext);
}
