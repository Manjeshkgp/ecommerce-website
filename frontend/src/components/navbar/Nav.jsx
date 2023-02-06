import React from 'react';
import { Link } from 'react-router-dom';
import Button from "../buttons";

const Nav = ({openNav}) => {
  return (<>
        <nav
          className={
            openNav
              ? "flex mr-4 flex-col justify-around items-center w-screen absolute h-screen top-0 bg-[#1e57889a] backdrop-blur-sm"
              : "hidden md:flex mr-4 flex-row md:w-[60vw] lg:w-[50vw] justify-around items-center static"
          }
        >
          <Link className='text-gray-300 hover:text-gray-100 active:text-white' to="/">Home</Link>
          <Link className='text-gray-300 hover:text-gray-100 active:text-white' to="/products">Products</Link>
          <Link className='text-gray-300 hover:text-gray-100 active:text-white' to="/orders">Orders</Link>
          <Link className='text-gray-300 hover:text-gray-100 active:text-white' to="/cart">Cart</Link>
          <Link className='text-gray-300 hover:text-gray-100 active:text-white' to="/contact">Contact</Link>
          <Link to="authenticate"><Button buttonContent="Login/Signup"></Button></Link>
        </nav>
  </>)
}

export default Nav