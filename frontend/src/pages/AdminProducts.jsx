import Cookies from "js-cookie";
import React,{useEffect,useState} from "react";
import Product from "../components/products";
import Button from "../components/buttons";

const AdminProducts = () => {
    const [productData,setProductData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [presentPage, setPresentPage] = useState(1);
    const getProducts = async()=>{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/users/get-products`,{
            metthod:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${Cookies.get("adminToken")}`
            }
        })
        const data = await res.json();
        setProductData(data);
        setTotalPages(data.totalPages);
    }
    useEffect(()=>{getProducts()},[])
  return (
    <>
      <div className="flex flex-col items-center bg-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full ml-4 mb-4">
            {productData?.allProducts?.map((singleProduct)=>(<Product key={singleProduct?._id} productDetails={singleProduct}/>))}
        </div>
        <div className="flex justify-evenly items-center h-12 w-60">
          {presentPage !== 1 ? (
            <>
              {presentPage - 1 === 1 ? (
                ""
              ) : (
                <div onClick={() => setPresentPage(1)}>
                  <Button buttonContent={1} />
                </div>
              )}
              <div onClick={() => setPresentPage(presentPage - 1)}>
                <Button buttonContent={presentPage - 1} />
              </div>
              {presentPage===totalPages?<div onClick={()=>setPresentPage(presentPage-1)}><Button buttonContent={"Previous"}/></div>:""}
              <div className="bg-indigo-500 p-1 rounded">
                <Button buttonContent={presentPage} />
              </div>
              {presentPage === totalPages ? (
                ""
              ) : (
                <>
                  <div onClick={() => setPresentPage(presentPage + 1)}>
                    <Button buttonContent="Next" />
                  </div>
                  <div onClick={() => setPresentPage(totalPages)}>
                    <Button buttonContent={totalPages} />
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              {totalPages === presentPage ? (
                <div className="bg-indigo-500 p-1 rounded">
                  <Button buttonContent={presentPage} />
                </div>
              ) : (
                <>
                  <div className="bg-indigo-500 p-1 rounded">
                    <Button buttonContent={presentPage} />
                  </div>
                  <div onClick={() => setPresentPage(presentPage + 1)}>
                    <Button buttonContent="Next" />
                  </div>
                  <div onClick={() => setPresentPage(totalPages)}>
                    <Button buttonContent={totalPages} />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminProducts;
