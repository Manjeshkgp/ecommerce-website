import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { BiCart } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const Search = ({wishlistLength,cartLength}) => {
  return (
    <div className='flex items-center gap-x-4 ml-4 md:mr-20'>
    <input type="text" placeholder='Search' className='focus:outline-none bg-gray-800 caret-gray-300 rounded-md p-1 text-gray-100' />
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