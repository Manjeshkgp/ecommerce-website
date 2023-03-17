import React, { useState } from "react";
import Button from "../components/buttons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { makeAdmin } from "../slices/userSlice";
import cookies from "js-cookie"

const AdminLogin = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginFunction = async() => {
    const requiredBody = {
        email:email,
        password:password,
    }
    const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/login`,{
        method:"POST",
        headers:{ 'Content-Type': 'application/json' },
        body:JSON.stringify(requiredBody),
    });
    const data = await res.json();
    if(res.status===200){
        cookies.set("adminToken",data.token);
        cookies.set("email",requiredBody.email)
        dispatch(makeAdmin());
        alert("login successful");
        navigate("/admin/dashboard",{replace:true});
    }else{
        alert("Login details are incorrect");
    }
  }

  return (
    <>
      <div className="bg-gray-800 w-full h-screen flex justify-center items-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(email,password)
            loginFunction();
          }}
          className="w-80 h-96 bg-[rgba(216,225,224,0.12)] backdrop-blur-md rounded-md border border-[rgb(216,255,250)] flex flex-col justify-evenly items-center"
        >
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="admin email"
            // className="w-[96%] p-1 rounded focus:outline-none"
        className="w-[96%] bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"

          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="admin password"
            // className="w-[96%] p-1 rounded focus:outline-none"
        className="w-[96%] bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"

          />
          <div htmlFor="submit">
            <Button buttonContent="Login"></Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminLogin;
