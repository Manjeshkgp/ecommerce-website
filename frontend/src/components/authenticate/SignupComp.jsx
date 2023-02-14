import React from "react";
import Button from "../buttons";

const SignupComp = ({ formData, setFormData, sendForm }) => {
  return (
    <>
      <input
        placeholder="Name"
        type="text"
        onChange={(e) =>
          setFormData((prev) => ({ ...formData, name: e.target.value }))
        }
        className="w-[96%] placeholder:text-gray-500 rounded pl-1 border-2 border-indigo-900 border-opacity-5 focus:outline-none bg-gradient-to-bl via-teal-400 from-indigo-500 to-transparent"
      />
      <input
        placeholder="Email"
        type="email"
        onChange={(e) =>
          setFormData((prev) => ({ ...formData, email: e.target.value }))
        }
        className="w-[96%] placeholder:text-gray-500 rounded pl-1 border-2 border-indigo-900 border-opacity-5 focus:outline-none bg-gradient-to-bl via-teal-400 from-indigo-500 to-transparent"
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) =>
          setFormData((prev) => ({ ...formData, password: e.target.value }))
        }
        className="w-[96%] placeholder:text-gray-500 rounded pl-1 border-2 border-indigo-900 border-opacity-5 focus:outline-none bg-gradient-to-bl via-teal-400 from-indigo-500 to-transparent"
      />
      <div onClick={() => sendForm()}>
        <Button buttonContent="Signup" />
      </div>
    </>
  );
};

export default SignupComp;
