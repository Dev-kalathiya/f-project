import React from 'react'
import { Link, Routes } from 'react-router-dom'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';




const Nav = () => {
  return (
    <div>
        <Link to='/' >Home</Link>
        <Link to='/Product'>Product</Link>
        <Link to='/Login' >Login</Link>
        <Link to='/Signup'>signup</Link>
    </div>
  )
}

export default Nav