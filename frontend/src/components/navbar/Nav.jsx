import React from 'react'

const Nav = ({openNav}) => {
  return (<>
  <nav
          className={
            openNav
              ? "flex mr-4 flex-col justify-around items-center w-screen absolute h-screen top-0 bg-[#1e57889a] backdrop-blur-sm"
              : "hidden md:flex mr-4 flex-row md:w-[60vw] lg:w-[50vw] justify-around items-center static"
          }
        >
          <p>Home</p>
          <p>Products</p>
          <p>Orders</p>
          <p>About</p>
          <p>Contact</p>
        </nav>
  </>)
}

export default Nav