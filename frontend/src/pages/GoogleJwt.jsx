import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import cookie from "js-cookie";
import { useDispatch } from "react-redux";
import { addUser } from "../slices/userSlice";

const GoogleJwt = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jwtToken } = useParams();
  cookie.set("jwt", jwtToken, { expires: 1 });
  const authenticateAndGetUser = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/auth/google/get-user-data`,
      {
        method:"GET",
        headers:{
          Authorization:`Bearer ${jwtToken}`
        },
      }
    );
    if(res.ok){
      const data = await res.json();
      dispatch(addUser(data));
    }
  };
  const getJwt = cookie.get("jwt");
  useEffect(() => {
    authenticateAndGetUser();
    navigate("/", { relative: false });
  }, [getJwt]);
  return (
    <>
      <div className="w-full h-[100vh] bg-gradient-to-bl from-transparent via-teal-400 to-transparent"></div>
    </>
  );
};

export default GoogleJwt;
