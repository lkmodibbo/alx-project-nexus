import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiUser, FiHelpCircle } from "react-icons/fi";

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <header className="bg-white shadow px-6 py-4 flex items-center justify-between">

      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-[#f68b1e]">
        FlexShop
      </Link>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex flex-1 mx-6 max-w-2xl"
      >
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#f68b1e]"
        />

        <button
          type="submit"
          className="bg-[#f68b1e] text-white px-6 rounded-r-lg hover:bg-[#e07d18] transition"
        >
          Search
        </button>
      </form>

      {/* Right Menu */}
      <div className="flex items-center gap-6">

        {/* Account */}
        <Link
          to="/login"
          className="flex items-center gap-1 text-gray-700 hover:text-[#f68b1e] transition"
        >
          <FiUser className="w-6 h-6" />
          <span className="text-sm font-medium hidden sm:inline">
            Account
          </span>
        </Link>

        {/* Help */}
        <Link
          to="/help"
          className="flex items-center gap-1 text-gray-700 hover:text-[#f68b1e] transition"
        >
          <FiHelpCircle className="w-6 h-6" />
          <span className="text-sm font-medium hidden sm:inline">
            Help
          </span>
        </Link>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <FiShoppingCart className="w-7 h-7 text-gray-700 hover:text-[#f68b1e] transition" />

          {/* Cart Badge */}
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            0
          </span>
        </Link>

      </div>
    </header>
  );
};

export default Header;
