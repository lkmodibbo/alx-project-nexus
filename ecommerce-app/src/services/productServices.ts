// src/services/productServices.ts
import axios from "axios";
import { Product } from "types/Product";

const API_BASE_URL = "https://abuaminuu.pythonanywhere.com/api";

// ✅ Returns always Product[]
export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/`);

    // API might return an array directly or wrap in { products: [...] }
    if (Array.isArray(response.data)) {
      return response.data;
    } else if (Array.isArray(response.data.products)) {
      return response.data.products;
    } else {
      console.warn("Unexpected API response format:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Failed to fetch products", error);
    return [];
  }
};
