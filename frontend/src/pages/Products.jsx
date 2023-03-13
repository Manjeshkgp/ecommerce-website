import React, { useEffect, useState } from 'react';
import SmallFilter from '../components/filter/SmallFilter';
import Product from "../components/products/";
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const Products = () => {
  const [allProducts,setAllProducts] = useState([]);
  const [alert,setAlert] = useState(false);
  const getProducts = async() => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/users/get-products`);
    const data = await res.json();
    setAllProducts(data.allProducts);
  }
  useEffect(()=>{getProducts()},[]);
  const addedToCart = () => {
    toast("Product added to Cart")
  }
  if(alert){
    addedToCart();
    setAlert(false);
  }
  return (<>
  <ToastContainer/>
  <SmallFilter/>
  <div className="flex bg-gray-900">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full ml-4 mb-4">
    {allProducts.map((singleProduct)=>(
    <div key={singleProduct?._id}>
      <Product productDetails={singleProduct} setAlert={setAlert}/>
    </div>))}
  </div>
  </div>
  </>)
}

export default Products