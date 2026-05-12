import React from 'react'
import { NavLink } from 'react-router'

function Navbar(){ 
  return (
    <header className="bg-gradient-to-r from-amber-500 to-orange-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-6">
          {/* Logo */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg hover:scale-105 transition-transform duration-200">
              ☕ Coffee R Us
            </h1>
          </div>
          
          {/* Navigation */}
          <nav>
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-git 8 items-center">
              <li>
                <NavLink 
                  to="/" 
                  className={({ isActive }) =>
                    `nav-link px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                      isActive 
                        ? 'bg-white text-amber-600 shadow-md shadow-white/25 scale-105' 
                        : 'text-white/90 hover:text-white hover:bg-white/20 hover:shadow-lg'
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/shop" 
                  className={({ isActive }) =>
                    `nav-link px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                      isActive 
                        ? 'bg-white text-amber-600 shadow-md shadow-white/25 scale-105' 
                        : 'text-white/90 hover:text-white hover:bg-white/20 hover:shadow-lg'
                    }`
                  }
                >
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/admin" 
                  className={({ isActive }) =>
                    `nav-link px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                      isActive 
                        ? 'bg-white text-amber-600 shadow-md shadow-white/25 scale-105' 
                        : 'text-white/90 hover:text-white hover:bg-white/20 hover:shadow-lg'
                    }`
                  } element="{<Admin />}"
                >
                  Admin
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar;