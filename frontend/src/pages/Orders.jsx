import React from 'react';
import OrderItem from '../components/products/OrderItem';

const Orders = () => {
  return (<>
  <div className="flex flex-col justify-evenly items-center bg-gray-900 text-gray-200 min-h-[calc(100vh-16rem)]">
    <OrderItem/>
  </div>
  </>)
}

export default Orders