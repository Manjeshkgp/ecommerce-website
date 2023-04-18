import React from "react";
import { useNavigate } from "react-router-dom";

const Brand = ({brand,slogan,img}) => {
  const navigate = useNavigate();
  return (
    <>
      <div onClick={()=>navigate(`/brands/${brand}`)} className="flex cursor-pointer md:col-span-1 w-[90%] bg-[rgba(129,141,248,0.35)] text-gray-200 shadow-lg hover:shadow-gray-600 hover:scale-110 hover:transition-all hover:duration-400 transition-all rounded">
        <img
          src={`${img}`}
          alt=""
          className="h-20 w-20 object-contain bg-white object-center rounded"
          onError={(e)=>e.currentTarget.src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80"}
        />
        <div className="flex flex-col">
          <p className="font-semibold text-lg ml-2">{brand}</p>
          <p className="text-base ml-2">
            {slogan}
          </p>
        </div>
      </div>
    </>
  );
};

export default Brand;
