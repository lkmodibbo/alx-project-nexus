import React from "react";
import Button from "./Button";

interface Props {
  total: number;
  onProceed: () => void;
}

const CartSummary: React.FC<Props> = ({ total, onProceed }) => {
  return (
    <div className="border rounded p-4 shadow flex flex-col gap-4">
      <h3 className="font-semibold text-lg">Order Summary</h3>
      <p>Total: ${total}</p>
      <Button onClick={onProceed}>Proceed to Payment</Button>
    </div>
  );
};

export default CartSummary;
