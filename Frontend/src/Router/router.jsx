import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ProductDetails from "../Pages/Products/ProductDetails";
import PrivetRoute from "./PrivetRoute";
import Products from "../Pages/Products/Products";
import Dashboard from "../Layout/Dashboard";
import AdminOverview from "../Pages/AdminDashboard/AdminOverview";
import UsersList from "../Pages/AdminDashboard/UsersList";
import AddProductForm from "../Pages/AdminDashboard/AddProductForm";
import OrdersList from "../Pages/AdminDashboard/OrdersList";

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

    {
        path: 'dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: "/dashboard",
                element:<AdminOverview></AdminOverview>
            },
            {
                path: "/dashboard/usersList",
                element:<UsersList></UsersList>
            },
            {
                path: "/dashboard/addproduct",
                element:<AddProductForm></AddProductForm>
            },
            {
                path: "/dashboard/orderslist",
                element:<OrdersList></OrdersList>
            },
            {
                path: "*",
                element: <h2>NO ROUTING PAGE</h2>
            }
        ]
    }
]);