import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Addresspopup = ({
  popup,
  setPopup,
  setBuyer,
  setBuypopup
}) => {
    const addresses = useSelector((state)=>state.user.user.addresses);
  return (
    <div
      className={
        popup
          ? "fixed transition-all duration-300 w-full h-full z-40 flex justify-center items-center bg-[#a5b4fc2b] backdrop-blur inset-0"
          : "w-0 absolute h-0 transition-all"
      }
    >
      <div
        className={
          popup
            ? "w-80 h-96 border relative border-indigo-500 bg-gray-800 rounded-md flex flex-col items-center gap-2 overflow-y-scroll"
            : "hidden"
        }
      >
        <div
          onClick={() => {
            setPopup(false);
          }}
          className="absolute top-5 right-2 cursor-pointer p-6"
        >
          <div className="absolute top-0 right-0 h-[2.5px] rounded-sm w-8 bg-indigo-600 rotate-45"></div>
          <div className="absolute top-0 right-0 h-[2.5px] rounded-sm w-8 bg-indigo-600 -rotate-45"></div>
        </div>{" "}
        <p className="text-xl mt-2 text-gray-100 font-semibold">
          Select Address
        </p>
        {addresses?.length===0?<>
        <p className="font-semibold text-gray-100">You haven't added any address yet</p>
        <Link className="py-1 px-2 text-xl hover:bg-indigo-600 hover:text-gray-100 font-bold text-gray-300 bg-indigo-500 rounded" to={`/addresses`}>Add Now</Link>
        </>:addresses?.map((address) => (
          <>
            <div
              onClick={() => {
                setBuyer(address);
                setPopup(false);
                setBuypopup(true);
              }}
              className="bg-gray-600 cursor-pointer hover:bg-gray-700 w-[96%] active:transition-all active:duration-[400ms] active:bg-green-600 h-24 text-gray-50 rounded overflow-y-scroll"
            >
              <p className="text-xs ml-4 mt-1">{address?.Name}</p>
              <p className="text-xs ml-4">{address?.Area}</p>
              <p className="text-xs ml-4">{address?.Region}</p>
              <p className="text-xs ml-4">{address?.City}</p>
              <p className="text-xs ml-4">{address?.Zipcode}</p>
              <p className="text-xs ml-4">{address?.Mobile}</p>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Addresspopup;
