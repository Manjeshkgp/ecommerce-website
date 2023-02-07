import React from 'react';
import Button from '../buttons';
import MultiRangeSlider from "multi-range-slider-react";
import { useState } from 'react';

const Filter = () => {
    const [minValue, set_minValue] = useState(0);
    const [maxValue, set_maxValue] = useState(5000);
    const handleInput = (e) => {
        set_minValue(e.minValue);
        set_maxValue(e.maxValue);
    };
  return (<>
  <div className='hidden sticky min-h-screen lg:inline-flex flex-col left-0 max-h-[calc(100vh+8rem)] overflow-y-scroll w-52'>
    <div className="flex justify-around items-center w-full h-8 mt-2">
        <Button buttonContent="FILTERS"/>
        <Button buttonContent="CLEAR"/>
    </div>
    <form className='flex flex-col' onSubmit={(e)=>{e.preventDefault()}}>
    <div className="flex flex-col items-start">
        <p className='font-semibold text-center w-full underline'>SORT</p>
        <div className='flex'><input type="radio" name="" id="" className='ml-1'/><p className='ml-1'>From Low to High Price</p></div>
        <div className='flex'><input type="radio" name="" id="" className='ml-1'/><p className='ml-1'>From High to Low Price</p></div>
        <div className='flex'><input type="radio" name="" id="" className='ml-1'/><p className='ml-1'>Show Latest Products</p></div>
    </div>
    <div className="flex flex-col items-start">
        <p className='font-semibold text-center w-full underline'>RATING</p>
        <div className='flex'><input type="radio" name="" id="" className='ml-1'/><p className='ml-1'>4⭐ or More</p></div>
        <div className='flex'><input type="radio" name="" id="" className='ml-1'/><p className='ml-1'>3⭐ or More</p></div>
        <div className='flex'><input type="radio" name="" id="" className='ml-1'/><p className='ml-1'>2⭐ or More</p></div>
    </div>
    <div className="flex flex-col items-start">
        <p className='font-semibold text-center w-full underline'>RAM</p>
        <div className='flex w-full'><input type="range" className='w-full' name="" min={1} max={32} id="" /></div>
        <p className='w-full text-center text-sm font-semibold'>32 GB RAM</p>
    </div>
    <div className="flex flex-col items-start">
        <p className='font-semibold text-center w-full underline'>PRICING</p>
        <div className='flex w-full'><MultiRangeSlider
                    min={0}
                    max={5000}
                    step={1}
                    style={{boxShadow:"none",border:"none",outline:"none"}}
                    minValue={minValue}
                    maxValue={maxValue}
                    ruler={false}
                    label={false}
                    thumbLeftColor="#009fd9"
                    thumbRightColor="#009fd9"
                    barInnerColor="#009fd9"
                    barLeftColor="white"
                    barRightColor="white"
                    className="w-full"
                    onInput={(e) => {
                        handleInput(e);
                    }}
                /></div>
        <p className='w-full text-center text-sm font-semibold'>{minValue+","+maxValue}</p>
    </div>
    <div className="flex flex-col items-start">
        <p className='font-semibold text-center w-full underline'>PROCESSOR</p>
        <div className='flex'><input type="checkbox" name="" id="" className='ml-1'/><p className='ml-1'>AMD</p></div>
        <div className='flex'><input type="checkbox" name="" id="" className='ml-1'/><p className='ml-1'>Apple</p></div>
        <div className='flex'><input type="checkbox" name="" id="" className='ml-1'/><p className='ml-1'>Intel</p></div>
    </div>
    <div className="flex flex-col items-start">
        <p className='font-semibold text-center w-full underline'>POPULAR BRANDS</p>
        <div className='flex'><input type="checkbox" name="" id="" className='ml-1'/><p className='ml-1'>Apple</p></div>
        <div className='flex'><input type="checkbox" name="" id="" className='ml-1'/><p className='ml-1'>Acer</p></div>
        <div className='flex'><input type="checkbox" name="" id="" className='ml-1'/><p className='ml-1'>Asus</p></div>
        <div className='flex'><input type="checkbox" name="" id="" className='ml-1'/><p className='ml-1'>Dell</p></div>
        <div className='flex'><input type="checkbox" name="" id="" className='ml-1'/><p className='ml-1'>HP</p></div>
        <div className='flex'><input type="checkbox" name="" id="" className='ml-1'/><p className='ml-1'>Lenovo</p></div>
        <div className='flex'><input type="checkbox" name="" id="" className='ml-1'/><p className='ml-1'>MSI</p></div>
        <div className='flex'><input type="checkbox" name="" id="" className='ml-1'/><p className='ml-1'>Razer</p></div>
        <div className='flex'><input type="checkbox" name="" id="" className='ml-1'/><p className='ml-1'>Samsung</p></div>
        <div className='flex'><input type="checkbox" name="" id="" className='ml-1'/><p className='ml-1'>Sony</p></div>
    </div>
    </form>
  </div>
  </>)
}

export default Filter