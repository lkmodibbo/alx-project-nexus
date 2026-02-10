// Ensure API base URL includes a protocol. If user sets just a host like
// "abuaminuu.pythonanywhere.com" we'll default to https:// for remote hosts.
let API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";
API_BASE_URL = API_BASE_URL.trim();
if (!API_BASE_URL.match(/^https?:\/\//)) {
  // Prefer https for remote hosts; keep localhost as http when explicitly provided
  API_BASE_URL = `https://${API_BASE_URL}`;
}
// Remove trailing slash for predictable URL joins
API_BASE_URL = API_BASE_URL.replace(/\/+$/g, "");

export interface LoginResponse {
  access: string;
  refresh: string;
  user: {
    id: number;
    username: string;
    email: string;
    name: string;
  };
}

export interface RegisterResponse {
  id: number;
  username: string;
  email: string;
  name: string;
}

export const authService = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    return response.json();
  },

  register: async (
    username: string,
    email: string,
    password: string,
    name: string
  ): Promise<RegisterResponse> => {
    const response = await fetch(`${API_BASE_URL}/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password, name }),
    });

      if (!response.ok) {
        let errText = "Registration failed";
        try {
          const body = await response.json();
          // Backend often returns {detail: '...'} or field errors
          errText = body.detail || JSON.stringify(body);
        } catch (e) {
          // ignore json parse errors
        }
        throw new Error(errText);
      }

      return response.json();
  },

  refreshToken: async (refreshToken: string): Promise<{ access: string }> => {
    const response = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      throw new Error("Token refresh failed");
    }

    return response.json();
  },

  getUserProfile: async (token: string, userId: number) => {
    const response = await fetch(`${API_BASE_URL}/api/users/${userId}/profile/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }

    return response.json();
  },
  // Resend verification email for a user. Some backends allow unauthenticated resend; token optional.
  resendVerification: async (token: string | null, userId: number) => {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(`${API_BASE_URL}/api/users/${userId}/resend-verification/`, {
      method: "POST",
      headers,
    });

    if (!response.ok) {
      throw new Error("Failed to resend verification email");
    }

    return response.json();
  },
};
