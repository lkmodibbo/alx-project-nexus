import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "types/Product";

interface ProductGridProps {
  products?: Product[]; // optional for safety
}

const ProductGrid: React.FC<ProductGridProps> = ({ products = [] }) => {
  if (products.length === 0) {
    return <p className="text-center col-span-full">No products found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
