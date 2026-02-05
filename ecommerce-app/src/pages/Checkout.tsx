import React, { useState } from "react";
import { useCart } from "context/CartContext";
import ProductCard from "ui/ProductCard";
import Button from "ui/Button";

const Checkout: React.FC = () => {
  const { cartItems, toggleProduct } = useCart();

  // Track quantity per product
  const [quantities, setQuantities] = useState(
    () =>
      cartItems.reduce((acc, item) => {
        acc[item.id] = 1; // default quantity = 1
        return acc;
      }, {} as Record<number, number>)
  );

  // Increase or decrease quantity
  const handleQuantityChange = (id: number, newQty: number) => {
    if (newQty < 1) return;
    setQuantities({ ...quantities, [id]: newQty });
  };

  // Calculate total
  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.price * (quantities[item.id] || 1);
  }, 0);

  // Proceed to payment
  const handleProceed = () => {
    alert(`Proceeding to payment. Total: $${totalAmount.toFixed(2)}`);
  };

  // Empty cart message
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
        <p>Add some products before checkout.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: Product Cards with Quantity */}
        <div className="flex-1 flex flex-col gap-4">
          {cartItems.map((product) => (
            <div key={product.id} className="flex flex-col gap-2">
              {/* Reuse your ProductCard */}
              <ProductCard product={product} />

              {/* Quantity Controls */}
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() =>
                    handleQuantityChange(
                      product.id,
                      (quantities[product.id] || 1) - 1
                    )
                  }
                  className="px-3 py-1 border rounded hover:bg-gray-200"
                >
                  -
                </button>
                <span className="font-medium">{quantities[product.id]}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(
                      product.id,
                      (quantities[product.id] || 1) + 1
                    )
                  }
                  className="px-3 py-1 border rounded hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Order Summary */}
        <div className="flex-1 border rounded-md p-6 shadow flex flex-col gap-4 h-fit">
          <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
          <p>Total Items: {cartItems.length}</p>
          <p className="font-semibold text-lg">Total: ${totalAmount.toFixed(2)}</p>
          <Button onClick={handleProceed}>Proceed to Payment</Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
