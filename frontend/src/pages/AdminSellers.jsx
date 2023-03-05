import React, { useEffect, useState } from "react";
import { FiDelete } from "react-icons/fi";

const AdminSellers = () => {
  const [allSellers, setAllSellers] = useState([]);
  const getSellers = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/admin/get-sellers`
    );
    const totalSellers = await res.json();
    setAllSellers(totalSellers);
  };
  useEffect(() => {
    getSellers();
  }, []);

  const removeSeller = async (_id) => {
    if (window.confirm("Do You Really Wanna Delete this Seller")) {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/admin/remove-seller/${_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      await res.json();
      if (res.status === 200) {
        getSellers();
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
                Products
              </th>
              <th scope="col" className="px-6 py-3">
                Removal
              </th>
            </tr>
          </thead>
          <tbody>
            {allSellers.map((singleSeller) => (
              <tr key={singleSeller?._id} className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {singleSeller?.name}
                </th>
                <td className="px-6 py-4">{singleSeller?.email}</td>
                <td className="px-6 py-4">{singleSeller?.products?.length}</td>
                <td className="px-6 py-4">
                  <FiDelete
                    onClick={() => {
                      removeSeller(singleSeller?._id);
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

export default AdminSellers;
