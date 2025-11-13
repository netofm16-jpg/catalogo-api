import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { Category } from '../categories/category.entity';
export declare class ProductsService {
    private readonly productRepository;
    private readonly categoryRepository;
    constructor(productRepository: Repository<Product>, categoryRepository: Repository<Category>);
    create(params: {
        name: string;
        price: number;
        description?: string;
        imageUrl?: string;
        imageBase64?: string;
        categoryId: string;
        featured?: boolean;
        published?: boolean;
    }): Promise<Product>;
    findAll(): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    update(id: string, params: {
        name?: string;
        price?: number;
        description?: string;
        imageUrl?: string;
        imageBase64?: string;
        categoryId?: string;
        featured?: boolean;
        published?: boolean;
    }): Promise<Product>;
    remove(id: string): Promise<void>;
}
