import React from 'react'

const Button = ({buttonContent}) => {
  return (
    <>
    <button className='text-teal-400 font-semibold w-max bg-indigo-900 px-1 rounded hover:bg-indigo-700 active:text-teal-200 active:bg-indigo-900'>
        {buttonContent || ""}
    </button>
    </>
  )
}

export default Button