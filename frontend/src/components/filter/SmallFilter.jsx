import React, { useEffect } from 'react'

const SmallFilter = ({allProducts,setAllProducts}) => {
  return (<>
  <div className="h-14 w-full bg-gray-900 flex justify-between items-center">
    <p className='text-gray-100 text-lg font-medium ml-4'>Sort By</p>
<select id="sorting" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[60%] md:w-[50%] lg:w-[20%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-4">
  <option defaultValue="none" value="none">Sorting Options</option>
  <option onSelect={()=>{console.log("first")}} value="cheap">By Price: High to Low</option>
  <option value="costly">By Price: Low to High</option>
</select>
  </div>
  </>)
}

export default SmallFilter