import axios from "axios";
import { Product } from "types/Product";

const API_BASE_URL = "https://abuaminuu.pythonanywhere.com/api";

// ✅ Returns always Product[]
export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/`);
    const data = response.data;

    if (Array.isArray(data)) return data;
    if (Array.isArray(data.results)) return data.results;
    if (Array.isArray(data.products)) return data.products;
    if (Array.isArray(data.data)) return data.data;

    throw new Error("Unexpected products response format");
  } catch (err: any) {
    if (err.response) {
      // Server responded with a status outside 2xx
      const msg = `Request failed with status ${err.response.status}: ${JSON.stringify(
        err.response.data
      )}`;
      throw new Error(msg);
    }
    if (err.request) {
      // Request made but no response received — often CORS or network
      throw new Error(
        "No response received from products API (possible CORS or network error)."
      );
    }
    // Something else happened creating the request
    throw new Error(err.message || "Unknown error fetching products");
  }
};
