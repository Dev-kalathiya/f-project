import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Product from '../pages/Product'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Error from '../pages/Error'
import SingleProduct from '../pages/Single'
import CartPage from '../pages/Cart'


const Allrout = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Products' element={<Product/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path="/product/:id" element={<SingleProduct/>} />
        <Route path='/Cartpage' element={<CartPage/>}/>
        <Route path='/*' element={<Error/>}/>
      </Routes>
    </div>
  )
}

export default Allrout