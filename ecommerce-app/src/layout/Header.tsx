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
import { useCart } from "context/CartContext";
import Icon from "ui/Icon";
import { FaUser } from "react-icons/fa";

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Icon icon={FaUser} className="text-xl text-white" />
        <Icon icon={FiMenu} className="w-7 h-7 text-gray-700 cursor-pointer" />

        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-[#f68b1e]"
        >
          FlexShop
        </Link>

        <Icon
          icon={FiStar}
          className="w-6 h-6 bg-[#f68b1e] text-white rounded-full p-1"
        />
      </div>

      <form onSubmit={handleSearch} className="flex items-center w-1/2 mx-6">
        <div className="relative w-full">
          <Icon
            icon={FiSearch}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f68b1e]"
          />
        </div>
      </form>

      <div className="flex items-center gap-6">
        <Link
          to="/login"
          className="flex items-center gap-1 text-gray-700 hover:text-[#f68b1e] transition"
        >
          <Icon icon={FiUser} className="w-6 h-6" />

          <span className="text-sm font-medium hidden sm:inline">
            Account
          </span>
        </Link>

        <Link
          to="/help"
          className="flex items-center gap-1 text-gray-700 hover:text-[#f68b1e] transition"
        >
          <Icon icon={FiHelpCircle} className="w-6 h-6" />

          <span className="text-sm font-medium hidden sm:inline">
            Help
          </span>
        </Link>

        <Link to="/cart" className="relative">
          <Icon
            icon={FiShoppingCart}
            className="w-7 h-7 text-gray-700 hover:text-[#f68b1e]"
          />

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
