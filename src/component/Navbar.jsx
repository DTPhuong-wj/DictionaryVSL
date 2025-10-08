import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="flex items-center h-10 max-w-[1240px] mx-auto px-4 text-white relative">
      {/* Logo ở đầu */}
      <h1 className="text-3xl font-bold text-[#00df9a]">REACT.</h1>

      {/* Menu desktop ở cuối */}
      <ul className="hidden md:flex ml-auto space-x-6">
        <li className="p-4 hover:text-[#00df9a] transition">Home</li>
        <li className="p-4 hover:text-[#00df9a] transition">Company</li>
        <li className="p-4 hover:text-[#00df9a] transition">Resources</li>
        <li className="p-4 hover:text-[#00df9a] transition">About</li>
        <li className="p-4 hover:text-[#00df9a] transition">Contact</li>
      </ul>

      {/* Icon menu mobile (bên phải) */}
      <div onClick={handleNav} className="block md:hidden cursor-pointer ml-auto z-20">
        {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
      </div>

      {/* Menu mobile */}
      <ul
        className={`fixed top-0 left-0 w-[60%] h-full bg-[#000300] border-r border-gray-900 transform ${
          nav ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-500 ease-in-out`}
      >
        <h1 className="text-3xl font-bold text-[#00df9a] m-4">REACT.</h1>
        <li className="p-4 border-b border-gray-600">Home</li>
        <li className="p-4 border-b border-gray-600">Company</li>
        <li className="p-4 border-b border-gray-600">Resources</li>
        <li className="p-4 border-b border-gray-600">About</li>
        <li className="p-4">Contact</li>
      </ul>
    </div>
  );
};

export default Navbar;
