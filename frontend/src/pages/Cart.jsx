import React from 'react';
import SmallProductComp from '../components/products/SmallProductComp';

const Cart = () => {
  return (<>
  <div className="flex flex-col justify-evenly items-center bg-gray-900 text-gray-200 min-h-[calc(100vh-16rem)]">
    <SmallProductComp/>
    <SmallProductComp/>
    <SmallProductComp/>
    <SmallProductComp/>
    <SmallProductComp/>
    <SmallProductComp/>
    <SmallProductComp/>
  </div>
  </>)
}

export default Cart