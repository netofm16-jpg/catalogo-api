import { Category } from '../categories/category.entity';
export declare class Product {
    id: string;
    name: string;
    price: number;
    description?: string | null;
    imageUrl: string;
    imageBase64?: string | null;
    featured: boolean;
    published: boolean;
    category: Category;
}
