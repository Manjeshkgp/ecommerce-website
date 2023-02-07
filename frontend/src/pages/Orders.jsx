import React from 'react';
import SmallProductComp from '../components/products/SmallProductComp';

const Orders = () => {
  return (<>
  <div className="flex flex-col justify-evenly items-center bg-gradient-to-bl from-transparent via-teal-400 to-transparent min-h-[calc(100vh-16rem)]">
    <SmallProductComp/>
    <SmallProductComp/>
    <SmallProductComp/>
  </div>
  </>)
}

export default Orders