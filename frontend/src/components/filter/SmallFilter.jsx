import React from 'react'

const SmallFilter = () => {
  return (<>
  <div className="h-14 w-full bg-gray-900 flex justify-between items-center">
    <p className='text-gray-100 text-lg font-medium ml-4'>Sort By</p>
<select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[60%] md:w-[50%] lg:w-[20%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-4">
  <option selected>Sorting Opitons</option>
  <option value="US">By Price: Low to High</option>
  <option value="US">By Price: High to Low</option>
  <option value="CA">By Date: Latest</option>
  <option value="CA">By Date: Oldest</option>
</select>
  </div>
  </>)
}

export default SmallFilter