import Cookies from 'js-cookie';
import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import Button from '../components/buttons';

const EditProduct = () => {
  const {id} = useParams();
  const initialState = {
    title:"",
    description:"",
    shortDescription:"",
    price:"",
    brand:"",
    images:[],
    rating:[],
    primaryImage:""
  }
  const [productData,setProductData] = useState(initialState);
  const getProduct = async() => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/users/get-a-product`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            _id:id,
        })
    });
    const data = await res.json()
    console.log(data)
    setProductData(data);
  }
  useEffect(()=>{getProduct()},[])

  const updateProduct = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/update-product/${id}`,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${Cookies.get("adminToken")}`
        },
        body:JSON.stringify(productData),
    })
    await res.json();
    if(res.status===200){
        alert("Updated")
    }else if(res.status===400){
        alert("Some error occured")
    }
  }

  return (
    <div className="w-full h-full bg-gray-900 lg:min-h-[calc(100vh-12rem)] flex justify-center items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(productData);
          updateProduct();
        }}
        className="flex flex-col lg:flex-row w-[96%] justify-around items-center flex-wraph-full min-h-[20rem]"
      >
        <div className="w-[96%] md:w-[48%] lg:w-[24%] h-40 md:h-60 lg:h-80 bg-gradient-to-bl from-blue-500 to-purple-500 bg-opacity-30 rounded-md my-2 flex flex-col items-center justify-evenly cursor-pointer">
          <input
            type="text"
            name="title"
            value={productData.title}
            onChange={(e)=>{setProductData({...productData,[e.target.name]:e.target.value})}}
            placeholder="Title"
            className="w-[96%] bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          <input
            type="text"
            name="brand"
            value={productData.brand}
            onChange={(e)=>{setProductData({...productData,[e.target.name]:e.target.value})}}
            placeholder="Laptop Brand"
            className="w-[96%] bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={(e)=>{setProductData({...productData,[e.target.name]:e.target.value})}}
            placeholder="Price e.g 10 -> $10"
            className="w-[96%] bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="w-[96%] md:w-[48%] lg:w-[24%] h-80 bg-gradient-to-bl from-blue-500 to-purple-500 bg-opacity-30 rounded-md my-2 flex flex-col items-center justify-evenly cursor-pointer">
          <textarea
            type="text"
            name="description"
            value={productData.description}
            onChange={(e)=>{setProductData({...productData,[e.target.name]:e.target.value})}}
            placeholder="Description"
            className="w-[96%] p-1 h-[60%] rounded bg-gray-800 text-gray-100 caret-gray-200 resize-x-none focus:outline-none"
          />
          <textarea
            type="text"
            name="shortDescription"
            value={productData.shortDescription}
            onChange={(e)=>{setProductData({...productData,[e.target.name]:e.target.value})}}
            placeholder="Short Description"
            className="w-[96%] p-1 rounded h-[20%] bg-gray-800 text-gray-100 caret-gray-200 resize-none focus:outline-none"
          />
        </div>
        <div className="w-[96%] md:w-[48%] lg:w-[24%] h-80 bg-gradient-to-bl from-blue-500 to-purple-500 bg-opacity-30 rounded-md my-2 flex flex-col items-center justify-evenly cursor-pointer">
          <div htmlFor="submit">
            <button className="flex ml-auto text-white bg-indigo-900 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
              Update Now
            </button>
          </div>
        </div>
      </form></div>
  )
}

export default EditProduct