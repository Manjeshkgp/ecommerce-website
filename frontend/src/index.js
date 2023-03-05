import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store.js";
import "./index.css";
import App from "./App";
import { Authenticate, Cart, Contact, Home, Orders, Products, GoogleJwt, AdminLogin, AdminDashboard } from "./pages";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AdminProducts from "./pages/AdminProducts.jsx";
import AdminSales from "./pages/AdminSales.jsx";
import AdminSellers from "./pages/AdminSellers.jsx"
import DeleteProduct from "./pages/DeleteProduct.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/authenticate",
    element: <Authenticate />,
  },
  {
    path: "/auth-with-google/:jwtToken",
    element: <GoogleJwt />,
  },
  {
    path:"/admin-login",
    element: <AdminLogin/>
  },
  {
    path:"/admin-dashboard",
    element:<AdminDashboard/>
  },
  {
    path:"/admin/products",
    element:<AdminProducts/>
  },
  {
    path:"/admin/users",
    element:<AdminSales/>
  },
  {
    path:"/admin/sellers",
    element:<AdminSellers/>
  },
  {
    path:"/admin/products/delete/:id",
    element:<DeleteProduct/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
