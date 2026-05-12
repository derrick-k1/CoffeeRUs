import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import  Navbar  from './components/Navbar'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Shop from './pages/Shop'


function  App(){
  return (
        <BrowserRouter>
                <Navbar/>
        </BrowserRouter>
  )
}

export default App;
