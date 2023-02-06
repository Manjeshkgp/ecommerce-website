import React from 'react'

const Footer = () => {
  return (<>
  <div className="w-screen h-52 bg-indigo-500 grid grid-flow-col grid-cols-3">
    <ul className='text-gray-300 col-span-1 flex flex-col justify-evenly items-center'>
        <div className="font-semibold underline underline-offset-8">Links</div>
        <li className='hover:text-gray-100 cursor-pointer'>Contact</li>
        <li className='hover:text-gray-100 cursor-pointer'>Github</li>
        <li className='hover:text-gray-100 cursor-pointer'>LinkedIn</li>
    </ul>
    <div className='col-span-2 flex justify-center items-center'>
       <a href='https://linkedin.com/in/manjesh-kumar-sharma' className='text-gray-300 font-bold underline hover:underline-offset-2 cursor-pointer hover:text-gray-100'>Made With💝 by Manjesh</a> 
    </div>
  </div>
  </>)
}

export default Footer