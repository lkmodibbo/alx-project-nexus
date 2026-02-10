const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

export interface Payment {
  id: number;
  order_id: number;
  amount: number;
  status: string;
  payment_method: string;
  transaction_id?: string;
  created_at: string;
  updated_at: string;
}

export const paymentService = {
  createPayment: async (
    token: string,
    orderId: number,
    amount: number,
    paymentMethod: string = "card"
  ): Promise<Payment> => {
    const response = await fetch(`${API_BASE_URL}/api/payments/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id: orderId,
        amount,
        status: "pending",
        payment_method: paymentMethod,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create payment");
    }

    return response.json();
  },

  updatePayment: async (
    token: string,
    paymentId: number,
    status: string,
    transactionId?: string
  ): Promise<Payment> => {
    const body: any = { status };
    if (transactionId) {
      body.transaction_id = transactionId;
    }

    const response = await fetch(`${API_BASE_URL}/api/payments/${paymentId}/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to update payment");
    }

    return response.json();
  },

  getPayment: async (token: string, paymentId: number): Promise<Payment> => {
    const response = await fetch(`${API_BASE_URL}/api/payments/${paymentId}/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch payment");
    }

    return response.json();
  },
};
