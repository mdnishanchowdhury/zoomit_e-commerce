import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Page/Home/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children:[
            {
                path:"",
                element: <Home></Home>
            },
            {
                path:"*",
                element: <h2>NO ROUTING PAGE</h2>
            }
        ]
    },
]);