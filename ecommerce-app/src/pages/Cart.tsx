import React from "react";
import Button from "ui/Button";

const Cart: React.FC = () => {
  const cartItems = []; // empty for now

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {/* Map cart items here later */}
          <Button>Checkout</Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
