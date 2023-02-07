import React from "react";
import { AiFillRightCircle, AiFillLeftCircle } from "react-icons/ai";

const LeftRightScroll = ({ decreaseSlide, increaseSlide }) => {
  return (
    <>
      <div
        onClick={() => decreaseSlide()}
        className="opacity-40 hover:opacity-100 absolute h-full w-12 left-0 flex justify-center items-center hover:bg-[rgba(11,11,31,0.38)] rounded-l"
      >
        <AiFillLeftCircle className="w-8 h-8 fill-gray-300 hover:fill-gray-100 active:fill-white cursor-pointer" />
      </div>
      <div
        onClick={() => increaseSlide()}
        className="opacity-40 hover:opacity-100 absolute h-full w-12 right-0 flex justify-center items-center hover:bg-[rgba(11,11,31,0.38)] rounded-r"
      >
        <AiFillRightCircle className="w-8 h-8 fill-gray-300 hover:fill-gray-100 active:fill-white cursor-pointer" />
      </div>
    </>
  );
};

export default LeftRightScroll;
