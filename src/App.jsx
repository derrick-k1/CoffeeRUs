import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import  Navbar  from './components/Navbar'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Shop from './pages/Shop'
import ProductCard from './components/ProductCard'

function  App(){
  return (
        <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/shop' element={<Shop />} />
                    <Route path='/admin' element={<Admin />} />
                </Routes>
        </BrowserRouter>
  )
}

export default App;
