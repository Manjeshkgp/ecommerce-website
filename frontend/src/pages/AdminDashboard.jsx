import React, { useEffect, useState, useRef } from "react";
import { BsFillInboxesFill } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { GrWorkshop } from "react-icons/gr";
import { FcSalesPerformance } from "react-icons/fc";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "../components/buttons";

const AdminDashboard = () => {
  const productRef = useRef(null);
  // console.log(productRef.current.title.value)
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [businessData, setBusinessData] = useState({});
  const [newPass,setNewPass] = useState({password:"",retypePassword:""});
  const forgetPasswordRequest = async() => {
    console.log(newPass)
    let newPassword;
    if(newPass.password===newPass.retypePassword){
      newPassword=newPass.password
    }else{
     alert("Both passwords that you'd written are not same");
     return;
    }
    const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/forget-password`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        newPassword:newPassword,
      })
    })
    await res.json();
    if(res.status===200){
      alert(`Password Changed to, ${newPass.password}`);
      return;
    }
  }
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
      return navigate("/admin-login");
    }
    getBusinessData();
  }, []);

  const fileLimit = (e) => {
    if (Array.from(e.target.files).length > 5) {
      e.preventDefault();
      alert("Can't select more than 5 files");
    }
  };

  const addProduct = async () => {
    let formdata = new FormData();
    formdata.append("title", productRef.current.title.value);
    formdata.append("description", productRef.current.description.value);
    formdata.append("shortDescription",productRef.current.shortDescription.value);
    formdata.append("price", productRef.current.price.value);
    formdata.append("brand", productRef.current.brand.value);
    Array.from(productRef.current.files.files).forEach(file => { // loop through each selected file using map function
      formdata.append('files', file); // append each file to the form data object with a key 'files'
    })
    formdata.append("primaryImage", productRef.current.primaryImage.files[0]);
    const requestOptions = {
      method: 'POST',
      body: formdata,
      headers:{enctype: "multipart/form-data; boundary=???"},
      redirect: 'follow'
    };
    const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/add-product`,requestOptions);
    await res.json();
    if(res.status===200){
      alert("Product Added successfully")
    }
    else if(res.status === 400){
      alert("Some error occured")
    }
  };

  return (
    <>
      <div className="w-full h-full min-h-screen bg-gradient-to-bl from-transparent via-teal-400 to-transparent flex flex-col items-center">
        <div className="flex flex-col md:flex-row w-[96%] justify-around items-center flex-wrap bg-green-300 h-full min-h-[10rem] mt-2">
          <div className="w-[96%] md:w-[48%] lg:w-[24%] h-36 bg-gradient-to-bl from-blue-500 to-purple-500 rounded-md my-2 flex items-center justify-center cursor-pointer">
            <Link to="/admin/users">
              <p className="text-lg ml-1 flex items-center">
                {businessData?.totalUsers?.length}
                <BiUserCircle />
                USERS
              </p>
            </Link>
          </div>
          <div className="w-[96%] md:w-[48%] lg:w-[24%] h-36 bg-gradient-to-bl from-red-500 to-purple-500 rounded-md my-2 flex items-center justify-center cursor-pointer">
            <Link to="/admin/sellers">
              <p className="text-lg ml-1 flex items-center">
                {businessData?.totalSellers?.length}
                <GrWorkshop />
                SELLERS
              </p>
            </Link>
          </div>
          <div className="w-[96%] md:w-[48%] lg:w-[24%] h-36 bg-gradient-to-bl from-pink-500 to-purple-500 rounded-md my-2 flex items-center justify-center cursor-pointer">
            <Link to="/admin/products">
              <p className="text-lg ml-1 flex items-center">
                {businessData?.totalProducts?.length}
                <BsFillInboxesFill />
                PRODUCTS
              </p>
            </Link>
          </div>
          <div className="w-[96%] md:w-[48%] lg:w-[24%] h-36 bg-gradient-to-bl from-orange-500 to-purple-500 rounded-md my-2 flex items-center justify-center cursor-pointer">
            <Link to="/admin/sales">
              <p className="text-lg ml-1 flex items-center">
                {businessData?.totalSales?.length}
                <FcSalesPerformance />
                SALES
              </p>
            </Link>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-evenly items-center bg-green-300 w-[96%] h-40 lg:h-12 mt-2">
        <input
              type="password"
              name="password"
              value={newPass.password}
              onChange={(e)=>{setNewPass({...newPass,[e.target.name]:e.target.value})}}
              placeholder="New Password"
              className="w-[96%] lg:w-[30%] p-1 rounded focus:outline-none"
            />
            <input
              type="password"
              name="retypePassword"
              value={newPass.retypePassword}
              onChange={(e)=>{setNewPass({...newPass,[e.target.name]:e.target.value})}}
              placeholder="Write the Password Again"
              className="w-[96%] lg:w-[30%] p-1 rounded focus:outline-none"
            />
          <div onClick={()=>{forgetPasswordRequest()}}><Button buttonContent="Change Password"></Button></div>
        </div>
        <form
          ref={productRef}
          onSubmit={(e) => {
            e.preventDefault();
            addProduct();
          }}
          className="flex flex-col md:flex-row w-[96%] justify-around items-center flex-wrap bg-green-300 h-full min-h-[20rem] mt-2"
        >
          <div className="w-[96%] md:w-[48%] lg:w-[24%] h-40 md:h-60 lg:h-80 bg-gradient-to-bl from-blue-500 to-purple-500 rounded-md my-2 flex flex-col items-center justify-evenly cursor-pointer">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="w-[96%] p-1 rounded focus:outline-none"
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              className="w-[96%] p-1 rounded focus:outline-none"
            />
            <input
              type="text"
              name="shortDescription"
              placeholder="Short Description"
              className="w-[96%] p-1 rounded focus:outline-none"
            />
          </div>
          <div className="w-[96%] md:w-[48%] lg:w-[24%] h-80 bg-gradient-to-bl from-blue-500 to-purple-500 rounded-md my-2 flex flex-col items-center justify-evenly cursor-pointer">
            <input
              type="number"
              name="price"
              placeholder="Price e.g 10 -> $10"
              className="w-[96%] p-1 rounded focus:outline-none"
            />
            <input
              type="file"
              name="primaryImage"
              className="w-[96%] p-1 rounded focus:outline-none"
            />
            <input
              type="file"
              name="files"
              multiple
              onChange={(e) => {
                fileLimit(e);
              }}
              className="w-[96%] p-1 rounded focus:outline-none"
            />
          </div>
          <div className="w-[96%] md:w-[48%] lg:w-[24%] h-80 bg-gradient-to-bl from-blue-500 to-purple-500 rounded-md my-2 flex flex-col items-center justify-evenly cursor-pointer">
            <input
              type="text"
              name="brand"
              placeholder="Laptop Brand"
              className="w-[96%] p-1 rounded focus:outline-none"
            />
          </div>
          <div className="w-[96%] md:w-[48%] lg:w-[24%] h-80 bg-gradient-to-bl from-blue-500 to-purple-500 rounded-md my-2 flex flex-col items-center justify-evenly cursor-pointer">
            <div htmlFor="submit">
              <Button buttonContent="Add Product"></Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminDashboard;
