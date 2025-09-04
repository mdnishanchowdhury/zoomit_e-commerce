import axiosInstance from "./axiosInstance";

// Register
export const signUpAPI = (formData) =>
    axiosInstance.post("/signUp", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

// Login
export const loginAPI = (data) => axiosInstance.post("/login", data);

// Logout
export const logoutAPI = () => axiosInstance.post("/logout");
