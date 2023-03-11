import React from "react";
import {AiTwotoneStar} from "react-icons/ai";

const ProductData = ({productDetails}) => {
  return (
    <>
      <div className="flex flex-col items-start w-full cursor-pointer">
        <p
          className="hidden md:block font-semibold text-gray-300">{productDetails?.shortDescription||"shortDescription -> Category"}</p>
        <p
          style={{ WebkitLineClamp: 1 }}
          className="text-ellipsis whitespace-nowrap overflow-hidden text-gray-100 font-bold"
        >
          {productDetails?.title||"Title"}
        </p>
        <p className="flex rounded bg-green-500 items-center justify-center font-semibold text-gray-900 px-1 text-base">{"4.2"}<AiTwotoneStar className="text-yellow-400 w-4 h-4"/></p>
      <p className="font-bold text-gray-100">${productDetails?.price||"39.99"}</p>
      </div>
    </>
  );
};

export default ProductData;
