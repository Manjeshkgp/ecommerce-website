import React, { useState } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { BiCart } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const Search = ({wishlistLength,cartLength}) => {
  const [products,setProducts] = useState([]);
  const searchFunction = async(value) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/users/search?search=${value}`);
    const data = await res.json();
    if(res.status===200){
      setProducts(data)
    }
  }
  return (
    <div className='flex relative items-center gap-x-4 ml-4 md:mr-20'>
    <input onChange={(e)=>{if(e.target.value!==""){searchFunction(e.target.value.toString())}else{setProducts([])}}} type="text" placeholder='Search' className='focus:outline-none bg-gray-800 caret-gray-300 rounded-md w-36 md:w-auto p-1 text-gray-100' />
    <div className="absolute top-8 left-0 w-72 bg-indigo-900 text-gray-100 flex flex-col gap-y-1 rounded-md">
      {products?.map((product)=>(<Link to={`/products/${product?._id}`} onClick={()=>setProducts([])} className="w-full h-16 cursor-pointer hover:bg-indigo-300 hover:text-gray-900 font-semibold rounded-md flex justify-between items-center">
        <img src={`${product?.primaryImage}`} className='w-16 h-16 object-contain object-center' alt="product" />
        <p className="ml-2 text-left text-sm">{product?.title}</p>
      </Link>))}
    </div>
    <div className="relative lg:hidden cursor-pointer">
          {wishlistLength<=0?null:<div className="absolute w-4 h-4 text-center text-xs rounded-full bg-red-600 -right-1 -top-1">
            <p className="text-gray-100">{wishlistLength>=10?"9+":wishlistLength}</p>
          </div>}
          <Link
            className="text-gray-300 hover:text-gray-100 active:text-white"
            to="/wishlist"
          >
            <AiOutlineHeart className="w-7 h-7" />
          </Link>
        </div>
        <div className="relative lg:hidden cursor-pointer">
        {cartLength<=0?null:<div className="absolute w-4 h-4 text-center text-xs rounded-full bg-red-600 -right-1 -top-1">
            <p className="text-gray-100">{cartLength>=10?"9+":cartLength}</p>
          </div>}
          <Link
            className="text-gray-300 hover:text-gray-100 active:text-white"
            to="/cart"
          >
            <BiCart className="w-7 h-7" />
          </Link>
        </div>
    </div>
  )
}

export default Search