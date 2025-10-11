import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Navbar = ({ user, onLogout }) => {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();

  const handleNav = () => setNav(!nav);

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

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
          <Link to="/report">Report</Link>
        </li>
        <li className="p-4 hover:text-[#00df9a] transition">
          <Link to="/dictionary">Dictionary</Link>
        </li>
        <li className="p-4 hover:text-[#00df9a] transition">
          <Link to="/about">About</Link>
        </li>

        {/* Nếu user chưa login */}
        {!user && (
          <li className="p-4 hover:text-[#00df9a] transition">
            <Link to="/login">Login</Link>
          </li>
        )}

        {/* Nếu user đã login */}
        {user && (
          <>
            <li className="p-4 hover:text-[#00df9a] transition cursor-pointer" onClick={handleLogout}>
              Logout
            </li>
            <li className="p-4 text-[#00df9a] font-semibold">{user.name}</li>
          </>
        )}
      </ul>

      {/* Icon mobile menu */}
      <div onClick={handleNav} className="block md:hidden cursor-pointer ml-auto z-20">
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
          <Link to="/report" onClick={handleNav}>Report</Link>
        </li>
        <li className="p-4 border-b border-gray-600">
          <Link to="/dictionary" onClick={handleNav}>Dictionary</Link>
        </li>
        <li className="p-4 border-b border-gray-600">
          <Link to="/about" onClick={handleNav}>About</Link>
        </li>

        {!user && (
          <li className="p-4" onClick={handleNav}>
            <Link to="/login">Login</Link>
          </li>
        )}

        {user && (
          <>
            <li className="p-4 cursor-pointer" onClick={() => { handleLogout(); handleNav(); }}>
              Logout
            </li>
            <li className="p-4 text-[#00df9a] font-semibold">{user.name}</li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;