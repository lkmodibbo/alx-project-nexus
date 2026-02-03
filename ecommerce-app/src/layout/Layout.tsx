// src/components/layout/Layout.tsx
import React from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="font-bold text-xl">
            E-Shop
          </Link>
          <nav className="flex gap-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/cart" className="hover:underline">Cart</Link>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">Sign Up</Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow bg-gray-50">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        &copy; {new Date().getFullYear()} E-Shop. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
