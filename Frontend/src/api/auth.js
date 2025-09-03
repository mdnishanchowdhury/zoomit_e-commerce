// src/api/auth.js
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Register
export const signUpAPI = (formData) =>
  axios.post(`${API}/signUp`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });

// Login
export const loginAPI = (data) =>
  axios.post(`${API}/login`, data, { withCredentials: true });

// Logout
export const logoutAPI = () =>
  axios.post(`${API}/logout`, {}, { withCredentials: true });
