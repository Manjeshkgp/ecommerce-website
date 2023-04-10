import React from "react";

const SmallFilter = ({ setSort }) => {
  return (
    <>
      <div className="h-14 w-full bg-gray-800 flex justify-between md:justify-around items-center">
        <select
          onChange={(e) => setSort(e.target.value)}
          id="sorting"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[60%] md:w-[50%] lg:w-[20%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-4"
        >
          <option defaultValue={0} value={0}>
            Sorting Options:Default
          </option>
          <option value={-1}>By Price: High to Low</option>
          <option value={1}>By Price: Low to High</option>
        </select>
      </div>
    </>
  );
};

export default SmallFilter;
