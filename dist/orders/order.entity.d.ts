import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';
export declare enum PaymentMethod {
    PIX = "pix",
    CREDIT = "credit",
    DEBIT = "debit"
}
export declare class Order {
    id: string;
    user: User;
    items: OrderItem[];
    total: number;
    paymentMethod: PaymentMethod;
    status: string;
    createdAt: Date;
}
export declare class OrderItem {
    id: string;
    order: Order;
    product: Product;
    quantity: number;
    unitPrice: number;
}
