import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { paymentService } from "../services/paymentService";
import { orderService } from "../services/orderService";
import Button from "ui/Button";
import Loader from "ui/Loader";

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { clearCart } = useCart();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const paymentId = searchParams.get("paymentId");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [payment, setPayment] = useState<any>(null);
  const [order, setOrder] = useState<any>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardholderName, setCardholderName] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/auth");
      return;
    }

    if (!orderId || !paymentId) {
      setError("Invalid payment session");
      return;
    }

    fetchPaymentDetails();
  }, [token, orderId, paymentId]);

  const fetchPaymentDetails = async () => {
    try {
      setLoading(true);
      if (paymentId && token) {
        const paymentData = await paymentService.getPayment(token, parseInt(paymentId));
        setPayment(paymentData);

        if (orderId && token) {
          const orderData = await orderService.getOrder(token, parseInt(orderId));
          setOrder(orderData);
        }
      }
    } catch (err) {
      setError("Failed to load payment details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cardNumber || !expiryDate || !cvc || !cardholderName) {
      setError("Please fill in all card details");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Simulate payment processing
      // In a real app, you would integrate with a payment gateway like Stripe, PayPal, etc.
      const transactionId = `TXN-${Date.now()}`;

      // Update payment status to processing
      if (paymentId && token) {
        await paymentService.updatePayment(
          token,
          parseInt(paymentId),
          "processing",
          transactionId
        );
      }

      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Update payment status to completed
      if (paymentId && token) {
        await paymentService.updatePayment(
          token,
          parseInt(paymentId),
          "completed",
          transactionId
        );
      }

      // Confirm payment in order
      if (orderId && paymentId && token) {
        await orderService.confirmPayment(
          token,
          parseInt(orderId),
          parseInt(paymentId)
        );
      }

      // Clear cart after successful payment
      clearCart();

      // Redirect to success page
      navigate(`/payment-success?orderId=${orderId}`);
    } catch (err) {
      setError("Payment failed. Please try again.");
      console.error(err);
      setLoading(false);
    }
  };

  if (!token) {
    return null;
  }

  if (loading && !payment) {
    return <Loader />;
  }

  if (error && !payment) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={() => navigate("/checkout")}>Back to Checkout</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Payment</h1>

      {order && (
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Order ID:</span>
            <span className="font-medium">#{order.id}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Amount:</span>
            <span className="font-medium">${Number(order.total_amount).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Status:</span>
            <span className="font-medium capitalize">{order.status}</span>
          </div>
        </div>
      )}

      <form onSubmit={handlePaymentSubmit} className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-6">Card Information</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Cardholder Name</label>
          <input
            type="text"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            placeholder="John Doe"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) =>
              setCardNumber(e.target.value.replace(/\s+/g, "").slice(0, 16))
            }
            placeholder="1234 5678 9012 3456"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Expiry Date</label>
            <input
              type="text"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value.slice(0, 5))}
              placeholder="MM/YY"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">CVC</label>
            <input
              type="text"
              value={cvc}
              onChange={(e) => setCvc(e.target.value.slice(0, 3))}
              placeholder="123"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Processing..." : "Complete Payment"}
        </Button>

        <button
          type="button"
          onClick={() => navigate("/checkout")}
          className="w-full mt-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition"
          disabled={loading}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Payment;
