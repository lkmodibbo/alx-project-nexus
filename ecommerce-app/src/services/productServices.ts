import axios from "axios";
import { Product } from "types/Product";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(`${API_BASE_URL}/products/`);
  return response.data;
};
