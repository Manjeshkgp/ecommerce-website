import React, { useEffect, useState } from "react";
import { BsFillInboxesFill } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { GrWorkshop } from "react-icons/gr";
import { FcSalesPerformance } from "react-icons/fc";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Barcharts from "../components/barcharts"

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [businessData, setBusinessData] = useState({});
  const getBusinessData = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/admin/business-data`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    setBusinessData(data);
  };
  useEffect(() => {
    if (user.admin === false) {
        alert("Login first then come here");
        return navigate('/');
    }
      getBusinessData();
  }, []);

  return (
    <>
      <div className="w-full h-full min-h-screen bg-gradient-to-bl from-transparent via-teal-400 to-transparent flex flex-col items-center">
        <div className="flex flex-col md:flex-row w-[96%] justify-around items-center flex-wrap bg-green-300 h-full min-h-[10rem] mt-2">
          <div className="w-[96%] md:w-[48%] lg:w-[24%] h-36 bg-gradient-to-bl from-blue-500 to-purple-500 rounded-md my-2 flex items-center justify-center cursor-pointer">
            <p className="text-lg ml-1 flex items-center">
              {businessData?.totalUsers?.length}
              <BiUserCircle />
              USERS
            </p>
          </div>
          <div className="w-[96%] md:w-[48%] lg:w-[24%] h-36 bg-gradient-to-bl from-red-500 to-purple-500 rounded-md my-2 flex items-center justify-center cursor-pointer">
            <p className="text-lg ml-1 flex items-center">
              {businessData?.totalSellers?.length}
              <GrWorkshop />
              SELLERS
            </p>
          </div>
          <div className="w-[96%] md:w-[48%] lg:w-[24%] h-36 bg-gradient-to-bl from-pink-500 to-purple-500 rounded-md my-2 flex items-center justify-center cursor-pointer">
            <p className="text-lg ml-1 flex items-center">
              {businessData?.totalProducts?.length}
              <BsFillInboxesFill />
              PRODUCTS
            </p>
          </div>
          <div className="w-[96%] md:w-[48%] lg:w-[24%] h-36 bg-gradient-to-bl from-orange-500 to-purple-500 rounded-md my-2 flex items-center justify-center cursor-pointer">
            <p className="text-lg ml-1 flex items-center">
              {businessData?.totalSales?.length}
              <FcSalesPerformance />
              SALES
            </p>
          </div>
        </div>
        <div className="mt-2">
        <Barcharts/>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
