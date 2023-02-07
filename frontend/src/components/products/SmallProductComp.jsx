import React from 'react'

const SmallProductComp = () => {
  return (<>
    <div className="flex items-center justify-between my-2 md:col-span-1 w-[90%] bg-[rgba(129,141,248,0.08)] shadow-lg hover:shadow-gray-600 hover:m-2 transition-all rounded">
        <img
          src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80"
          alt="product image"
          className="h-20 w-20 object-cover rounded"
        />
          <p className="font-semibold text-lg">Product Name</p>
          <p>
            Rating with Count
          </p>
          <p className='font-semibold'>Date of Order</p>
          <p className='text-lg font-semibold lg:mr-2'>
            $39.99
          </p>
      </div>
  </>)
}

export default SmallProductComp