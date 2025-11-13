import { Repository } from 'typeorm';
import { Order, OrderItem, PaymentMethod } from './order.entity';
import { Product } from '../products/product.entity';
import { User } from '../users/user.entity';
export declare class OrdersService {
    private readonly orderRepo;
    private readonly itemRepo;
    private readonly productRepo;
    private readonly userRepo;
    constructor(orderRepo: Repository<Order>, itemRepo: Repository<OrderItem>, productRepo: Repository<Product>, userRepo: Repository<User>);
    create(params: {
        userId: string;
        items: {
            productId: string;
            quantity: number;
        }[];
        paymentMethod: PaymentMethod;
    }): Promise<Order>;
    findMy(userId: string): Promise<Order[]>;
    findMyById(userId: string, orderId: string): Promise<Order>;
}
