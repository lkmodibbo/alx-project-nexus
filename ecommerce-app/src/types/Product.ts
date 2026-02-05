
export interface Product {
    id: number;
    name: string;
    description?: string;
    category?: string
    price: number;
    stock?: number;
    created_at?: string;
    updated_at?: string;
    owner?: number;
    image?: string;
}