import React, { useState } from "react";
import Button from "../components/buttons";

const Authenticate = () => {
  const [login, setLogin] = useState(false);
  return (
    <>
      <div className="flex relative flex-row justify-center items-center bg-gradient-to-bl from-transparent via-teal-400 to-transparent min-h-screen min-w-[100vw]">
        <div className="absolute top-4 flex justify-center gap-4 items-center w-screen h-12">
          {!login ? (
            <div onClick={() => setLogin(true)}>
              <Button buttonContent="Already a User, Login" />
            </div>
          ) : (
            <div onClick={() => setLogin(false)}>
              <Button buttonContent="New to this store, Signup" />
            </div>
          )}
        </div>
        <form className="flex relative flex-col justify-center gap-8 border-2 border-indigo-500 border-opacity-20 rounded w-80 h-[26rem] items-center">
          {!login ? (
            <>
              <input
                placeholder="Name"
                type="text"
                className="w-[96%] placeholder:text-gray-500 rounded pl-1 border-2 border-indigo-900 border-opacity-5 focus:outline-none bg-gradient-to-bl via-teal-400 from-indigo-500 to-transparent"
              />
              <input
                placeholder="Email"
                type="email"
                className="w-[96%] placeholder:text-gray-500 rounded pl-1 border-2 border-indigo-900 border-opacity-5 focus:outline-none bg-gradient-to-bl via-teal-400 from-indigo-500 to-transparent"
              />
              <input
                placeholder="Password"
                type="password"
                className="w-[96%] placeholder:text-gray-500 rounded pl-1 border-2 border-indigo-900 border-opacity-5 focus:outline-none bg-gradient-to-bl via-teal-400 from-indigo-500 to-transparent"
              />
              <Button buttonContent="Signup" />
            </>
          ) : (
            <>
              <input
                placeholder="Email"
                type="email"
                className="w-[96%] placeholder:text-gray-500 rounded pl-1 border-2 border-indigo-900 border-opacity-5 focus:outline-none bg-gradient-to-bl via-teal-400 from-indigo-500 to-transparent"
              />
              <input
                placeholder="Password"
                type="password"
                className="w-[96%] placeholder:text-gray-500 rounded pl-1 border-2 border-indigo-900 border-opacity-5 focus:outline-none bg-gradient-to-bl via-teal-400 from-indigo-500 to-transparent"
              />
              <Button buttonContent="Login" />
            </>
          )}
          <p className="absolute bottom-2 w-[96%] right-[2%] left-[2%]">By logging in OR registering into our store You allows us to use cookies and some other technologies to improve this website</p>
        </form>
      </div>
    </>
  );
};

export default Authenticate;
