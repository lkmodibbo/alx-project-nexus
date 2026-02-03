// src/components/layout/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">
          E-Shop
        </Link>

        <ul className="flex gap-6 items-center">
          <li>
            <Link to="/" className="hover:text-gray-200">
              Products
            </Link>
          </li>
          
          <li>
            <Link to="/login" className="hover:text-gray-200">
              Login
            </Link>
          </li>
          <li>
            <Link to="/signup" className="hover:text-gray-200">
              Sign Up
            </Link>
          </li>
          <li>
            <Link to="/cart" className="hover:text-gray-200">
              Cart
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
