// Allrout.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Error from '../pages/Error';
import CartPage from '../pages/Cart';
import Admin from '../pages/Admin';
import ProductDetail from '../pages/ProductDetail';  // Ensure correct import
import { AuthProvider } from '../AuthContext';  // Ensure this is correctly set up
import PrivateRoute from '../router/PrivateRoute';
import Products from '../pages/Product';

const Allrout = () => {
  return (
    <div style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)' }}>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path='/products' element={<PrivateRoute><Products/></PrivateRoute>} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/admin" element={<Admin />} />
          <Route path='/cart' element={<PrivateRoute><CartPage/></PrivateRoute>} />
          <Route path='/*' element={<Error />} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default Allrout;
