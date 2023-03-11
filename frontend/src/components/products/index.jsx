import React, { useState } from "react";
import { BiCartAdd } from "react-icons/bi";
import { useSelector } from "react-redux";
import ProductData from "./ProductData";
import { useNavigate } from "react-router-dom";
import Button from "../buttons";
import { useDispatch } from "react-redux";
import { increment } from "../../slices/cartSlice";

const Products = ({productDetails}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state)=>state.user);
  const admin = user.admin;
  return (
    <>
      <div className="w-[94%] border border-gray-700 hover:scale-105 duration-300  transition-all hover:shadow-xl hover:shadow-gray-500 mt-3 rounded h-80 flex flex-col justify-start items-center">
        <div className="w-full relative">
          <div className="absolute top-0 w-full h-full hover:bg-transparent bg-[rgba(21,20,35,0.35)]"></div>
          {!admin?<div onClick={()=>{dispatch(increment({...productDetails,numberOfProducts:1}))}} className="absolute top-2 right-2">
            <BiCartAdd className="fill-gray-100 active:bg-green-400 active:transition-all active:duration-500 cursor-pointer rounded-full w-8 h-8" />
          </div>:""}
          {admin?<div className="absolute top-2 w-full flex justify-around items-center">
            <div onClick={()=>{navigate(`/admin/products/edit/${productDetails._id}`)}}><Button buttonContent="Edit"></Button></div>
            <div onClick={()=>{if(window.confirm("Are you sure, you wanna delete that product")){navigate(`/admin/products/delete/${productDetails._id}`)}}}><Button buttonContent="Delete" >Delete</Button></div>
          </div>:""}
          <img
            className="w-full rounded-t h-52 object-cover"
            src={`${process.env.REACT_APP_API_URL}/${productDetails?.primaryImage}`}
            onError={(e)=>e.currentTarget.src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80"}
            alt=""
          />
        </div>
        <div onClick={()=>{navigate(`/products/${productDetails?._id}`)}} className="flex w-[98%] justify-between items-start">
          <ProductData productDetails={productDetails}/>
        </div>
      </div>
    </>
  );
};

export default Products;
