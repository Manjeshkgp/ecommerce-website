import React, { useRef } from "react";

const AddProduct = () => {
  const productRef = useRef(null);
  const fileLimit = (e) => {
    if (Array.from(e.target.files).length > 5) {
      e.preventDefault();
      alert("Can't select more than 5 files");
    }
  };

  const addProduct = async () => {
    let formdata = new FormData();
    formdata.append("title", productRef.current.title.value);
    formdata.append("description", productRef.current.description.value);
    formdata.append(
      "shortDescription",
      productRef.current.shortDescription.value
    );
    formdata.append("price", productRef.current.price.value);
    formdata.append("brand", productRef.current.brand.value);
    Array.from(productRef.current.files.files).forEach((file) => {
      // loop through each selected file using map function
      formdata.append("files", file); // append each file to the form data object with a key 'files'
    });
    formdata.append("primaryImage", productRef.current.primaryImage.files[0]);
    const requestOptions = {
      method: "POST",
      body: formdata,
      headers: { enctype: "multipart/form-data; boundary=???" },
      redirect: "follow",
    };
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/admin/add-product`,
      requestOptions
    );
    await res.json();
    if (res.status === 200) {
      alert("Product Added successfully");
    } else if (res.status === 400) {
      alert("Some error occured");
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-900 lg:min-h-[calc(100vh-12rem)]">
      <form
        ref={productRef}
        onSubmit={(e) => {
          e.preventDefault();
          addProduct();
        }}
        className="flex flex-col lg:flex-row w-[96%] justify-around items-center flex-wraph-full min-h-[20rem]"
      >
        <div className="w-[96%] md:w-[48%] lg:w-[24%] h-40 md:h-60 lg:h-80 bg-gradient-to-bl from-blue-500 to-purple-500 bg-opacity-30 rounded-md my-2 flex flex-col items-center justify-evenly cursor-pointer">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="w-[96%] bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          <input
            type="text"
            name="brand"
            placeholder="Laptop Brand"
            className="w-[96%] bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          <input
            type="number"
            name="price"
            placeholder="Price e.g 10 -> $10"
            className="w-[96%] bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="w-[96%] md:w-[48%] lg:w-[24%] h-80 bg-gradient-to-bl from-blue-500 to-purple-500 bg-opacity-30 rounded-md my-2 flex flex-col items-center justify-evenly cursor-pointer">
          <textarea
            type="text"
            name="description"
            placeholder="Description"
            className="w-[96%] p-1 h-[60%] rounded bg-gray-800 text-gray-100 caret-gray-200 resize-x-none focus:outline-none"
          />
          <textarea
            type="text"
            name="shortDescription"
            placeholder="Short Description"
            className="w-[96%] p-1 rounded h-[20%] bg-gray-800 text-gray-100 caret-gray-200 resize-none focus:outline-none"
          />
        </div>
        <div className="w-[96%] md:w-[48%] lg:w-[24%] h-80 bg-gradient-to-bl from-blue-500 to-purple-500 bg-opacity-30 rounded-md my-2 flex flex-col items-center justify-evenly cursor-pointer">
          <input
            className="block w-[96%] text-sm text-gray-200 p-1 m-1 border border-gray-300 rounded-lg cursor-pointer bg-gray-800 focus:outline-none placeholder-gray-300"
            name="primaryImage"
            type="file"
          />

          <input
            type="file"
            name="files"
            multiple
            onChange={(e) => {
              fileLimit(e);
            }}
            className="block w-[96%] text-sm text-gray-200 p-1 m-1 border border-gray-300 rounded-lg cursor-pointer bg-gray-800 focus:outline-none placeholder-gray-300"
          />
        </div>
        <div className="w-[96%] md:w-[48%] lg:w-[24%] h-80 bg-gradient-to-bl from-blue-500 to-purple-500 bg-opacity-30 rounded-md my-2 flex flex-col items-center justify-evenly cursor-pointer">
          <div htmlFor="submit">
            <button className="flex ml-auto text-white bg-indigo-900 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
              Add Now
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
