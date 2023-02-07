import React from "react";

const Scrollindicaters = ({slides,slideNum,setSlideNum}) => {
  return (
    <>
      <div className="absolute bottom-4 left-[calc(50%-4rem)] h-4 w-32 flex justify-around items-center">
        {slides.map((singleSlide, index) => (
          <div
            key={index}
            onClick={() => setSlideNum(index)}
            className={
              slideNum === index
                ? "rounded-full w-3 h-3 bg-gray-200 cursor-pointer"
                : "rounded-full w-3 h-3 bg-gray-200 opacity-60 cursor-pointer hover:opacity-100"
            }
          ></div>
        ))}
      </div>
    </>
  );
};

export default Scrollindicaters;
