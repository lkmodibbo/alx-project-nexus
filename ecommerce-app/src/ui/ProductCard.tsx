import { useState } from "react";
import { Product } from "types/Product";
import Button from "./Button";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    setAdded(prev => !prev);
  };

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <img
        src={product.image || "/placeholder.png"}
        alt={product.name}
        className="w-full h-40 object-cover rounded"
      />

      <h3 className="font-semibold mt-2">{product.name}</h3>

      <p className="text-gray-500 text-sm">{product.description}</p>

      <p className="font-bold mt-2">${product.price}</p>

      <Button
        className="w-full mt-3"
        onClick={handleAddToCart}
        variant={added ? "secondary" : "primary"}
      >
        {added ? "Added To Cart ✓" : "Add To Cart"}
      </Button>
    </div>
  );
};

export default ProductCard;
