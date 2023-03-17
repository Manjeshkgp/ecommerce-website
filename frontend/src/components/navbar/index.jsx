import React, { useState } from "react";
import HamButton from "./HamButton";
import Logo from "./Logo";
import Nav from "./Nav";

const Navbar = () => {
  const [openNav, setOpenNav] = useState(false);
  return (
    <>
      <div className="bg-indigo-500 z-10 w-screen h-12 flex justify-between items-center fixed">
        <Logo/>
        <Nav openNav={openNav} setOpenNav={setOpenNav}/>
        <HamButton openNav={openNav} setOpenNav={setOpenNav}/>
      </div>
    </>
  );
};

export default Navbar;
