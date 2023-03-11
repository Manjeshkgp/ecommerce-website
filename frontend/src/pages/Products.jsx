import React, { useEffect, useState } from 'react';
import Filter from '../components/filter';
import Product from "../components/products/";
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [allProducts,setAllProducts] = useState([]);
  const getProducts = async() => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/users/get-products`);
    const data = await res.json();
    setAllProducts(data.allProducts);
  }
  const navigate = useNavigate();
  useEffect(()=>{getProducts()},[])
  return (<>
  <div className="flex bg-gray-900">
  {/* <div className="flex bg-gradient-to-bl from-transparent via-teal-400 to-transparent"> */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full ml-4 mb-4">
    {allProducts.map((singleProduct)=>(
    <div key={singleProduct?._id}>
      <Product productDetails={singleProduct}/>
    </div>))}
  </div>
  </div>
  </>)
}

export default Products