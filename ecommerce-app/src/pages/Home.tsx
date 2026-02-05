import { useEffect, useState } from "react"
import { getProducts } from "services/productServices";
import { Product } from "types/Product"
import ProductGrid from "ui/ProductGrid";

const Home: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products", error)
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="p-6">
            <ProductGrid products={products}/>
        </div>
    )
}

export default Home;