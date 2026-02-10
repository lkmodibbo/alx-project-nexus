const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

export interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  user_id: number;
  total_amount: number;
  status: string;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export const orderService = {
  createOrder: async (token: string, totalAmount: number): Promise<Order> => {
    const response = await fetch(`${API_BASE_URL}/api/orders/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        total_amount: totalAmount,
        status: "pending",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create order");
    }

    return response.json();
  },

  addItemToOrder: async (
    token: string,
    orderId: number,
    productId: number,
    quantity: number,
    price: number
  ) => {
    const response = await fetch(
      `${API_BASE_URL}/api/orders/${orderId}/add_item/${productId}/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity,
          price,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add item to order");
    }

    return response.json();
  },

  confirmPayment: async (token: string, orderId: number, paymentId: number) => {
    const response = await fetch(
      `${API_BASE_URL}/api/orders/${orderId}/confirm-payment/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payment_id: paymentId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to confirm payment");
    }

    return response.json();
  },

  getOrder: async (token: string, orderId: number): Promise<Order> => {
    const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch order");
    }

    return response.json();
  },
};
