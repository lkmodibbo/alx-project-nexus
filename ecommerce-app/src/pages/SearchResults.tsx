import React from "react";
import { useLocation } from "react-router-dom";
import ProductGrid from "../ui/ProductGrid";
import { Product } from "../types/Product";
import { products } from "data/product";

const SearchResults: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("query")?.toLowerCase() || "";

  // Filter products that match the search term
  const filteredProducts: Product[] = products.filter((p) =>
    p.name.toLowerCase().includes(query)
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Search Results for "{query}"
      </h1>

      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default SearchResults;
