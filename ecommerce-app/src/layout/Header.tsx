import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiShoppingCart,
  FiUser,
  FiHelpCircle,
  FiMenu,
  FiSearch,
  FiStar,
} from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { useCart } from "context/CartContext";

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { cartItems } = useCart();
  const navigate = useNavigate();

  // ✅ Icon renderer fix
  const renderIcon = (IconComponent: any, className?: string) => {
    return React.createElement(IconComponent, { className });
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {renderIcon(FaUser, "text-xl text-white")}

        {renderIcon(FiMenu, "w-7 h-7 text-gray-700 cursor-pointer")}

        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-[#f68b1e]"
        >
          FlexShop
        </Link>

        {renderIcon(
          FiStar,
          "w-6 h-6 bg-[#f68b1e] text-white rounded-full p-1"
        )}
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex items-center w-1/2 mx-6">
        <div className="relative w-full">
          {renderIcon(
            FiSearch,
            "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          )}

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f68b1e]"
          />
        </div>
      </form>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        <Link
          to="/login"
          className="flex items-center gap-1 text-gray-700 hover:text-[#f68b1e] transition"
        >
          {renderIcon(FiUser, "w-6 h-6")}

          <span className="text-sm font-medium hidden sm:inline">
            Account
          </span>
        </Link>

        <Link
          to="/help"
          className="flex items-center gap-1 text-gray-700 hover:text-[#f68b1e] transition"
        >
          {renderIcon(FiHelpCircle, "w-6 h-6")}

          <span className="text-sm font-medium hidden sm:inline">
            Help
          </span>
        </Link>

        <Link to="/cart" className="relative">
          {renderIcon(
            FiShoppingCart,
            "w-7 h-7 text-gray-700 hover:text-[#f68b1e]"
          )}

          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
