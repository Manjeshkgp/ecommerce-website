import React from "react";
import { Link } from "react-router-dom";
import Button from "../buttons";
import { useDispatch } from "react-redux";
import { removeUser } from "../../slices/userSlice.js";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Nav = ({ openNav, setOpenNav }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <nav
        className={
          openNav
            ? "flex mr-4 flex-col justify-around items-center w-screen absolute h-screen top-0 bg-[#0a1926ed] backdrop-blur-sm"
            : "hidden md:flex mr-4 flex-row md:w-[65vw] lg:w-[55vw] justify-around items-center static"
        }
      >
        <Link
          onClick={() => setOpenNav(false)}
          className="text-gray-300 hover:text-gray-100 active:text-white"
          to="/admin/dashboard"
        >
          Dashboard
        </Link>
        <Link
          onClick={() => setOpenNav(false)}
          className="text-gray-300 hover:text-gray-100 active:text-white"
          to="/admin/users"
        >
          Users
        </Link>
        <Link
          onClick={() => setOpenNav(false)}
          className="text-gray-300 hover:text-gray-100 active:text-white"
          to="/admin/products"
        >
          Products
        </Link>
        <Link
          onClick={() => setOpenNav(false)}
          className="text-gray-300 hover:text-gray-100 active:text-white"
          to="/admin/orders"
        >
          Orders
        </Link>
        <Link
          onClick={() => setOpenNav(false)}
          className="text-gray-300 hover:text-gray-100 active:text-white"
          to="/admin/sales"
        >
          Sales
        </Link>
          <div
            onClick={() => {
              dispatch(removeUser());
              Cookies.remove("jwt");
              Cookies.remove("email");
              setOpenNav(false);
              navigate("/", { replace: true });
            }}
          >
            <Button buttonContent="Logout"></Button>
          </div>
      </nav>
    </>
  );
};

export default Nav;
