import React, { useEffect, useState } from 'react'
import {motion} from "framer-motion"
import { useSelector } from 'react-redux'
import { addOrRemove } from '../slices/wishlistSlice'
import { useDispatch } from 'react-redux'
import { increment } from '../slices/cartSlice'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiCartAdd } from 'react-icons/bi'
import { useParams } from 'react-router-dom'
import { AiFillHeart, AiOutlineHeart} from "react-icons/ai"

const Brandedproducts = () => {
    const [products,setProducts] = useState([]);
    const {brand} = useParams();
    const addedToCart = () => { toast("Added to Cart")}
    const wishlist = useSelector((state)=>state.wishlist.products);
    const isAuthenticated = useSelector((state)=>state.user.authenticated);
    const dispatch = useDispatch();
    const fetchBrandedProducts = async() => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/users/brands?brand=${brand}`);
        const data = await res.json();
        if(res.status===200){
            setProducts(data);
        }
    }
    const updateWishlist = (product) => {
        if(!isAuthenticated){
            return alert("You are not logged in, first login/signup then add to wishlist");
        }
        dispatch(addOrRemove(product));
    }
    useEffect(()=>{
        fetchBrandedProducts();
    },[brand])
  return (<motion.section initial={{width:0}} animate={{width:"100%"}} exit={{x:"100%",transition:{duration:0.1}}} className="text-gray-400 bg-gray-900 body-font">
  <ToastContainer/>
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full mb-20">
      <h1 className="text-2xl font-medium title-font mb-4 text-white tracking-widest">All Products of {brand}</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">We have {products.length} products of {brand}.</p>
    </div>
    <div className="flex flex-wrap justify-center -m-4">
        {products.map((product)=>(<div key={product?._id} className="p-4 lg:w-1/2">
        <div className="h-full bg-gray-800 rounded flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
          <img alt="team" className="flex-shrink-0 rounded-lg w-48 h-48 object-contain object-center sm:mb-0 mb-4" src={`${product?.primaryImage}`}/>
          <div className="flex-grow sm:pl-8">
            <h2 className="title-font font-medium text-lg text-white">{product?.title}</h2>
            <h2 className="title-font font-medium text-lg text-white">{product?.brand}</h2>
            <h3 className="text-gray-500 mb-3">${product?.price}</h3>
            <p className="mb-4">{product?.shortDescription}</p>
            <div className='flex flex-wrap gap-4 items-center'>
            <div onClick={()=>{updateWishlist(product)}}>{wishlist.some(obj=>obj._id===product?._id)===true?(<>
            <button>
                <AiFillHeart className="h-8 w-8 text-red-600"/>
            </button>
            </>):(<>
            <button>
                <AiOutlineHeart className="h-8 w-8 text-red-600"/>
            </button>
            </>)}</div>
            <button
                  onClick={() => {
                    
                      dispatch(
                        increment({ ...product, numberOfProducts: 1 })
                      );
                      addedToCart();
                    
                  }}
                  className="rounded-full active:bg-indigo-500 active:text-white w-10 h-10 bg-gray-900 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                >
                  <BiCartAdd className="w-7 h-7" />
                </button>
            </div>
          </div>
        </div>
      </div>))
      }
    </div>
  </div>
</motion.section>)
}

export default Brandedproducts;