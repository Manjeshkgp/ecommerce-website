import React, { useEffect, useState } from "react";
import { FiUsers } from "react-icons/fi";
import { SlOrganization } from "react-icons/sl";
import { AiOutlinePlus } from "react-icons/ai";
import { GiCash } from "react-icons/gi";
import { BsCartCheck } from "react-icons/bs";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Barchart from "../components/barcharts";
import Areachart from "../components/areacharts";
import ReactAreaChart from "../components/reactAreaChart";
import ReactPieChart from "../components/reactPieChart";

const AdminDashboard = () => {
  const [businessData, setBusinessData] = useState({});
  const [allOrdersArray,setAllOrdersArray] = useState([]);
  const [weekMostSold,setWeekMostSold] = useState([]);
  const [weekRevenue,setWeekRevenue] = useState(0);
  const [newPass, setNewPass] = useState({ password: "", retypePassword: "" });
  const forgetPasswordRequest = async () => {
    let newPassword;
    if (newPass.password === newPass.retypePassword) {
      newPassword = newPass.password;
    } else {
      alert("Both passwords that you'd written are not same");
      return;
    }
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/admin/forget-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:`Bearer ${Cookies.get("adminToken")}`
        },
        body: JSON.stringify({
          newPassword: newPassword,
        }),
      }
    );
    await res.json();
    if (res.status === 200) {
      alert(`Password Changed to, ${newPass.password}`);
      return;
    }
  };
  const getBusinessData = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/admin/business-data`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:`Bearer ${Cookies.get("adminToken")}`
        },
      }
    );
    const data = await res.json();
    setBusinessData(data);
  };
  const allOrdersGraph = async() => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/all-orders-graph/`,{
      method:"GET",
      headers:{
        Authorization:`Bearer ${Cookies.get("adminToken")}`
      }
    })
    const data = await res.json();
    if(res.status===200){
      setAllOrdersArray(data);
      // const testArrKeys = data.map(obj => Object.values(obj)[1]);
      // const testArrValues = data.map(obj => Object.values(obj)[0]);
      // console.log(testArrKeys);
      // console.log(testArrValues)
    }
  };
  const oneWeekRevenue = async () => {
    const presentDate = new Date();
    const sevenDaysAgo = new Date();sevenDaysAgo.setDate(presentDate.getDate()-7);sevenDaysAgo.setHours(0,0,0,0)
    const date2 = sevenDaysAgo.toISOString();
    const date1 = presentDate.toISOString();
    const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/total-revenue/${date1}/${date2}`,{
      method:"GET",
      headers:{
        Authorization:`Bearer ${Cookies.get("adminToken")}`
      }
    })
    const data = await res.json();
    if(res.status===200){
      setWeekRevenue(data.totalRevenue);
    }
  };
  const fetchThisWeekMostSelling = async () => {
    const presentDate = new Date();
    const sevenDaysAgo = new Date();sevenDaysAgo.setDate(presentDate.getDate()-7);sevenDaysAgo.setHours(0,0,0,0)
    const date2 = sevenDaysAgo.toISOString(); //Change Date to get data according to different date range
    const date1 = presentDate.toISOString();  //Change Date to get data according to different date range
    const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/most-selling-products/${date1}/${date2}`,{
      method:"GET",
      headers:{
        Authorization:`Bearer ${Cookies.get("adminToken")}`
      }
    })
    const data = await res.json();
    if(res.status===200){
      setWeekMostSold(data);
    }
  } 
  useEffect(() => {
    getBusinessData();
    oneWeekRevenue();
    allOrdersGraph();
    fetchThisWeekMostSelling();
  }, []);

  return (
    <>
      <div className="w-full h-full min-h-screen bg-gray-900 flex flex-col items-center">
        <section className="text-gray-400 w-full bg-gray-900 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col items-center mb-20 text-center">
              <p className="text-3xl text-gray-200 mb-4 font-medium">
                This Week Revenue: ${weekRevenue}
              </p>
              <p className="w-2/3 text-lg">
                See the data of your users, products, handle orders
                and sales as well. Check some graphical data for better
                analysis and prediction
              </p>
            </div>
            <div className="flex flex-wrap -m-4 text-center">
              <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                <div className="border-2 border-gray-800 px-4 py-6 rounded-lg">
                  <FiUsers className="text-center w-full h-14 my-1 pb-1 text-indigo-400" />
                  <h2 className="title-font font-medium text-3xl text-white">
                    {businessData?.totalUsers}
                  </h2>
                  <p className="leading-relaxed">Users</p>
                </div>
              </div>
              <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                <div className="border-2 border-gray-800 px-4 py-6 rounded-lg">
                  <SlOrganization className="text-center w-full h-14 my-1 pb-1 text-indigo-400" />
                  <h2 className="title-font font-medium text-3xl text-white">
                    {businessData?.totalProducts}
                  </h2>
                  <p className="leading-relaxed">Products</p>
                </div>
              </div>
              <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                <div className="border-2 border-gray-800 px-4 py-6 rounded-lg">
                  <BsCartCheck className="text-center w-full h-14 my-1 pb-1 text-indigo-400" />
                  <h2 className="title-font font-medium text-3xl text-white">
                    {businessData?.totalOrders}
                  </h2>
                  <p className="leading-relaxed">Active Orders</p>
                </div>
              </div>
              <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                <div className="border-2 border-gray-800 px-4 py-6 rounded-lg">
                  <GiCash className="text-center w-full h-14 my-1 pb-1 text-indigo-400" />
                  <h2 className="title-font font-medium text-3xl text-white">
                    {businessData?.totalSales}
                  </h2>
                  <p className="leading-relaxed">Sales</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="w-full h-40 flex justify-center items-center">
          <Link to="/admin/products/add" className="w-72 group hover:scale-110 transition-all duration-300 cursor-pointer rounded-md border-2 flex flex-col items-center justify-center border-gray-800 h-40">
            <p className="text-gray-300 text-xl group-hover:text-green-300 text-center">Add Product</p>
            <AiOutlinePlus className="w-20 h-20 group-hover:text-green-300 text-gray-300"/>
          </Link>
        </div>
        <div className="flex justify-around items-center flex-wrap w-full min-h-[16rem] h-full pt-20 bg-gray-900 text-gray-400">
          <Barchart graphData={allOrdersArray} barDataKey={"orders"}/>
          <div className="w-[20rem] h-[16rem] md:h-[24rem] md:w-[30rem] flex justify-center items-center"><ReactAreaChart labels={allOrdersArray?.map((order)=>(order?.date))} dataNumberArr={allOrdersArray?.map((order)=>(order?.orders))}/></div>
          <div className="w-full mt-8 h-[28rem] md:h-[30rem] md:w-full flex justify-center items-center"><ReactPieChart labels={weekMostSold?.map((sale)=>(sale?._id))} dataNumberArr={weekMostSold?.map((sale)=>(sale?.soldQuantity))}/></div>
        </div>
        <section className="text-gray-400 bg-gray-900 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
                Update Your Password in a Single Click
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
                gentrify, subway tile poke farm-to-table. Franzen you probably
                haven't heard of them man bun deep.
              </p>
            </div>
            <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:px-0 items-end sm:space-x-4 sm:space-y-0 space-y-4">
              <div className="relative sm:mb-0 flex-grow w-full">
                <label className="leading-7 text-sm text-gray-400">
                  New Password
                </label>
                <input
                  type="text"
                  name="password"
                  value={newPass?.password}
                  onChange={(e) => {
                    setNewPass({ ...newPass, [e.target.name]: e.target.value });
                  }}
                  className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative sm:mb-0 flex-grow w-full">
                <label className="leading-7 text-sm text-gray-400">
                  Retype Password
                </label>
                <input
                  type="text"
                  name="retypePassword"
                  value={newPass?.retypePassword}
                  onChange={(e) => {
                    setNewPass({ ...newPass, [e.target.name]: e.target.value });
                  }}
                  className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <button
                onClick={() => {
                  forgetPasswordRequest();
                }}
                className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Update
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AdminDashboard;
