import React from 'react'

const HamButton = ({openNav,setOpenNav}) => {
  return (<div
    onClick={() => setOpenNav(!openNav)}
    className="absolute top-4 right-0 lg:hidden z-10"
  >
    {!openNav ? (
      <>
        <div className="h-1 w-12 bg-teal-300 absolute top-4 right-2 rounded transition-all"></div>
        <div className="h-1 w-12 bg-teal-300 absolute top-2 right-2 rounded transition-all"></div>
        <div className="h-1 w-12 bg-teal-300 absolute top-0 right-2 rounded transition-all"></div>
      </>
    ) : (
      <>
        <div className="h-1 w-12 bg-teal-300 absolute top-2 right-2 rounded block transition-all rotate-45"></div>
        <div className="h-1 w-12 bg-teal-300 absolute top-2 right-2 rounded block transition-all rotate-[135deg]"></div>
      </>
    )}
  </div>)
}

export default HamButton