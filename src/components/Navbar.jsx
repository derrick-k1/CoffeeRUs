import { NavLink } from 'react-router'

import React from 'react'

export const Navbar = () => {
  return (
    <header>
        <nav>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
        </nav>
    </header>
  )
}
