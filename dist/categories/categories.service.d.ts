import { Repository } from 'typeorm';
import { Category } from './category.entity';
export declare class CategoriesService {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    create(params: {
        name: string;
    }): Promise<Category>;
    findAll(): Promise<Category[]>;
    findOne(id: string): Promise<Category>;
    update(id: string, params: {
        name?: string;
    }): Promise<Category>;
    remove(id: string): Promise<void>;
}
