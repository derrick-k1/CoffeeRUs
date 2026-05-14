import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Shop from './pages/Shop'
import { CartProvider } from "./context/CartContext"
import { ProductsProvider } from './context/ProductsContext'

function App() {
  return (
    /* 2. Wrap the entire app so Context is available everywhere */
  <CartProvider>
    <ProductsProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </ProductsProvider>
    </CartProvider>
  )
}

export default App;