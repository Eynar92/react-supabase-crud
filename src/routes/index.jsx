import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";
import { Login, Register, Home, NotFound, loaderSession } from "../pages";

export const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <Home />,
                loader: loaderSession,
            },
            {
                path: "auth",
                element: <Layout />,
                errorElement: <h1 className="text-white text-3xl">Error Login</h1>,
                children: [
                    {
                        index: true,
                        element: <Login />,
                    },
                    {
                        path: "register",
                        element: <Register />,
                    },
                ]
            },
        ]
    },

])