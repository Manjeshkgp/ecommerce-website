import React, { useEffect, useState } from "react";
import SmallFilter from "../components/filter/SmallFilter";
import Product from "../components/products/";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../components/buttons";
import { motion } from "framer-motion";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [alert, setAlert] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [presentPage, setPresentPage] = useState(1);
  const [sort,setSort] = useState(0);
  const getProducts = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/users/get-products?page=${presentPage}&sort=${sort}`
    );
    const data = await res.json();
    setAllProducts(data.allProducts);
    setTotalPages(data.totalPages);
  };
  useEffect(() => {
    getProducts();
  }, [presentPage,sort]);
  const addedToCart = () => {
    toast("Product added to Cart");
  };
  if (alert) {
    addedToCart();
    setAlert(false);
  }
  return (
    <motion.div 
    initial={{width:0}} animate={{width:"100%"}} exit={{x:"100%",transition:{duration:0.1}}}
    >
      <ToastContainer />
      <SmallFilter allProducts={allProducts} setAllProducts={setAllProducts} setSort={setSort}/>
      <div className="flex flex-col items-center w-full bg-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full ml-5 mb-4">
          {allProducts.map((singleProduct) => (
            <div key={singleProduct?._id}>
              <Product productDetails={singleProduct} setAlert={setAlert} />
            </div>
          ))}
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
    </motion.div>
  );
};

export default Products;
