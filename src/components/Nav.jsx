import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/authSlice';
// import { useSelector } from 'react-redux';

const Navbar = () => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items.length);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-neutral-300 p-1 fixed top-0 left-0 w-full z-10 shadow-xl">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-white ml-2 text-lg sm:text-xl font-bold">DAMAS</span>
        </Link>
        <div className="flex items-center space-x-4 sm:space-x-6">
          <Link to="/" className="text-slate-700 hover:bg-slate-100 px-2 py-1 rounded-md text-sm sm:text-base font-medium">Home</Link>
          <Link to="/products" className="text-slate-700 hover:bg-slate-100 px-2 py-1 rounded-md text-sm sm:text-base font-medium">Products</Link>
          <Link to="/admin" className="text-slate-700 hover:bg-slate-100 px-2 py-1 rounded-md text-sm sm:text-base font-medium">admin</Link>
          <Link to="/cart" className="text-slate-700 hover:bg-slate-100 px-2 py-1 rounded-md text-sm sm:text-base font-medium">
            Cart ({cartItems})
          </Link>
         
          {isLoggedIn ? (
            <>
              <span className="text-white m-5 border-2 rounded-full bg-zinc-700 px-3 py-1 text-sm sm:text-base font-medium">{user.name}</span>
              <button onClick={handleLogout} className="text-slate-700 hover:bg-red-700 hover:text-white px-2 py-1 rounded-md text-sm sm:text-base font-medium">Logout</button>
            </>
          ) : (
            <Link to="/login" className="text-slate-700 hover:bg-slate-100 px-2 py-1 rounded-md text-sm sm:text-base font-medium">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
