import React from 'react'
import { IoAdd } from "react-icons/io5";

const Button = ({ openModal }) => {
  return (
    <>
      <button
        className="fixed bottom-6 right-6 cursor-pointer transition-all 
        bg-gray-900 text-white px-4 py-4 rounded-3xl
        border-green-400 
        active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-blue-500 shadow-blue-500 active:shadow-none"
        onClick={() => openModal()}
      >
        <IoAdd />
      </button>
    </>
  );
}

export default Button
