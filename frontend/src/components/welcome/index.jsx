import React, { useState } from "react";
import LeftRightScroll from "./LeftRightScroll";
import Scrollindicaters from "./Scrollindicaters";

const Welcome = () => {
  const slides = [
    {
      url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80",
    },

    {
      url: "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80",
    },
  ];
  const [slideNum, setSlideNum] = useState(0);
  const increaseSlide = () => {
    if (slideNum + 1 === slides.length) {
      setSlideNum(0);
      return;
    }
    setSlideNum((prev) => prev + 1);
  };
  const decreaseSlide = () => {
    if (slideNum === 0) {
      setSlideNum(slides.length - 1);
      return;
    }
    setSlideNum((prev) => prev - 1);
  };
  return (
    <div className="overflow-x-hidden">
      <div className="w-screen h-[22rem] md:h-[30rem] bg-gray-900 flex justify-center items-center">
        <div className="relative">
          <Scrollindicaters slides={slides} slideNum={slideNum} setSlideNum={setSlideNum}/>
          <LeftRightScroll increaseSlide={increaseSlide} decreaseSlide={decreaseSlide}/>
          <img
            src={slides[slideNum].url}
            alt="products"
            className="h-80 w-80 md:h-[28rem] md:w-[80vw] object-cover rounded hover:shadow-2xl hover:shadow-black shadow-2xl shadow-gray-900"
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
