import React, { useEffect, useState } from 'react';
import {BiCartAdd} from "react-icons/bi";
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { increment } from '../slices/cartSlice';
import {FacebookShareButton,FacebookIcon,TwitterShareButton,TwitterIcon,WhatsappShareButton,WhatsappIcon} from "react-share";
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SingleProduct = () => {
  const addedToCart = () => {
    toast("Product added to Cart")
  }
  const dispatch = useDispatch();
  const {id} = useParams();
  const [mainImg,setMainImg] = useState("");
  const [imgArray,setImgArray] = useState([]);
  const [productData,setProductData] = useState({});
  const getProduct = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/users/get-a-product`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        _id:id
      })
    })
    const data = await res.json();
    setMainImg(data?.primaryImage);
    setImgArray([data?.primaryImage,...data?.images]);
    setProductData(data);
  }
  useEffect(()=>{getProduct()},[])
  return (<>
  <ToastContainer/>
  <section className="text-gray-400 bg-gray-900 body-font overflow-hidden">
  <div className="container px-5 py-24 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto lg:max-h-screen h-64 object-cover object-center rounded" src={`${process.env.REACT_APP_API_URL}/${mainImg}`}/>
      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">{productData?.shortDescription}</h2>
        <h1 className="text-white text-3xl title-font font-medium mb-1">{productData?.title}</h1>
        <div className="flex mb-4">
          <span className="flex items-center">
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-400" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-400" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-400" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-400" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-400" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span className="ml-3">{productData?.rating?.length} Ratings</span>
          </span>
          <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-800 text-gray-500 space-x-2">
            <FacebookShareButton url={window.location.href}>
              <FacebookIcon size={30}/>
            </FacebookShareButton>
            <TwitterShareButton url={window.location.href}>
              <TwitterIcon size={30}/>
            </TwitterShareButton>
            <WhatsappShareButton url={window.location.href}>
              <WhatsappIcon size={30}/>
            </WhatsappShareButton>
          </span>
        </div>
        <p className="leading-relaxed">{productData?.description || "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque excepturi sunt iure modi, cumque atque totam tempora culpa facilis nam consequatur eos. Minima itaque dolorum deserunt voluptatibus ea libero tempora!"}</p>
        <div className="flex gap-4 mt-6 items-center pb-5 border-b-2 border-gray-800 mb-5">
         {imgArray.map((singleImg,index)=>(<img src={`${process.env.REACT_APP_API_URL}/${singleImg}`} onClick={()=>{setMainImg(singleImg)}} key={index} className='w-16 h-16 object-cover object-center rounded-sm cursor-pointer' alt="" />))}
        </div>
        <div className="flex">
          <span className="title-font font-medium text-2xl text-white">${productData?.price}</span>
          <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Buy Now</button>
          <button onClick={()=>{dispatch(increment({...productData,numberOfProducts:1}));addedToCart();}} className="rounded-full active:bg-indigo-500 active:text-white w-10 h-10 bg-gray-800 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
            <BiCartAdd className='w-7 h-7'/>
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
  </>)
}

export default SingleProduct