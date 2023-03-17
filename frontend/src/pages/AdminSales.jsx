import React, { useEffect, useState } from "react";
import BarChart from "../components/barcharts";
import Areachart from "../components/areacharts";
import Button from "../components/buttons";

const AdminSales = () => {
  const [days, setDays] = useState(7);
  const [graphData, setGraphData] = useState([]);
  const graphRequest = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/get-sales/${days}`);
    const result = await res.json();
    if(res.status===200){
      setGraphData(result);
    }
  }
  useEffect(()=>{graphRequest()},[])
  return (
    <>
      <div className="w-full h-full min-h-screen pt-28 relative flex flex-col lg:flex-row justify-evenly items-center bg-gray-900">
        <div className="absolute w-full bg-black h-14 top-0 flex flex-wrap justify-center items-center">
          <p className="text-xl text-bold text-white">
            Choose a Number to get Graph for the past Number of Days you chosen
          </p>
        </div>
        <div className="w-full absolute top-14 h-14 bg-black flex justify-evenly items-center">
          <input
            type="number"
            placeholder="Choose a Number"
            value={days}
            max={100}
            onChange={(e) => setDays(e.target.value)}
            className="w-[50%] p-1 rounded focus:outline-none"
          />
          <div onClick={()=>{graphRequest()}}>
            <Button buttonContent="Apply" />
          </div>
        </div>
        <BarChart graphData={graphData} barDataKey={"sales"}/>
        <Areachart graphData={graphData} areaDataKey={"sales"}/>
      </div>
    </>
  );
};

export default AdminSales;
