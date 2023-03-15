import React from "react";
import { Link } from "react-router-dom";
import Lappy from "../../assets/Lappy.png";

const Logo = () => {
  return (
    <div className="ml-4">
      <Link to="/">
        <img
          src={Lappy}
          alt="logo"
          className="w-12 h-12 object-cover"
        />
      </Link>
    </div>
  );
};

export default Logo;
