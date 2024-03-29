import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store.js";
import "./index.css";
import App from "./App";
import {
  Authenticate,
  Cart,
  Contact,
  Home,
  Products,
  GoogleJwt,
  AdminLogin,
  AdminDashboard,
} from "./pages";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AdminProducts from "./pages/AdminProducts.jsx";
import AdminSales from "./pages/AdminSales.jsx";
import AdminOrders from "./pages/AdminOrders.jsx";
import DeleteProduct from "./pages/DeleteProduct.jsx";
import EditProduct from "./pages/EditProduct.jsx";
import AdminUsers from "./pages/AdminUsers.jsx";
import SingleProduct from "./pages/SingleProduct.jsx";
import MyAddresses from "./pages/MyAddresses.jsx";
import Admin from "./pages/Admin.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Brandedproducts from "./pages/Brandedproducts.jsx";
import MyOrders from "./pages/MyOrders.jsx";

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
        element: <MyOrders />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/addresses",
        element: <MyAddresses />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path:"/brands/:brand",
        element: <Brandedproducts/>
      },
      {
        path: "/products/:id",
        element: <SingleProduct />,
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
    path: "/admin-login",
    element: <AdminLogin />,
  },

  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "/admin/dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/admin/products",
        element: <AdminProducts />,
      },
      {
        path: "/admin/users",
        element: <AdminUsers />,
      },
      {
        path: "/admin/sales",
        element: <AdminSales />,
      },
      {
        path: "/admin/orders",
        element: <AdminOrders />,
      },
      {
        path: "/admin/products/delete/:id",
        element: <DeleteProduct />,
      },
      {
        path: "/admin/products/edit/:id",
        element: <EditProduct />,
      },
      {
        path: "/admin/products/add",
        element: <AddProduct />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
