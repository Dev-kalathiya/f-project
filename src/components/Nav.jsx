import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/authSlice';

const Navbar = () => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items.length);
  const dispatch = useDispatch();

  // State to manage mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  // Toggle menu on small screens
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-neutral-300 p-3 fixed top-0 left-0 w-full z-10 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-black ml-2 text-lg sm:text-xl font-bold">DAMAS</span>
        </Link>

        {/* Links - Hidden by default on small screens */}
        <div className="hidden md:flex items-center space-x-4 sm:space-x-6">
          <Link to="/" className="text-slate-700 hover:bg-slate-100 px-2 py-1 rounded-md text-sm sm:text-base font-medium">Home</Link>
          <Link to="/products" className="text-slate-700 hover:bg-slate-100 px-2 py-1 rounded-md text-sm sm:text-base font-medium">Products</Link>
          <Link to="/admin" className="text-slate-700 hover:bg-slate-100 px-2 py-1 rounded-md text-sm sm:text-base font-medium">Admin</Link>
          <Link to="/cart" className="text-slate-700 hover:bg-slate-100 px-2 py-1 rounded-md text-sm sm:text-base font-medium">
            Cart ({cartItems})
          </Link>
        </div>

        {/* User Profile and Cart - Visible on all screen sizes */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          {isLoggedIn ? (
            <>
              <span className="hidden md:inline-block text-black border-2 rounded-full bg-zinc-700 px-3 py-1 text-sm sm:text-base font-medium">{user.name}</span>
              <button onClick={handleLogout} className="text-slate-700 hover:bg-red-700 hover:text-white px-2 py-1 rounded-md text-sm sm:text-base font-medium">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-slate-700 hover:bg-slate-100 px-2 py-1 rounded-md text-sm sm:text-base font-medium">Login</Link>
          )}
        </div>

        {/* Hamburger Menu for Small Screens */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-slate-700 hover:bg-slate-100 px-2 py-1 rounded-md text-sm font-medium">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu - Visible when the hamburger is clicked */}
      {isMenuOpen && (
        <div className="md:hidden bg-neutral-300 p-4 space-y-4">
          <Link to="/" onClick={toggleMenu} className="block text-slate-700 hover:bg-slate-100 px-2 py-1 rounded-md text-sm font-medium">Home</Link>
          <Link to="/products" onClick={toggleMenu} className="block text-slate-700 hover:bg-slate-100 px-2 py-1 rounded-md text-sm font-medium">Products</Link>
          <Link to="/admin" onClick={toggleMenu} className="block text-slate-700 hover:bg-slate-100 px-2 py-1 rounded-md text-sm font-medium">Admin</Link>
          <Link to="/cart" onClick={toggleMenu} className="block text-slate-700 hover:bg-slate-100 px-2 py-1 rounded-md text-sm font-medium">
            Cart ({cartItems})
          </Link>
          {isLoggedIn ? (
            <button onClick={() => { handleLogout(); toggleMenu(); }} className="block text-slate-700 hover:bg-red-700 hover:text-white px-2 py-1 rounded-md text-sm font-medium">
              Logout
            </button>
          ) : (
            <Link to="/login" onClick={toggleMenu} className="block text-slate-700 hover:bg-slate-100 px-2 py-1 rounded-md text-sm font-medium">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
