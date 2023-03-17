import React, { useState } from "react";
import Button from "../components/buttons";
import { FcGoogle } from "react-icons/fc";
import LoginComp from "../components/authenticate/LoginComp";
import SignupComp from "../components/authenticate/SignupComp";
import { useDispatch } from "react-redux";
import { addUser } from "../slices/userSlice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Authenticate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, setLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const sendForm = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/users/${login ? "login" : "create"}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    if (res.ok) {
      const data = await res.json();
      dispatch(addUser(data.user));
      Cookies.set("jwt", data.token, { expires: 1 });
      Cookies.set("email", data.user.email, { expires: 1 });
      navigate("/");
      return;
    } else if (res.status === 410) {
      return alert("Password is Incorrect");
    } else if (res.status === 408) {
      return alert("User Not Found");
    } else if (res.status === 409) {
      return alert("User already exists");
    }
  };
  const authGoogle = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/google`, "_self");
  };
  return (
    <>
      <div className="flex relative flex-row justify-center items-center bg-gray-900 min-h-screen min-w-[100vw]">
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
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex relative flex-col justify-center gap-8 border-2 border-indigo-500 border-opacity-20 rounded w-80 h-[26rem] items-center"
        >
          <p
            onClick={authGoogle}
            className="absolute top-2 flex items-center h-8 rounded bg-indigo-300 px-2 py-1 hover:bg-indigo-200 cursor-pointer active:bg-transparent"
          >
            <span>SignIn with</span>
            <FcGoogle className="h-8 w-8" />
          </p>
          {!login ? (
            <SignupComp
              formData={formData}
              setFormData={setFormData}
              sendForm={sendForm}
            />
          ) : (
            <LoginComp
              formData={formData}
              setFormData={setFormData}
              sendForm={sendForm}
            />
          )}
          <p className="absolute text-sm text-center text-gray-400 bottom-2 w-[96%] right-[2%] left-[2%]">
            By logging in OR registering into our store, You allows us to use
            cookies and some other technologies to improve this website
          </p>
        </form>
      </div>
    </>
  );
};

export default Authenticate;
