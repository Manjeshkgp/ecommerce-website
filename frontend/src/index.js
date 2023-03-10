import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store.js";
import "./index.css";
import App from "./App";
import { Authenticate, Cart, Contact, Home, Products, GoogleJwt, AdminLogin, AdminDashboard } from "./pages";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AdminProducts from "./pages/AdminProducts.jsx";
import AdminSales from "./pages/AdminSales.jsx";
import AdminSellers from "./pages/AdminSellers.jsx"
import DeleteProduct from "./pages/DeleteProduct.jsx";
import EditProduct from "./pages/EditProduct.jsx";
import AdminUsers from "./pages/AdminUsers.jsx"
import SingleProduct from "./pages/SingleProduct.jsx";
import About from "./pages/About.jsx";

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
        path: "/about",
        element: <About />,
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
        path:"/products/:id",
        element: <SingleProduct />
      }
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
    element:<AdminUsers/>
  },
  {
    path:"/admin/sales",
    element:<AdminSales/>
  },
  {
    path:"/admin/sellers",
    element:<AdminSellers/>
  },
  {
    path:"/admin/products/delete/:id",
    element:<DeleteProduct/>
  },
  {
    path:"/admin/products/edit/:id",
    element:<EditProduct/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
);
