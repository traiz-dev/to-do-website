import React from 'react'

const Navbar = () => {
  return (
    <div className="p-7 border-b-2">
      <a href='/' className="absolute uppercase font-bold text-xl bg-gradient-to-r from-indigo-500 via-blue-500 to-blue-800 inline-block text-transparent bg-clip-text">
        TaskMaster
      </a>
      <li className="flex justify-center gap-20 tracking-widest font-light text-gray-600">
        <ul>
          <a href="/" className="hover:text-gray-400 duration-200">
            Home
          </a>
        </ul>
        <ul>
          <a href="/tasks" className="hover:text-gray-400 duration-200">
            To-Do
          </a>
        </ul>
        <ul>
          <a href="/organiser" className="hover:text-gray-400 duration-200">
            Organiser
          </a>
        </ul>
      </li>
    </div>
  );
}

export default Navbar
