import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./DeleteProduct.css";

const DeleteProduct = () => {
    const navigate = useNavigate();
  const { id } = useParams();
  const deleteRequest = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/delete-product`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${Cookies.get("adminToken")}`
        },
        body:JSON.stringify({
            _id:id
        })
    })
    await res.json();
    if(res.status===200){
        navigate("/admin/products");
    }
  }
  useEffect(()=>{deleteRequest()},[])
  return (
    <>
      <div className="flex flex-col justify-evenly items-center w-full h-screen">
        <div className="load"></div>
        <div className="text-center">Deleting...</div>
      </div>
    </>
  );
};

export default DeleteProduct;
