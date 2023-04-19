import React, { useEffect, useState } from 'react'
import {motion} from "framer-motion"
import Cookies from 'js-cookie'
import Button from '../components/buttons';
import { Link } from 'react-router-dom';
import moment from "moment";

const MyOrders = () => {
    const [myOrders,setMyOrders] = useState([]);
    const fetchMyOrders = async () => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/users/my-orders`,{
            method:"GET",
            headers:{
                Authorization:`Bearer ${Cookies.get("jwt")}`,
                "Content-Type":"application/json"
            }
        });
        const data = await res.json();
        if(res.status===200){
            setMyOrders(data);
            return;
        }
        alert(data)
    }
    useEffect(()=>{
        fetchMyOrders()
    },[])
  return (<motion.section initial={{width:0}} animate={{width:"100%"}} exit={{x:"100%",transition:{duration:0.1}}} className="text-gray-400 bg-gray-900 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full mb-20">
      <h1 className="text-2xl font-medium title-font mb-4 text-white tracking-widest">My Orders</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">All your previous purchases with details are here.</p>
    </div>
    <div className="flex flex-wrap justify-start ml-[2px] md:ml-2 gap-x-4 gap-y-4 -m-4">
        {myOrders.map((order)=>(<div key={order?._id} className="p-4 w-[96%] h-max rounded-md md:w-[48%] lg:w-[32%] bg-gray-800 flex flex-col gap-y-2">
            <p className=''>Total Price is Rs.{Number(order?.totalPrice/100)}</p>
            <p className=''>Ordered on {moment(order?.date).format('MMMM Do YYYY, h:mm a')}</p>
            {order?.products?.map((product)=>(<div key={product?._id} className='flex justify-start items-center'>
            <img src={`${product?.primaryImage}`} alt="product" className='h-20 w-20 object-contain object-center' />
            <div className="flex flex-col ml-2">
                <p>{product?.numberOfProducts} Item Purchased</p>
                <p>{product?.title}</p>
                <div className="flex justify-start flex-wrap gap-y-2 gap-x-4">
                    <Link to={`/products/${product?._id}`}>
                        <Button buttonContent={"Buy Again"}/>
                    </Link>
                    <Link to={`/products/${product?._id}`}>
                        <Button buttonContent={"View Item"}/>
                    </Link>
                </div>
            </div>
            </div>))}
      </div>))
      }
    </div>
  </div>
</motion.section>)
}

export default MyOrders;