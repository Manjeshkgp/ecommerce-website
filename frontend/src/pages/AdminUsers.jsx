import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { FiDelete } from "react-icons/fi";
import Button from "../components/buttons";

const AdminUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [presentPage, setPresentPage] = useState(1);
  const getUsers = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/get-users?page=${presentPage}`,{
      headers:{
        Authorization:`Bearer ${Cookies.get("adminToken")}`
      }
    });
    const totalUsers = await res.json();
    setAllUsers(totalUsers.allUsers);
    setTotalPages(totalUsers.totalPages);
  };
  useEffect(() => {
    getUsers();
  }, [presentPage]);

  const removeUser = async (_id) => {
    if (window.confirm("Do You Really wanna Remove this User")) {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/admin/remove-user/${_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization:`Bearer ${Cookies.get("adminToken")}`
          },
        }
      );
      await res.json();
      if (res.status === 200) {
        getUsers();
      }
    }
  };

  return (
    <>
      <div className="relative bg-gray-900 min-h-[calc(100vh-12rem)] flex flex-col items-center overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Orders
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Purchased
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Removal
              </th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((singleUser) => (
              <tr key={singleUser?._id} className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {singleUser?.name}
                </th>
                <td className="px-6 py-4">{singleUser?.email}</td>
                <td className="px-6 py-4 text-center">{singleUser?.orders?.length}</td>
                <td className="px-6 py-4 text-center">{singleUser?.purchased?.length}</td>
                <td className="px-6 py-4">
                  <FiDelete
                    onClick={() => {
                      removeUser(singleUser?._id);
                    }}
                    className="text-gray-300 w-full text-center h-6 cursor-pointer hover:text-white"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default AdminUsers;
