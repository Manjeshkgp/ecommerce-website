import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="ml-4">
      <Link to="/">
        <img
          src="https://dummyimage.com/600x400/000/fff"
          alt="logo"
          className="w-12 h-12 object-cover"
        />
      </Link>
    </div>
  );
};

export default Logo;
