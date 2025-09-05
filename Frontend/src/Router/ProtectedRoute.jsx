import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, adminOnly = false }) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        // Not logged in
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && user.role !== "admin") {
        // Logged in but not admin
        return <Navigate to="/" replace />;
    }

    return children;
};
