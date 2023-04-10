import React from "react";
import { Link } from "react-router-dom";
import Button from "../buttons";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../../slices/userSlice.js";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Nav = ({ openNav, setOpenNav }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.authenticated);
  return (
    <>
      <nav
        className={
          openNav
            ? "flex mr-4 flex-col justify-around items-center w-screen absolute h-screen top-0 bg-[#0a1926ed] backdrop-blur-sm"
            : "hidden md:flex mr-4 flex-row md:w-[70vw] lg:w-[60vw] justify-around items-center static"
        }
      >
        <Link
          onClick={() => setOpenNav(false)}
          className="text-gray-300 hover:text-gray-100 active:text-white"
          to="/"
        >
          Home
        </Link>
        <Link
          onClick={() => setOpenNav(false)}
          className="text-gray-300 hover:text-gray-100 active:text-white"
          to="/products"
        >
          Products
        </Link>
        <Link
          onClick={() => setOpenNav(false)}
          className="text-gray-300 hover:text-gray-100 active:text-white"
          to="/cart"
        >
          Cart
        </Link>
        <Link
          onClick={() => setOpenNav(false)}
          className="text-gray-300 hover:text-gray-100 active:text-white"
          to="/about"
        >
          About
        </Link>
        <Link
          onClick={() => setOpenNav(false)}
          className="text-gray-300 hover:text-gray-100 active:text-white"
          to="/contact"
        >
          Contact
        </Link>
        <Link
          onClick={() => setOpenNav(false)}
          className="text-gray-300 hover:text-gray-100 active:text-white"
          to="/customers"
        >
          Customers
        </Link>
        {!isAuthenticated ? (
          <Link onClick={() => setOpenNav(false)} to="authenticate">
            <Button buttonContent="Login/Signup"></Button>
          </Link>
        ) : (
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
        )}
      </nav>
    </>
  );
};

export default Nav;
