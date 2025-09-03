// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { loginAPI, logoutAPI, signUpAPI } from "../api/auth";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register user
  const createUser = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      if (data.photo && data.photo[0]) formData.append("photo", data.photo[0]);

      const res = await signUpAPI(formData);
      setLoading(false);
      return res;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  // Login user
  const userSignIn = async (data) => {
    setLoading(true);
    try {
      const res = await loginAPI(data);
      const loggedInUser = res.data.user;
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      setLoading(false);
      return res;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  // Logout user
  const userLogOut = async () => {
    setLoading(true);
    try {
      await logoutAPI();
      setUser(null);
      localStorage.removeItem("user");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, createUser, userSignIn, userLogOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
