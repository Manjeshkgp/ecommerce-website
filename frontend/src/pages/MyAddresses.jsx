import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/buttons";
import Indianregions,{dummyData} from "../assets/Indianregions.js";
import Cookies from "js-cookie";
import { addAddress } from "../slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
const MyAddresses = () => {
  const initialAddress = {
    Name: "",
    Area: "",
    Region: "Jharkhand",
    City: "",
    Zipcode: "",
    Mobile: "",
  };
  const [popup, setPopup] = useState(false);
  const [address, setAddress] = useState(initialAddress);
  const allAddresses = useSelector((state) => state.user.user.addresses);
  const isAuthenticated = useSelector((state) => state.user.authenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const addAddressFetch = async() => {
    for (let key in address) {
      if (address[key].length < 5 || address[key] === "") {
        console.log(key,address[key])
          return alert("All fields are mandatory and needs more than 5 characters");
      }
  }
  console.log(address)
    const res = await fetch(`${process.env.REACT_APP_API_URL}/users/add-address`,{
      method:"POST",
      headers:{
        Authorization:`Bearer ${Cookies.get("jwt")}`,
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        address:address
      })
    })
    const msg = await res.json();
    if(res.status===200){
      dispatch(addAddress(address));
      setAddress(initialAddress);
      setPopup(false);
      return;
    }
    alert(msg);
  }
  return (
    <>
      <div
        className={
          popup
            ? "fixed z-50 inset-0 w-full h-full bg-transparent backdrop-blur-sm flex justify-center items-center transition-all duration-300"
            : "absolute w-0 h-0 bg-indigo-500 rounded-full transition-all"
        }
      >
        <form
          onSubmit={(e) => e.preventDefault()}
          className={
            popup
              ? "w-[22rem] md:w-96 h-[26rem] bg-gray-800 flex flex-col items-center gap-y-1 rounded-md border border-indigo-500"
              : "hidden"
          }
        >
          <input
            name="Name"
            value={address["Name"]}
            onChange={(e)=>setAddress({...address,[e.target.name]:e.target.value})}
            placeholder="Enter Name*"
            type="text"
            className="mt-8 w-[80%] p-1 bg-gray-900 text-gray-100 rounded focus:outline-none border border-gray-100 border-opacity-30 focus:border-opacity-100"
          />
          <input
            name="Area"
            value={address["Area"]}
            onChange={(e)=>setAddress({...address,[e.target.name]:e.target.value})}
            placeholder="House No, Street*"
            type="text"
            className="mt-4 w-[80%] p-1 bg-gray-900 text-gray-100 rounded focus:outline-none border border-gray-100 border-opacity-30 focus:border-opacity-100"
          />
          <div className="relative w-[80%] mt-4  border-none">
            <select
              name="Region"
              value={address["Region"]}
              onChange={(e) => {
                setAddress({...address,[e.target.name]:e.target.value})
              }}
              className="bg-gray-600 text-gray-400 appearance-none border-none inline-block p-2 rounded leading-tight w-full"
            >
              {Indianregions.map((region) => (
                <option key={region}>{region}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
              <i className="fas fa-chevron-down text-gray-400"></i>
            </div>
          </div>
          <input
            name="City"
            value={address["City"]}
            onChange={(e)=>setAddress({...address,[e.target.name]:e.target.value})}
            placeholder="Enter City*"
            type="text"
            className="mt-4 w-[80%] p-1 bg-gray-900 text-gray-100 rounded focus:outline-none border border-gray-100 border-opacity-30 focus:border-opacity-100"
          />
          <input
            name="Zipcode"
            value={address["Zipcode"]}
            onChange={(e)=>setAddress({...address,[e.target.name]:e.target.value})}
            placeholder="Enter Zipcode*"
            type="text"
            className="mt-4 w-[80%] p-1 bg-gray-900 text-gray-100 rounded focus:outline-none border border-gray-100 border-opacity-30 focus:border-opacity-100"
          />
          <input
            name="Mobile"
            value={address["Mobile"]}
            onChange={(e)=>setAddress({...address,[e.target.name]:e.target.value})}
            placeholder="Enter Mobile No*"
            type="text"
            className="mt-4 w-[80%] p-1 bg-gray-900 text-gray-100 rounded focus:outline-none border border-gray-100 border-opacity-30 focus:border-opacity-100"
          />
          <div className="w-[84%] mt-4 flex-wrap flex justify-around items-center">
            <div onClick={()=>{setAddress(initialAddress);setPopup(false)}}>
              <Button buttonContent={"Cancel"} />
            </div>
            <div htmlFor="submit" onClick={() => addAddressFetch()}>
              <Button buttonContent={"Save"} />
            </div>
            <div onClick={()=>setAddress(dummyData)}>
              <Button buttonContent={"Add Dummy Data"} />
            </div>
          </div>
        </form>
      </div>
      <motion.section
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        exit={{ x: "100%", transition: { duration: 0.1 } }}
        className="text-gray-400 min-h-[calc(100vh-10rem)] bg-gray-900 body-font"
      >
        <div className="conatiner px-5 py-24 flex flex-col items-center">
          <h1 className="text-3xl font-medium title-font text-white mb-12 text-center">
            My Addresses
          </h1>
          {isAuthenticated?<div onClick={() => setPopup(true)}>
            <Button className="text-2xl" buttonContent={"Add Address"} />
          </div>:null}
          {isAuthenticated?<div className="my-4 flex flex-wrap justify-around items-center gap-y-4 w-[96%]">
            {allAddresses.length===0?(<>
            <p className="text-3xl">No Addresses Available, Please Add One</p>
            </>):null}
            {allAddresses?.map((singleAddress)=>(<div className="w-[96%] pt-4 pb-8 md:w-[48%] lg:w-[32%] bg-gray-800 rounded-md flex flex-col items-center gap-y-2">
              <input type="text" value={singleAddress?.Name} readOnly className="mt-4 w-[80%] p-1 bg-gray-900 text-gray-100 rounded focus:outline-none border border-gray-100 border-opacity-30 focus:border-opacity-100"/>
              <input type="text" value={singleAddress?.Area} readOnly className="mt-4 w-[80%] p-1 bg-gray-900 text-gray-100 rounded focus:outline-none border border-gray-100 border-opacity-30 focus:border-opacity-100"/>
              <input type="text" value={singleAddress?.Region} readOnly className="mt-4 w-[80%] p-1 bg-gray-900 text-gray-100 rounded focus:outline-none border border-gray-100 border-opacity-30 focus:border-opacity-100"/>
              <input type="text" value={singleAddress?.City} readOnly className="mt-4 w-[80%] p-1 bg-gray-900 text-gray-100 rounded focus:outline-none border border-gray-100 border-opacity-30 focus:border-opacity-100"/>
              <input type="text" value={singleAddress?.Zipcode} readOnly className="mt-4 w-[80%] p-1 bg-gray-900 text-gray-100 rounded focus:outline-none border border-gray-100 border-opacity-30 focus:border-opacity-100"/>
              <input type="text" value={singleAddress?.Mobile} readOnly className="mt-4 w-[80%] p-1 bg-gray-900 text-gray-100 rounded focus:outline-none border border-gray-100 border-opacity-30 focus:border-opacity-100"/>
            </div>))}
          </div>:<>
          <div className="my-4 flex flex-wrap justify-around items-center gap-y-4 w-[96%]">
            <p className="text-3xl">Please <Link to="/authenticate" className="underline underline-offset-4 hover:text-gray-50">Login</Link> to Add/View Address</p>
          </div>
          </>}
        </div>
      </motion.section>
    </>
  );
};

export default MyAddresses;
