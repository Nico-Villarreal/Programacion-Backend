import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root.jsx";
import ProductsContainer from "../containers/ProductsContainer.jsx";
import CartContainer from "../containers/CartContainer.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <h1>Oops, parece que hubo un error</h1>,
        children: [
            {
                path: "/products",
                element: <ProductsContainer />
            },
            {
                path: "/carts/:cid",
                element: <CartContainer />
            },
        ],
    },
]);

const Router = () => {
    return <RouterProvider router={router} />
};

export default Router;
