import React from "react";
import { AiFillHeart, AiOutlineHeart, AiTwotoneStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addOrRemove } from "../../slices/wishlistSlice";

const ProductData = ({ productDetails, averageRate, admin,isAuthenticated,navigate }) => {
  const wishlist = useSelector((state) => state.wishlist.products);
  const dispatch = useDispatch();
  const updateWishlist = (productDetails) => {
    if(!isAuthenticated){
      return navigate("/authenticate");
    }
    dispatch(addOrRemove(productDetails));
  }
  return (
    <>
      <div className="flex flex-col ml-1 mt-1 items-start w-full relative cursor-pointer">
        {!admin ? (
          <div
            onClick={() => updateWishlist(productDetails)}
            className="absolute bottom-0 right-2"
          >
            {wishlist.some((obj) => obj._id === productDetails?._id) ===
            true ? (
              <AiFillHeart className="h-8 w-8 text-red-600" />
            ) : (
              <AiOutlineHeart className="h-8 w-8 text-red-600" />
            )}
          </div>
        ) : null}
        <div className="border-b w-full py-1">
          <p className="text-sm font-semibold text-gray-300">
            {productDetails?.brand || "brand"}
          </p>
        </div>
        <p className="text-gray-100 font-bold">
          {productDetails?.title || "Title"}
        </p>
        <p className="flex rounded bg-indigo-500 items-center justify-center font-semibold text-gray-100 px-1 text-sm">
          {averageRate}
          <AiTwotoneStar className="text-yellow-400 w-[0.875rem] h-[0.875rem]" />
        </p>
        <p className="font-bold text-sm text-gray-100">
          ${productDetails?.price || "39.99"}
        </p>
      </div>
    </>
  );
};

export default ProductData;
