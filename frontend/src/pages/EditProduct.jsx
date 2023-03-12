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
            "Content-Type":"application/json"
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
            "Content-Type":"application/json"
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
    <div className="w-full h-full min-h-screen bg-gradient-to-bl from-transparent via-teal-400 to-transparent flex flex-col items-center"><form
    onSubmit={(e) => {
      e.preventDefault();
      console.log(productData);
      updateProduct();
    }}
    className="flex flex-col md:flex-row w-[96%] justify-around items-center flex-wrap bg-green-300 h-full min-h-[20rem] mt-2"
  >
    <div className="w-[96%] md:w-[48%] lg:w-[24%] h-40 md:h-60 lg:h-80 bg-gradient-to-bl from-blue-500 to-purple-500 rounded-md my-2 flex flex-col items-center justify-evenly cursor-pointer">
      <input
        type="text"
        name="title"
        value={productData.title}
        onChange={(e)=>{setProductData({...productData,[e.target.name]:e.target.value})}}
        placeholder="Title"
        className="w-[96%] p-1 rounded focus:outline-none"
      />
      <input
        type="text"
        name="description"
        value={productData.description}
        onChange={(e)=>{setProductData({...productData,[e.target.name]:e.target.value})}}
        placeholder="Description"
        className="w-[96%] p-1 rounded focus:outline-none"
      />
      <input
        type="text"
        name="shortDescription"
        value={productData.shortDescription}
        onChange={(e)=>{setProductData({...productData,[e.target.name]:e.target.value})}}
        placeholder="Short Description"
        className="w-[96%] p-1 rounded focus:outline-none"
      />
    </div>
    <div className="w-[96%] md:w-[48%] lg:w-[24%] h-80 bg-gradient-to-bl from-blue-500 to-purple-500 rounded-md my-2 flex flex-col items-center justify-evenly cursor-pointer">
      <input
        type="number"
        name="price"
        value={productData.price}
        onChange={(e)=>{setProductData({...productData,[e.target.name]:e.target.value})}}
        placeholder="Price e.g 10 -> $10"
        className="w-[96%] p-1 rounded focus:outline-none"
      />
    </div>
    <div className="w-[96%] md:w-[48%] lg:w-[24%] h-80 bg-gradient-to-bl from-blue-500 to-purple-500 rounded-md my-2 flex flex-col items-center justify-evenly cursor-pointer">
      <input
        type="text"
        name="brand"
        value={productData.brand}
        onChange={(e)=>{setProductData({...productData,[e.target.name]:e.target.value})}}
        placeholder="Laptop Brand"
        className="w-[96%] p-1 rounded focus:outline-none"
      />
    </div>
    <div className="w-[96%] md:w-[48%] lg:w-[24%] h-80 bg-gradient-to-bl from-blue-500 to-purple-500 rounded-md my-2 flex flex-col items-center justify-evenly cursor-pointer">
      <div htmlFor="submit">
        <Button buttonContent="Update Product"></Button>
      </div>
    </div>
  </form></div>
  )
}

export default EditProduct