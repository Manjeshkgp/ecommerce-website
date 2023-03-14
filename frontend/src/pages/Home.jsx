import React, { useEffect, useState } from 'react';
import Welcome from '../components/welcome';
import Button from '../components/buttons';
import Products from '../components/products';
import PopularCategories from '../components/categories/PopularCategories';
import BlogSection from '../components/blogHero/BlogSection';

const Home = () => {
  const [recent,setRecent] = useState([]);
  const fetchRecent = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/users/recent-products`);
    const data = await res.json();
    setRecent(data);
  }
  useEffect(()=>{fetchRecent()},[])
  return (<>
  <Welcome/>
    <p className="text-lg text-gray-200 font-bold bg-gray-900 text-center py-2 underline underline-offset-8">Recently Launched Products</p>
  <div className="bg-gray-900 grid grid-cols-1 md:grid-cols-2 md:px-3 lg:grid-cols-4 justify-items-center content-evenly">
    {recent?.map((singleProduct)=>(<Products key={singleProduct?._id} productDetails={singleProduct}/>))}
  </div>
  <PopularCategories/>
  <BlogSection/>
  <div
  style={{backgroundImage:"url('https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80')"}}
   className="bg-cover bg-fixed w-full h-screen">
    <div className="w-full h-full bg-[rgba(12,12,28,0.5)] flex justify-center items-center">
    <div className='w-[60%] h-[60%] text-gray-200 flex flex-col items-center justify-evenly'><p className="text-xl font-semibold text-center">Limited Stock Available!</p>
    <p className="text-3xl font-semibold text-center">Asus X90 Dragunov</p>
    <p className="font-semibold text-center">Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo.</p>
    <Button buttonContent={"Shop Now"}></Button>
    </div>
    </div>
    </div>
  </>)
}

export default Home