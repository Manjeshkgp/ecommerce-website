import React from "react";
import Button from "../buttons";
import { useSelector } from "react-redux";

const ProductData = ({productDetails}) => {
  const user = useSelector((state)=>state.user);
  const admin = user.admin;
  return (
    <>
      <div className="flex flex-col md:max-w-[70%]">
        <p className="font-semibold">{productDetails?.title||"Title"}</p>
        <p
          style={{ WebkitLineClamp: 1 }}
          className="hidden md:block text-ellipsis whitespace-nowrap overflow-hidden text-xs"
        >
          {productDetails?.shortDescription||"Short Description goes long so long so so long"}
        </p>
        <p>Rating</p>
        <div className="rounded-3xl">
          {!admin?<Button buttonContent="Add to Cart" />:""}
        </div>
      </div>
      <p className="font-bold text-lg">${productDetails?.price||"39.99"}</p>
    </>
  );
};

export default ProductData;
