import React, { useEffect, useState } from "react";
import { BiCartAdd } from "react-icons/bi";
import { AiFillEye } from "react-icons/ai";
import { useSelector } from "react-redux";
import ProductData from "./ProductData";
import { useNavigate } from "react-router-dom";
import Button from "../buttons";
import { useDispatch } from "react-redux";
import { increment } from "../../slices/cartSlice";
import {BiEdit} from "react-icons/bi";
import {MdDeleteOutline} from "react-icons/md";

const Products = ({ productDetails, setAlert }) => {
  const [averageRate,setAverageRate] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const admin = user.admin;
  function averageRating(ratings) {
    let totalRating = 0;
    let average;
    if(ratings?.length===0){
      return setAverageRate(0);
    }
    for (let i = 0; i < ratings?.length; i++) {
      totalRating += ratings[i]?.rate;
    }
  
    average = totalRating / ratings?.length;
    return setAverageRate(average);
  }
  useEffect(()=>{averageRating(productDetails?.rating)},[]) 
  return (
    <>
      <div className="w-[94%] work-sans border group border-gray-700 hover:scale-105 duration-300  transition-all hover:shadow-xl hover:shadow-gray-500 mt-3 rounded h-80 flex flex-col justify-start items-center">
        <div className="w-full relative">
          {!admin ? (
            <>
              <div
                onClick={() => {
                  dispatch(
                    increment({ ...productDetails, numberOfProducts: 1 })
                  );
                  setAlert(true);
                }}
                className="absolute top-2 right-2"
              >
                <BiCartAdd className="fill-gray-100 hidden group-hover:block bg-[rgba(9,10,19,0.8)] rounded-sm active:bg-green-400 active:transition-all active:duration-500 cursor-pointer w-8 h-8" />
              </div>
              <div className="absolute top-12 right-2">
                <AiFillEye
                  onClick={() => {
                    navigate(`/products/${productDetails?._id}`);
                  }}
                  className="fill-gray-100 hidden group-hover:block bg-[rgba(9,10,19,0.8)] rounded-sm active:bg-green-400 active:transition-all active:duration-500 cursor-pointer w-8 h-8"
                />
              </div>
            </>
          ) : (
            ""
          )}
          {admin ? (
            <div className="absolute top-2 right-2 w-8 h-16 hidden group-hover:flex flex-col rounded justify-around items-center">
              <div
                onClick={() => {
                  navigate(`/admin/products/edit/${productDetails._id}`);
                }}
              >
                <BiEdit className="w-7 h-7 cursor-pointer active:bg-indigo-800 bg-[rgba(0,0,0,0.5)] hover:bg-indigo-500 rounded-sm text-gray-300"/>
              </div>
              <div
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure, you wanna delete that product"
                    )
                  ) {
                    navigate(`/admin/products/delete/${productDetails._id}`);
                  }
                }}
              >
                <MdDeleteOutline className="w-7 h-7 cursor-pointer active:bg-red-800 bg-[rgba(0,0,0,0.5)] hover:bg-red-500 rounded-sm text-gray-300"/>
              </div>
            </div>
          ) : (
            ""
          )}
          <img
            className="w-full rounded-t h-52 object-cover"
            src={`${process.env.REACT_APP_API_URL}/${productDetails?.primaryImage}`}
            onError={(e) =>
              (e.currentTarget.src =
                "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80")
            }
            alt=""
          />
        </div>
        <div className="flex w-[98%] justify-between items-start">
          <ProductData productDetails={productDetails} averageRate={averageRate}/>
        </div>
      </div>
    </>
  );
};

export default Products;
