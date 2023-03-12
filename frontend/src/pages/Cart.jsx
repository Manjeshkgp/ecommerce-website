import React from 'react';
import SmallProductComp from '../components/products/SmallProductComp';
import { useSelector } from 'react-redux';

const Cart = () => {
  const cart = useSelector((state)=>state.cart).products;
  console.log(cart)
  return (<>
  <div className="flex flex-col justify-evenly items-center bg-gray-900 text-gray-200 min-h-[calc(100vh-16rem)]">
    {cart?.map((product)=>(<SmallProductComp key={product?._id} productDetails={product}/>))}
  </div>
  </>)
}

export default Cart