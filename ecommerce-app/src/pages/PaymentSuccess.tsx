import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "ui/Button";

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-4">
            Your order has been placed successfully.
          </p>
          {orderId && (
            <p className="text-lg font-semibold text-gray-800">
              Order ID: <span className="text-blue-600">#{orderId}</span>
            </p>
          )}
        </div>

        <div className="border rounded-lg p-6 bg-gray-50 mb-6">
          <p className="text-gray-700 mb-4">
            Thank you for your purchase. You will receive an email confirmation shortly.
          </p>
          <p className="text-sm text-gray-600">
            You can track your order status in your account dashboard.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button onClick={() => navigate("/")} className="w-full">
            Continue Shopping
          </Button>
          <button
            onClick={() => navigate("/cart")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
          >
            View Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
