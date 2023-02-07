import React from 'react';
import Filter from '../components/filter';
import Product from "../components/products/";

const Products = () => {
  return (<>
  <div className="flex bg-gradient-to-bl from-transparent via-teal-400 to-transparent">
  <Filter/>
  <div className="grid grid-cols-2 md:grid-cols-3 w-full ml-4">
    <Product/>
    <Product/>
    <Product/>
    <Product/>
    <Product/>
  </div>
  </div>
  </>)
}

export default Products