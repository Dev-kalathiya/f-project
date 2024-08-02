import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Product from '../pages/Product'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Error from '../pages/Error'

const Allrout = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Products' element={<Product/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/*' element={<Error/>}/>
      </Routes>
    </div>
  )
}

export default Allrout