import { Navigate } from "react-router-dom";
import useAuth from "../context/auth-context";

const ProtectedLayout = ({ children }) => {
    const { userData } = useAuth();

    if (!userData) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedLayout;
