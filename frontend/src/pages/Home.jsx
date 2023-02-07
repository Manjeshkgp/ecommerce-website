import React from 'react';
import Welcome from '../components/welcome';
import Products from '../components/products';

const Home = () => {
  return (<>
  <Welcome/>
    <p className="text-lg font-bold bg-teal-400 text-center py-2">Products You May Like</p>
  <div className="bg-gradient-to-b from-teal-400 to-transparent grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center content-evenly">
    <Products/>
    <Products/>
    <Products/>
    <Products/>
    <Products/>
  </div>
  </>)
}

export default Home