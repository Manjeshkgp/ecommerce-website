import React,{useEffect,useState} from "react";
import Product from "../components/products";

const AdminProducts = () => {
    const [productData,setProductData] = useState([]);
    const getProducts = async()=>{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/users/get-products`,{
            metthod:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data = await res.json();
        setProductData(data);
    }
    useEffect(()=>{getProducts()},[])
  return (
    <>
      <div className="flex bg-gradient-to-bl from-transparent via-teal-400 to-transparent">
        <div className="grid grid-cols-2 md:grid-cols-3 w-full ml-4">
            {productData?.allProducts?.map((singleProduct)=>(<Product key={singleProduct?._id} productDetails={singleProduct}/>))}
        </div>
      </div>
    </>
  );
};

export default AdminProducts;
