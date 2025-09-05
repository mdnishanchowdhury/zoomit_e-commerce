import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);
    // Login
    const loginUser = async ({ email, password }) => {
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:5000/login", { email, password });
            const { token, role, name, email: userEmail, profileImage } = res.data;
            const userData = { name, role, email: userEmail, profileImage };
            setUser(userData);
            setToken(token);
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("token", token);
            window.dispatchEvent(new Event("localStorageUpdated"));
            return res.data;
        } catch (err) {
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Register
    const registerUser = async ({ name, email, password, photo }) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            if (photo && photo[0]) formData.append("profileImage", photo[0]);
            const res = await axios.post("http://localhost:5000/register", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return res.data;
        } catch (err) {
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Logout
    const logoutUser = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.dispatchEvent(new Event("localStorageUpdated"));
    };

    // Load user from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                loginUser,
                registerUser,
                logoutUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
