import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "ui/Button";
import { useCart } from "../context/CartContext";
import { productImages } from "utils/productImages";

const Cart: React.FC = () => {
  const { cartItems, toggleProduct } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 bg-gray-50">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center">
            Your cart is empty.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {cartItems.map(item => (
              <div
                key={item.id}
                className="border rounded-md p-4 bg-white shadow-sm flex gap-4 items-start"
              >
                {/* Product Image */}
                <div className="w-24 h-24 bg-gray-200 rounded-md flex-shrink-0 overflow-hidden">
                  <img
                    src={productImages[item.id] || productImages.default}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {item.category}
                  </p>

                  <p className="font-semibold text-gray-800 mt-2">
                    ${Number(item.price).toFixed(2)}
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => toggleProduct(item)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition flex-shrink-0"
                >
                  Remove
                </button>
              </div>
            ))}

            {/* Checkout Button */}
            <Button
              className="w-full"
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
