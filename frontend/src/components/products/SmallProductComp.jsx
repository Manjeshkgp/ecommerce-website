import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { incrementByOne,decrementByOne } from "../../slices/cartSlice";

const SmallProductComp = ({ productDetails }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-between my-2 w-[312px] md:w-[22rem] bg-[rgba(129,141,248,0.08)] shadow-lg hover:shadow-gray-600 hover:m-2 transition-all rounded">
        <div className="w-24 flex justify-center items-center">
          <img
            onClick={() => {
              navigate(`/products/${productDetails?._id}`);
            }}
            src={`${productDetails?.primaryImage}`}
            alt="product pic"
            className="h-20 w-20 object-cover rounded"
          />
        </div>
        <div className="flex w-full flex-col justify-start">
          <div className="ml-2 h-3/4 border-b">
            <p className="font-semibold text-sm">
              {productDetails?.title || "Product Name"}
            </p>
          </div>
          <div className="flex mt-2 justify-around items-center">
            <span className="flex">
              <button onClick={()=>{dispatch(decrementByOne(productDetails))}} className="bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-700 py-1 px-2 rounded-l">-</button>
              <p className="bg-indigo-600 px-2 py-1 text-center">
                {productDetails?.numberOfProducts}
              </p>
              <button onClick={()=>{dispatch(incrementByOne(productDetails))}} className="bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-700 py-1 px-2 rounded-r">+</button>
            </span>
            <p className="text-base font-semibold text-gray-400 lg:mr-2">
              {`$${productDetails?.price}` || "$39.99"}
            </p>
            <p className="text-lg font-semibold lg:mr-2">
              {`$${productDetails?.price * productDetails?.numberOfProducts}` ||
                "$39.99"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmallProductComp;
