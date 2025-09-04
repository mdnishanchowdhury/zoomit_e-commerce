import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ProductDetails from "../Pages/Products/ProductDetails";
import PrivetRoute from "./PrivetRoute";
import Products from "../Pages/Products/Products";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/signUp",
                element: <SignUp></SignUp>
            },
            {
                path: "/products",
                element: <PrivetRoute><Products></Products></PrivetRoute>
            },
            {
                path: "details",
                element: <ProductDetails></ProductDetails>
            },
            {
                path: "*",
                element: <h2>NO ROUTING PAGE</h2>
            }
        ]
    },
]);