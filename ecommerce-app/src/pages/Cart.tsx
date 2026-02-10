import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "ui/Button";
import { useCart } from "../context/CartContext";

const Cart: React.FC = () => {
  const { cartItems, toggleProduct } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {cartItems.map(item => (
            <div key={item.id} className="border rounded-md p-4 bg-white shadow-sm flex justify-between items-center">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.category}</p>
                <p className="font-semibold text-gray-800 mt-2">${Number(item.price).toFixed(2)}</p>
              </div>
              <button
                onClick={() => toggleProduct(item)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          ))}
          <Button onClick={() => navigate("/checkout")}>Checkout</Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
