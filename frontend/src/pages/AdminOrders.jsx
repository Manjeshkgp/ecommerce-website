import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { FcCancel, FcApproval } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import Button from "../components/buttons";
import "react-toastify/dist/ReactToastify.css";

const AdminOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [presentPage, setPresentPage] = useState(1);
  const fetchOrders = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/orders?page=${presentPage}`,{
      method:"GET",
      headers:{
        Authorization:`Bearer ${Cookies.get("adminToken")}`
      }
    });
    if (res.status === 200) {
      const data = await res.json();
      setAllOrders(data.orders);
      setTotalPages(data.totalPages);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, [presentPage]);

  const cancelOrder = async (_id) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/admin/order-cancel/${_id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${Cookies.get("adminToken")}`,
        },
      }
    );
    await res.json();
    if (res.status === 200) {
      setAllOrders((prev) => prev.filter((order) => order._id !== _id));
      toast("Order Cancelled");
    } else if (res.status === 420) {
      toast("Some Error Occured");
    }
  };

  const convertOrderToSale = async (_id) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/admin/order-to-sale/${_id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${Cookies.get("adminToken")}`,
        },
      }
    );
    await res.json();
    if (res.status === 200) {
      setAllOrders((prev) => prev.filter((order) => order._id !== _id));
      toast("Order Converted to Sale");
    } else if (res.status === 434) {
      toast("Order Not Found in Database");
    } else if (res.status === 444) {
      toast("Some Error Occured");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="relative flex flex-col items-center bg-gray-900 min-h-[calc(100vh-16rem)] overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Products
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Date of Order
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Total Price
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Cancel Order
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Convert Order To Sale
              </th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((singleOrder) => (
              <tr key={singleOrder?._id} className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {singleOrder?.buyer?.Name}
                </th>
                <td className="px-6 py-4 text-center">
                  {singleOrder?.products
                    ?.map((product) => product?.numberOfProducts)
                    .join(", ")}
                </td>
                <td className="px-6 py-4 text-center">
                  {singleOrder?.products
                    ?.map((product) => product?.title)
                    .join(", ")}
                </td>
                <td className="px-6 py-4 text-center">
                  {new Date(singleOrder?.date).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-center">
                  Rs.{Number(singleOrder?.totalPrice/100) ||
                    "Unknown Due to Previous Mistakes"}
                </td>
                <td className="px-6 py-4 text-center">
                  <FcCancel
                    onClick={() => {
                      if (
                        window.confirm("Do You Really Wanna Cancel This Order")
                      ) {
                        cancelOrder(singleOrder?._id);
                      } else {
                        return;
                      }
                    }}
                    className="text-gray-300 h-6 cursor-pointer w-full text-center hover:text-white"
                  />
                </td>
                <td className="px-6 py-4 text-center">
                  <FcApproval
                    onClick={() => {
                      if (
                        window.confirm(
                          "Do You Really Convert This Order to Sale"
                        )
                      ) {
                        convertOrderToSale(singleOrder?._id);
                      } else {
                        return;
                      }
                    }}
                    className="text-gray-300 h-6 cursor-pointer w-full text-center hover:text-white"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-evenly mt-4 items-center h-12 w-60">
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

export default AdminOrders;
