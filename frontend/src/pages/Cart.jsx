import React from 'react';
import SmallProductComp from '../components/products/SmallProductComp';
import { useSelector } from 'react-redux';
import {IoCheckmarkDoneCircle} from "react-icons/io5"

const Cart = () => {
  const cart = useSelector((state)=>state.cart).products;
  let totalPrice = 0;

for (let i = 0; i < cart.length; i++) {
  const product = cart[i];
  totalPrice += product.price * product.numberOfProducts;
}

  return (<>
  <div className="flex flex-col lg:flex-row justify-evenly items-center bg-gray-900 text-gray-200 min-h-[calc(100vh-16rem)]">
   <div className='w-80 flex justify-evenly flex-col items-center'> {cart?.map((product)=>(<SmallProductComp key={product?._id} productDetails={product}/>))}</div>
   <div className="h-80 w-80 bg-[rgba(129,141,248,0.08)] rounded-md my-4 flex-col">
    <div className="h-40 w-full flex flex-col border-b">
      <p className='text-lg mt-4 font-semibold flex justify-start items-center ml-2'><IoCheckmarkDoneCircle className='w-6 h-6 fill-green-400'/>Home Delivery</p>
      <p className='text-lg font-semibold flex justify-start items-center ml-2'><IoCheckmarkDoneCircle className='w-6 h-6 fill-green-400'/>Cash On Delivery</p>
      <p className='text-lg font-semibold flex justify-start items-center ml-2'><IoCheckmarkDoneCircle className='w-6 h-6 fill-green-400'/>Free Delivery</p>
      <div className="mt-8 ml-2 text-xl flex justify-between w-[19rem]">
        <p>Total</p>
        <p>${totalPrice}</p>
      </div>
    </div>
    <div className="h-40 w-full flex flex-col items-center">
    <button className="flex mt-2 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Buy Now</button>
    <p className="text-center text-sm mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, distinctio.</p>
    </div>
   </div>
  </div>
  </>)
}

export default Cart