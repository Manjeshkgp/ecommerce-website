import React, { useEffect, useState } from "react";
import Button from "../components/buttons";
import Cookies from "js-cookie";
import ReactAreaChart from "../components/reactAreaChart";
import ReactBarChart from "../components/reactBarChart"

const AdminSales = () => {
  const [days, setDays] = useState(7);
  const [graphData, setGraphData] = useState([]);
  const graphRequest = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/get-sales/${days}`,{
      method:"GET",
      headers:{
        Authorization:`Bearer ${Cookies.get("adminToken")}`
      }
    });
    const result = await res.json();
    if(res.status===200){
      setGraphData(result);
      console.log(result)
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
        <div className="w-[20rem] h-[16rem] md:h-[24rem] md:w-[30rem] flex justify-center items-center"><ReactAreaChart labels={graphData?.map((sale)=>(sale?.date))} dataNumberArr={graphData?.map((sale)=>(sale?.sales))} titleText={`Sales in the last ${days} days`} label={"Sales"}/></div>
          <div className="w-[20rem] h-[16rem] md:h-[24rem] md:w-[30rem] flex justify-center items-center"><ReactBarChart labels={graphData?.map((sale)=>(sale?.date))} dataNumberArr={graphData?.map((sale)=>(sale?.sales))} titleText={`Sales in the last ${days} days`} label={"Sales"}/></div>
      </div>
    </>
  );
};

export default AdminSales;
