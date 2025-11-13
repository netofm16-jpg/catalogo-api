import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(body: CreateProductDto): Promise<import("./product.entity").Product>;
    findAll(): Promise<import("./product.entity").Product[]>;
    findOne(id: string): Promise<import("./product.entity").Product>;
    update(id: string, body: UpdateProductDto): Promise<import("./product.entity").Product>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
