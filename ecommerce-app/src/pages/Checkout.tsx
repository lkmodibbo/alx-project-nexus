import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "context/CartContext";
import { useAuth } from "context/AuthContext";
import { orderService } from "services/orderService";
import { paymentService } from "services/paymentService";
import ProductCard from "ui/ProductCard";
import Button from "ui/Button";
import Loader from "ui/Loader";

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, toggleProduct } = useCart();
  const { token, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    return total + Number(item.price) * (quantities[item.id] || 1);
  }, 0);

  // Proceed to payment
  const handleProceed = async () => {
    // Check if user is authenticated
    if (!isAuthenticated || !token) {
      // Set flag to redirect back to checkout after login
      localStorage.setItem("referredFrom", "checkout");
      navigate("/auth");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Create order
      const order = await orderService.createOrder(token, totalAmount);

      // Add items to order
      for (const item of cartItems) {
        const quantity = quantities[item.id] || 1;
        await orderService.addItemToOrder(
          token,
          order.id,
          item.id,
          quantity,
          Number(item.price)
        );
      }

      // Create payment
      const payment = await paymentService.createPayment(
        token,
        order.id,
        totalAmount,
        "card"
      );

      // Redirect to payment page
      navigate(
        `/payment?orderId=${order.id}&paymentId=${payment.id}`
      );
    } catch (err) {
      console.error("Checkout error:", err);
      setError("Failed to process checkout. Please try again.");
      setLoading(false);
    }
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
          
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
              {error}
            </div>
          )}
          
          <p>Total Items: {cartItems.length}</p>
          <p className="font-semibold text-lg">Total: ${totalAmount.toFixed(2)}</p>
          
          <Button onClick={handleProceed} disabled={loading} className="w-full">
            {loading ? "Processing..." : "Proceed to Payment"}
          </Button>
          
          <button
            onClick={() => navigate("/cart")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
            disabled={loading}
          >
            Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
