import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import cookie from "js-cookie";
import { useDispatch } from "react-redux";
import { addUser } from "../slices/userSlice";
import "./DeleteProduct.css"

const GoogleJwt = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jwtToken } = useParams();
  const authenticateAndGetUser = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/auth/google/get-user-data`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    if (res.ok) {
      const data = await res.json();
      cookie.set("email", data.email);
      cookie.set("jwt", jwtToken, { expires: 1 });
      dispatch(addUser(data));
    navigate("/", { relative: false });
    }
  };
  const getJwt = cookie.get("jwt");
  useEffect(() => {
    authenticateAndGetUser();
  }, [getJwt]);
  return (
    <>
      <div className="flex flex-col justify-evenly items-center w-full h-screen bg-gray-900">
        <div className="load"></div>
        <div className="text-center text-gray-200">Logging in...</div>
      </div>
    </>
  );
};

export default GoogleJwt;
