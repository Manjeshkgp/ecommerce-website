import React from 'react';
import SmallProductComp from '../components/products/SmallProductComp';
import { useSelector,useDispatch } from 'react-redux';
import {IoCheckmarkDoneCircle} from "react-icons/io5";
import { removeAllandUpdate } from '../slices/cartSlice';
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state)=>state.cart);
  const user = useSelector((state)=>state.user);
  const isAuthenticated = user.authenticated;
  const products = cart.products;
  let totalPrice = 0;

for (let i = 0; i < products.length; i++) {
  const product = products[i];
  totalPrice += product.price * product.numberOfProducts;
}

const productPurchased = ()=> {
  toast("Products Purchased Successfully");
}
const buyProduct = async() => {
  if(products.length===0){
    alert("Nothing In Cart, atleast add something")
    return;
  }
  const res = await fetch (`${process.env.REACT_APP_API_URL}/users/buy-product`,{
    method:"POST",
    body:JSON.stringify({
      buyer:Cookies.get("email"),
      products:products,
      totalPrice:totalPrice,
    }),
    headers:{
      Authorization:`Bearer ${Cookies.get("jwt")}`,
      "Content-Type":"application/json"
    }
  })
  await res.json();
  if(res.status===200){dispatch(removeAllandUpdate());productPurchased();};
  if(res.status===401){alert("Login First Then Purchase")};
}

  return (<motion.div initial={{width:0}} animate={{width:"100%"}} exit={{x:"100%",transition:{duration:0.1}}}>
  <ToastContainer/>
  <div className="flex flex-col lg:flex-row justify-evenly items-center bg-gray-900 text-gray-200 min-h-[calc(100vh-16rem)]">
   <div className='w-80 flex justify-evenly flex-col items-center'> {products?.map((product)=>(<SmallProductComp key={product?._id} productDetails={product}/>))}</div>
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
    <button onClick={()=>{isAuthenticated? buyProduct():navigate("/authenticate",{replace:true})}} className="flex mt-2 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Buy Now</button>
    <p className="text-center text-sm mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, distinctio.</p>
    </div>
   </div>
  </div>
  </motion.div>)
}

export default Cart