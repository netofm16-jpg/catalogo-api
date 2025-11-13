import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(req: any, body: CreateOrderDto): Promise<import("./order.entity").Order>;
    my(req: any): Promise<import("./order.entity").Order[]>;
    findOne(req: any, id: string): Promise<import("./order.entity").Order>;
}
