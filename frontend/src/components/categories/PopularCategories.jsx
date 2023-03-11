import React from "react";
import Categorie from "./Categorie";

const PopularCategories = () => {
  return (
    <>
      <div className="bg-gray-900 flex flex-col py-6">
        <p className="font-bold text-gray-200 text-lg text-center my-8 underline underline-offset-8">Popular Categories</p>
        <div className="grid justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Categorie/>
          <Categorie/>
          <Categorie/>
          <Categorie/>
          <Categorie/>
        </div>
      </div>
    </>
  );
};

export default PopularCategories;
