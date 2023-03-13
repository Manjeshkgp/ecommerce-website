import React from "react";
import {AiTwotoneStar} from "react-icons/ai";

const ProductData = ({productDetails,averageRate}) => {
  return (
    <>
      <div className="flex flex-col ml-1 mt-1 items-start w-full cursor-pointer">
        <div className="border-b w-full py-1"><p
          className="text-sm font-semibold text-gray-300">{productDetails?.brand||"brand"}</p></div>
        <p
          className="text-gray-100 font-bold"
        >
          {productDetails?.title||"Title"}
        </p>
        <p className="flex rounded bg-indigo-500 items-center justify-center font-semibold text-gray-100 px-1 text-sm">{averageRate}<AiTwotoneStar className="text-yellow-400 w-[0.875rem] h-[0.875rem]"/></p>
      <p className="font-bold text-sm text-gray-100">${productDetails?.price||"39.99"}</p>
      </div>
    </>
  );
};

export default ProductData;
