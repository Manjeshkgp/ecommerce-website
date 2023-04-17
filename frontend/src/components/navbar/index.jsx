import React, { useState } from "react";
import HamButton from "./HamButton";
import Logo from "./Logo";
import Nav from "./Nav";
import Search from "./Search";
import { useSelector } from "react-redux";

const Navbar = () => {
  const wishlistLength = useSelector((state)=>state.wishlist.products.length);
  const cartLength = useSelector((state)=>state.cart.products.length);
  const [openNav, setOpenNav] = useState(false);
  return (
    <>
      <div className="bg-indigo-500 z-10 w-screen h-12 flex justify-between items-center fixed">
        <Logo/>
        <Search wishlistLength={wishlistLength} cartLength={cartLength}/>
        <Nav openNav={openNav} setOpenNav={setOpenNav} wishlistLength={wishlistLength} cartLength={cartLength}/>
        <HamButton openNav={openNav} setOpenNav={setOpenNav}/>
      </div>
    </>
  );
};

export default Navbar;
