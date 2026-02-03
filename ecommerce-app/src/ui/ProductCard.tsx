import { Product } from "../types/Product";
import { useState } from "react";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const [added, setAdded] = useState(false);

  return (
    <div className="border rounded-md bg-white shadow-sm hover:shadow-md transition overflow-hidden max-w-[220px]">
      <img
        src={product.image || "https://via.placeholder.com/300"}
        alt={product.name}
        className="w-full h-56 object-cover"
      />
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-800">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          {product.category || "Fashion Item"}
        </p>
        <p className="text-sm font-semibold text-gray-800 mt-2 text-right">
          ${product.price.toFixed(2)}
        </p>
        <button
          onClick={() => setAdded(true)}
          className={`w-full mt-3 text-xs py-2 rounded border transition
            ${
              added
                ? "bg-orange-900 text-white border-orange-900"
                : "bg-[#f68b1e] text-white hover:bg-[#e07c18] shadow-sm hover:shadow-md"
            }`}
        >
          {added ? "Added to cart" : "Add to cart"}
        </button>

      </div>
    </div>
  );
};

export default ProductCard;
