import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black p-3">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <img src="https://image.similarpng.com/very-thumbnail/2021/09/Letter-D-logo-design-in-blue-color-on-transparent-background-PNG.png" alt="Logo" className="h-12 p-1  border-2 rounded-full" />
        </Link>
        <div className="flex items-center">
          <div className="relative text-gray-600 focus-within:text-gray-400">
            <input
              type="search"
              name="search"
              className=" ml-3 py-2 text-sm text-white bg-gray-900 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
              placeholder="Search..."
              autoComplete="off"
            />
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg
                className="w-6 h-6 ml-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 1 0-14 0 7 7 0 0 0 14 0z"
                  />
              </svg>
            </span>
          </div>
          <button
            className="text-white lg:hidden flex items-center ml-4"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        <div
          className={`lg:flex flex-grow items-center lg:justify-end transition-transform duration-300 ${isOpen ? 'transform translate-x-0' : 'transform -translate-x-full lg:transform-none'}`}
        >
          <div className="lg:flex items-center space-x-4">
            <Link to="/" className="text-white hover:bg-cyan-500 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <Link to="/Products" className="text-white hover:bg-cyan-500 px-3 py-2 rounded-md text-sm font-medium">Product</Link>
            <Link to="/Login" className="text-white hover:bg-cyan-500 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
            <Link to="/Signup" className="text-white hover:bg-cyan-500 px-3 py-2 rounded-md text-sm font-medium">Signup</Link>
            <Link to="/Cartpage" className="text-white hover:bg-cyan-500 px-3 py-2 rounded-md text-sm font-medium">Cart</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
