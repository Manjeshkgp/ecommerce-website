import React from "react";

const Categorie = () => {
  return (
    <>
      <div className="flex md:col-span-1 w-[90%] bg-[rgba(129,141,248,0.35)] shadow-lg hover:shadow-gray-600 hover:m-2 transition-all rounded">
        <img
          src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80"
          alt=""
          className="h-20 w-20 object-cover rounded"
        />
        <div className="flex flex-col">
          <p className="font-semibold text-lg ml-2">Categorie Name</p>
          <p className="text-base ml-2">
            240 Different Kinds of Products Available
          </p>
        </div>
      </div>
    </>
  );
};

export default Categorie;
