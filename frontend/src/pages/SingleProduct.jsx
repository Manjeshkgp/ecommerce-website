import React, { useEffect, useState } from "react";
import { BiCartAdd } from "react-icons/bi";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../slices/cartSlice";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { AiTwotoneStar, AiOutlineStar } from "react-icons/ai";
import Button from "../components/buttons";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [mainImg, setMainImg] = useState("");
  const [imgArray, setImgArray] = useState([]);
  const [productData, setProductData] = useState({});
  const [averageRate, setAverageRate] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [alreadyRated, setAlreadyRated] = useState(false);
  const user = useSelector((state) => state.user);
  const isAuthenticated = user.authenticated;
  const addedToCart = () => {
    toast("Product added to Cart");
  };
  const productPurchased = () => {
    toast("Product Purchased, You'll get a Call or email soon");
  };
  const rateSetting = () => {
    setAlreadyRated(
      productData?.rating?.some((obj) => obj?.email === Cookies.get("email"))
    );
    setUserRating(
      productData?.rating?.find((obj) => obj?.email === Cookies.get("email"))
        ?.rate
    );
  };
  const getProduct = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/users/get-a-product`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
        }),
      }
    );
    const data = await res.json();
    setMainImg(data?.primaryImage);
    setImgArray([data?.primaryImage, ...data?.images]);
    setProductData(data);
  };
  const buyProduct = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/users/buy-product`,
      {
        method: "POST",
        body: JSON.stringify({
          buyer: Cookies.get("email"),
          products: [{ ...productData, numberOfProducts: 1 }],
          totalPrice: productData?.price,
        }),
        headers: {
          Authorization: `Bearer ${Cookies.get("jwt")}`,
          "Content-Type": "application/json",
        },
      }
    );
    await res.json();
    if (res.status === 200) {
      productPurchased();
    }
    if (res.status === 401) {
      alert("Login First Then Purchase");
    }
  };
  const averageRating = (ratings) => {
    let totalRating = 0;
    let average;
    if (ratings?.length === 0) {
      setAverageRate(0);
      return;
    }
    for (let i = 0; i < ratings?.length; i++) {
      totalRating += ratings[i]?.rate;
    }

    average = totalRating / ratings?.length;
    setAverageRate(average);
    return;
  };
  const rateThatProduct = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/users/rate-a-product/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("jwt")}`,
        },
        body: JSON.stringify({
          email: Cookies.get("email"),
          rate: userRating,
        }),
      }
    );
    await res.json();
    if (res.status === 200) {
      getProduct();
    } else if (res.status === 405) {
      alert("Some Error Occured");
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  useEffect(() => {
    averageRating(productData?.rating);
  }, [productData]);
  useEffect(() => {
    rateSetting();
  }, [productData]);

  return (
    <>
      <ToastContainer />
      <section className="text-gray-400 bg-gray-900 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto lg:max-h-screen h-64 object-cover object-center rounded"
              src={`${process.env.REACT_APP_API_URL}/${mainImg}`}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {productData?.shortDescription}
              </h2>
              <h1 className="text-white text-3xl title-font font-medium mb-1">
                {productData?.title}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <p className="flex rounded bg-indigo-500 items-center justify-center font-semibold text-gray-100 px-1 text-sm">
                    {averageRate}
                    <AiTwotoneStar className="text-yellow-400 w-[0.875rem] h-[0.875rem]" />
                  </p>
                  <span className="ml-3">
                    {productData?.rating?.length} Ratings
                  </span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-800 text-gray-500 space-x-2">
                  <FacebookShareButton url={window.location.href}>
                    <FacebookIcon size={30} />
                  </FacebookShareButton>
                  <TwitterShareButton url={window.location.href}>
                    <TwitterIcon size={30} />
                  </TwitterShareButton>
                  <WhatsappShareButton url={window.location.href}>
                    <WhatsappIcon size={30} />
                  </WhatsappShareButton>
                </span>
              </div>
              <p className="leading-relaxed">
                {productData?.description ||
                  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque excepturi sunt iure modi, cumque atque totam tempora culpa facilis nam consequatur eos. Minima itaque dolorum deserunt voluptatibus ea libero tempora!"}
              </p>
              <div className="flex gap-4 mt-6 items-center pb-5 border-b-2 border-gray-800 mb-5">
                {imgArray.map((singleImg, index) => (
                  <img
                    src={`${process.env.REACT_APP_API_URL}/${singleImg}`}
                    onClick={() => {
                      setMainImg(singleImg);
                    }}
                    key={index}
                    className="w-16 h-16 object-cover object-center rounded-sm cursor-pointer"
                    alt=""
                  />
                ))}
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-white">
                  ${productData?.price}
                </span>
                <button
                  onClick={() => {
                    isAuthenticated
                      ? buyProduct()
                      : navigate("/authenticate", { replace: true });
                  }}
                  className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => {
                    if (isAuthenticated === true) {
                      dispatch(
                        increment({ ...productData, numberOfProducts: 1 })
                      );
                      addedToCart();
                    } else {
                      navigate("/authenticate", { replace: true });
                    }
                  }}
                  className="rounded-full active:bg-indigo-500 active:text-white w-10 h-10 bg-gray-800 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                >
                  <BiCartAdd className="w-7 h-7" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full pb-10 flex flex-col items-center bg-gray-900 body-font text-gray-400 overflow-hidden">
        {alreadyRated ? (
          <>
            <p className="text-xl text-gray-300 font-medium underline underline-offset-4 my-2">
              Your Rating to this Product
            </p>
            <div className="flex mb-2">
              {[...Array(5)]?.map((star, i) => (
                <span className="cursor-pointer" key={i}>
                  {i + 1 <= userRating ? (
                    <AiTwotoneStar className="text-yellow-400 w-7 h-7" />
                  ) : (
                    <AiOutlineStar className="w-7 h-7" />
                  )}
                </span>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="text-xl text-gray-300 font-medium underline underline-offset-4 my-2">
              Give Rating To this Product
            </p>
            <div className="flex mb-2">
              {[...Array(5)]?.map((star, i) => (
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    setUserRating(i + 1);
                  }}
                  key={i}
                >
                  {i + 1 <= userRating ? (
                    <AiTwotoneStar className="text-yellow-400 w-7 h-7" />
                  ) : (
                    <AiOutlineStar className="w-7 h-7" />
                  )}
                </span>
              ))}
            </div>
            <div className="mb-2">
              <div
                onClick={() => {
                  if (userRating !== 0) {
                    rateThatProduct();
                  }
                }}
              >
                <Button buttonContent="Submit Rating"></Button>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default SingleProduct;
