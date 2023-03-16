import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { FiDelete } from "react-icons/fi";

const AdminUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const getUsers = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/get-users`,{
      headers:{
        Authorization:`Bearer ${Cookies.get("adminToken")}`
      }
    });
    const totalUsers = await res.json();
    setAllUsers(totalUsers);
  };
  useEffect(() => {
    getUsers();
  }, []);

  const removeUser = async (_id) => {
    if (window.confirm("Do You Really wanna Remove this User")) {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/admin/remove-user/${_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
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
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Orders
              </th>
              <th scope="col" className="px-6 py-3">
                Purchased
              </th>
              <th scope="col" className="px-6 py-3">
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
                <td className="px-6 py-4">{singleUser?.orders?.length}</td>
                <td className="px-6 py-4">{singleUser?.purchased?.length}</td>
                <td className="px-6 py-4">
                  <FiDelete
                    onClick={() => {
                      removeUser(singleUser?._id);
                    }}
                    className="text-gray-300 w-6 h-6 cursor-pointer hover:text-white"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminUsers;
