import React from "react";
import { Link } from "react-router-dom";
import Button from "../buttons";
import { BiCart } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../../slices/userSlice.js";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Nav = ({ openNav, setOpenNav, wishlistLength, cartLength }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.authenticated);
  return (
    <>
      <nav
        className={
          openNav
            ? "flex mr-4 flex-col justify-around items-center w-screen absolute h-screen top-0 bg-[#0a1926ed] backdrop-blur-sm"
            : "hidden lg:flex mr-4 flex-row md:w-[70vw] lg:w-[60vw] justify-around items-center static"
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
          to="/addresses"
        >
          My Addresses
        </Link>
        <Link
          onClick={() => setOpenNav(false)}
          className="text-gray-300 hover:text-gray-100 active:text-white"
          to="/orders"
        >
          Orders
        </Link>
        <Link
          onClick={() => setOpenNav(false)}
          className="text-gray-300 hover:text-gray-100 active:text-white"
          to="/contact"
        >
          Contact
        </Link>
        <div className="relative hidden lg:block cursor-pointer">
          {wishlistLength<=0?null:<div className="absolute w-4 h-4 text-center text-xs rounded-full bg-red-600 -right-1 -top-1">
            <p className="text-gray-100">{wishlistLength>=10?"9+":wishlistLength}</p>
          </div>}
          <Link
            onClick={() => setOpenNav(false)}
            className="text-gray-300 hover:text-gray-100 active:text-white"
            to="/wishlist"
          >
            <AiOutlineHeart className="w-7 h-7" />
          </Link>
        </div>
        <div className="relative hidden lg:block cursor-pointer">
        {cartLength<=0?null:<div className="absolute w-4 h-4 text-center text-xs rounded-full bg-red-600 -right-1 -top-1">
            <p className="text-gray-100">{cartLength>=10?"9+":cartLength}</p>
          </div>}
          <Link
            onClick={() => setOpenNav(false)}
            className="text-gray-300 hover:text-gray-100 active:text-white"
            to="/cart"
          >
            <BiCart className="w-7 h-7" />
          </Link>
        </div>
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
