import React from "react";
import Button from "../buttons";

const ProductData = () => {
  return (
    <>
      <div className="flex flex-col md:max-w-[70%]">
        <p className="font-semibold">Title</p>
        <p
          style={{ WebkitLineClamp: 1 }}
          className="hidden md:block text-ellipsis whitespace-nowrap overflow-hidden text-xs"
        >
          Short Description goes long so long so so long
        </p>
        <p>Rating</p>
        <div className="rounded-3xl">
          <Button buttonContent="Add to Cart" />
        </div>
      </div>
      <p className="font-bold text-lg">$39.99</p>
    </>
  );
};

export default ProductData;
