// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { loginAPI, logoutAPI, signUpAPI } from "../api/auth";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ======================
  // Register user
  // ======================
  const createUser = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);

      if (data.photo instanceof FileList && data.photo.length > 0) {
        formData.append("photo", data.photo[0]);
      }

      const res = await signUpAPI(formData);
      return res;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // Login user
  // ======================
  const userSignIn = async (data) => {
    setLoading(true);
    try {
      const res = await loginAPI(data);
      const { user: loggedInUser, token } = res.data;

      // Save user
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      // Save token if available
      if (token) {
        localStorage.setItem("token", token);
      }

      return res;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // Logout user
  // ======================
  const userLogOut = async () => {
    setLoading(true);
    try {
      await logoutAPI();
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // Load user from localStorage
  // ======================
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        createUser,
        userSignIn,
        userLogOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
