import React, { useState } from "react";
import Button from "../components/buttons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { makeAdmin } from "../slices/userSlice";

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
    await res.json();
    if(res.status===200){
        dispatch(makeAdmin());
        alert("login successful");
        navigate("/admin-dashboard",{replace:true});
    }else{
        alert("Login details are incorrect");
    }
  }

  return (
    <>
      <div className="bg-gradient-to-bl from-transparent via-teal-400 to-transparent w-full h-screen flex justify-center items-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(email,password)
            loginFunction();
          }}
          className="w-80 h-96 bg-[rgba(216,225,224,0.3)] backdrop-blur-md rounded-md border border-[rgb(216,255,250)] flex flex-col justify-evenly items-center"
        >
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-[96%] p-1 rounded focus:outline-none"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-[96%] p-1 rounded focus:outline-none"
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
