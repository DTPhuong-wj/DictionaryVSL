import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => setNav(!nav);

  return (
    <div className="flex items-center h-10 max-w-[1240px] mx-auto px-4 text-white relative">
      {/* Logo */}
      <h1 className="text-3xl font-bold text-[#00df9a]">REACT.</h1>

      {/* Menu desktop */}
      <ul className="hidden md:flex ml-auto space-x-6">
        <li className="p-4 hover:text-[#00df9a] transition">
          <Link to="/">Home</Link>
        </li>
        <li className="p-4 hover:text-[#00df9a] transition">
          <Link to="/course">Course</Link>
        </li>
        <li className="p-4 hover:text-[#00df9a] transition">
          <Link to="/dictionary">Dictionary</Link>
        </li>
        <li className="p-4 hover:text-[#00df9a] transition">
          <Link to="/about">About</Link>
        </li>
        <li className="p-4 hover:text-[#00df9a] transition">
          <Link to="/login">Login</Link>
        </li>
      </ul>

      {/* Icon mobile menu */}
      <div
        onClick={handleNav}
        className="block md:hidden cursor-pointer ml-auto z-20"
      >
        {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
      </div>

      {/* Mobile menu */}
      <ul
        className={`fixed top-0 left-0 w-[60%] h-full bg-[#000300] border-r border-gray-900 transform ${
          nav ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-500 ease-in-out`}
      >
        <h1 className="text-3xl font-bold text-[#00df9a] m-4">REACT.</h1>
        <li className="p-4 border-b border-gray-600">
          <Link to="/" onClick={handleNav}>Home</Link>
        </li>
        <li className="p-4 border-b border-gray-600">
          <Link to="/course" onClick={handleNav}>Course</Link>
        </li>
        <li className="p-4 border-b border-gray-600">
          <Link to="/dictionary" onClick={handleNav}>Dictionary</Link>
        </li>
        <li className="p-4 border-b border-gray-600">
          <Link to="/about" onClick={handleNav}>About</Link>
        </li>
        <li className="p-4">
          <Link to="/login" onClick={handleNav}>Login</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
