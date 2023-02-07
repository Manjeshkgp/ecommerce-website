import React, { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import ProductData from "./ProductData";

const Products = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const res = await fetch(`http://fakestoreapi.com/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.status === 200) {
      setProducts(data);
    }
  };
  return (
    <>
      <div className="w-[96%] bg-[#33333321] hover:m-2 transition-all hover:shadow-xl hover:shadow-gray-500 mt-3 rounded h-80 flex flex-col justify-start items-center">
        <div className="w-full relative">
          <div className="absolute top-2 right-2">
            <AiOutlineHeart className="fill-gray-200 cursor-pointer rounded-full w-8 h-8" />
          </div>
          <img
            className="w-full rounded-t h-52 object-cover"
            src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80"
            alt=""
          />
        </div>
        <div className="flex w-[98%] justify-between items-start">
          <ProductData/>
        </div>
      </div>
    </>
  );
};

export default Products;