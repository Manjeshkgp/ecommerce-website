import React from 'react';
import { useNavigate } from 'react-router-dom';

const SmallProductComp = ({productDetails}) => {
  const navigate = useNavigate();
  return (<>
    <div onClick={()=>{navigate(`/products/${productDetails?._id}`)}} className="flex items-center justify-between my-2 md:col-span-1 w-[90%] bg-[rgba(129,141,248,0.08)] shadow-lg hover:shadow-gray-600 hover:m-2 transition-all rounded">
        <img
          src={`${process.env.REACT_APP_API_URL}/${productDetails?.primaryImage}`}          
          alt="product pic"
          className="h-20 w-20 object-cover rounded"
        />
          <p className="font-semibold text-lg w-[25%]">{productDetails?.title||"Product Name"}</p>
          <p>
            {productDetails?.rating?.length||"Rating with Count"}
          </p>
          <p className='font-semibold w-[25%]'>{`${productDetails?.numberOfProducts} Items in Cart`||"Number of Products"}</p>
          <p className='text-lg font-semibold lg:mr-2 w-[25%]'>
            {`$${productDetails?.price*productDetails?.numberOfProducts}`||"$39.99"}
          </p>
      </div>
  </>)
}

export default SmallProductComp