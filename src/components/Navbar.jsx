import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="bg-gradient-to-r from-amber-500 to-orange-600 shadow-xl sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          
          {/* Logo - Styled to match Home page branding */}
          <Link to="/" className="group flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm group-hover:bg-white/30 transition-all">
              <span className="text-2xl md:text-3xl">☕</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tighter drop-shadow-md">
              Coffee<span className="text-[#2d241e]">Rus</span>
            </h1>
          </Link>
          
          {/* Navigation */}
          <nav>
            <ul className="flex items-center gap-1 md:gap-3">
              <li>
                <NavLink 
                  to="/" 
                  className={({ isActive }) =>
                    `px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
                      isActive 
                        ? 'bg-white text-orange-600 shadow-lg scale-105' 
                        : 'text-white/90 hover:text-white hover:bg-white/10'
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
                    `px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
                      isActive 
                        ? 'bg-white text-orange-600 shadow-lg scale-105' 
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  Shop
                </NavLink>
              </li>
              
              {/* Subtle Vertical Divider */}
              <div className="w-px h-8 bg-white/20 mx-2 hidden md:block"></div>

              <li>
                <NavLink 
                  to="/admin" 
                  className={({ isActive }) =>
                    `px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                      isActive 
                        ? 'bg-[#2d241e] text-white shadow-xl scale-105' 
                        : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                    }`
                  } 
                >
                  <span className="opacity-70 text-xs">●</span> Admin
                </NavLink>
              </li>
            </ul>
          </nav>

        </div>
      </div>
    </header>
  );
}

export default Navbar;