import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ProductDetails from "../Pages/Products/ProductDetails";
import Products from "../Pages/Products/Products";
import Dashboard from "../Layout/Dashboard";
import AdminOverview from "../Pages/AdminDashboard/AdminOverview";
import UsersList from "../Pages/AdminDashboard/UsersList";
import AddProductForm from "../Pages/AdminDashboard/AddProductForm";
import OrdersList from "../Pages/AdminDashboard/OrdersList";
import MyOrders from "../Pages/MyOrders/MyOrders";
import { ProtectedRoute } from "./ProtectedRoute";

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
                element: <Products></Products>
            },
            {
                path: "details",
                element: <ProductDetails></ProductDetails>
            },
            {
                path: "myorders",
                element: <MyOrders></MyOrders>
            },
            {
                path: "*",
                element: <h2>NO ROUTING PAGE</h2>
            }
        ]
    },

   {
    path: "auth",
    element: (
        <ProtectedRoute adminOnly={true}>
            <Dashboard />
        </ProtectedRoute>
    ),
    children: [
        {
            path: "/auth",
            element: <AdminOverview />
        },
        {
            path: "/auth/usersList",
            element: <UsersList />
        },
        {
            path: "/auth/addproduct",
            element: <AddProductForm />
        },
        {
            path: "/auth/orderslist",
            element: <OrdersList />
        },
        {
            path: "*",
            element: <h2>NO ROUTING PAGE</h2>
        }
    ]
}

]);