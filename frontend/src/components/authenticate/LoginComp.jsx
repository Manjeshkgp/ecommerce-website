import React from "react";
import Button from "../buttons";

const LoginComp = ({ formData, setFormData, sendForm }) => {
  return (
    <>
      <input
        placeholder="Email"
        type="email"
        value={formData?.email}
        onChange={(e) =>
          setFormData((prev) => ({ ...formData, email: e.target.value }))
        }
        className="w-[96%] bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      />
      <input
        placeholder="Password"
        type="password"
        value={formData?.password}
        onChange={(e) =>
          setFormData((prev) => ({ ...formData, password: e.target.value }))
        }
        className="w-[96%] bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      />
      <div onClick={() => sendForm()}>
        <Button buttonContent="Login" />
      </div>
    </>
  );
};

export default LoginComp;
