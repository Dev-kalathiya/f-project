import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Product from '../pages/Product';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Error from '../pages/Error';
import SingleProduct from '../pages/Single';
import CartPage from '../pages/Cart';
import { AuthProvider } from '../AuthContext';  // Ensure this is correctly set up
import PrivateRoute from '../router/PrivateRoute';
import Admin from '../pages/Admin';

const Allrout = () => {
  return (
    <div style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)' }}>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path='/products' element={<PrivateRoute><Product/></PrivateRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/admin" element={<Admin />} />
          <Route path='/cart' element={<PrivateRoute><CartPage/></PrivateRoute>} />
          <Route path='/*' element={<Error />} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default Allrout;