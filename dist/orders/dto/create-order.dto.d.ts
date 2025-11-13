import { PaymentMethod } from '../order.entity';
declare class OrderItemInput {
    productId: string;
    quantity: number;
}
export declare class CreateOrderDto {
    items: OrderItemInput[];
    paymentMethod: PaymentMethod;
}
export {};
