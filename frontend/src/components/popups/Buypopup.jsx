import React from "react";
import Button from "../buttons";

const Buypopup = ({buypopup,setBuypopup,buyProduct}) => {
  return (
    <div
      className={
        buypopup
          ? "inset-0 bg-[#a5b4fc2b] flex justify-center items-center transition-all duration-500 backdrop-blur w-full h-full fixed z-50"
          : "w-0 h-0 absolute transition-all"
      }
    >
      <div
        className={
          buypopup
            ? "flex gap-5 h-40 w-60 bg-indigo-500 rounded-md border-2 border-[#3be6be] flex-col justify-center items-center"
            : "hidden"
        }
      >
        <div onClick={() => buyProduct()}>
          <Button buttonContent="Buy Now" />
        </div>
        <div onClick={() => setBuypopup(false)}>
          <Button buttonContent="Cancel" />
        </div>
      </div>
    </div>
  );
};

export default Buypopup;
