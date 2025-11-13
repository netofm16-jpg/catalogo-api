import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderItem, PaymentMethod } from './order.entity';
import { Product } from '../products/product.entity';
import { User } from '../users/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private readonly itemRepo: Repository<OrderItem>,
    @InjectRepository(Product) private readonly productRepo: Repository<Product>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async create(params: {
    userId: string;
    items: { productId: string; quantity: number }[];
    paymentMethod: PaymentMethod;
  }): Promise<Order> {
    const user = await this.userRepo.findOne({ where: { id: params.userId } });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    const products = await this.productRepo.findBy(params.items.map((i) => ({ id: i.productId })) as any);
    const productMap = new Map(products.map((p) => [p.id, p] as const));

    const items: OrderItem[] = [];
    let total = 0;
    for (const input of params.items) {
      const product = productMap.get(input.productId);
      if (!product) throw new NotFoundException(`Produto não encontrado: ${input.productId}`);
      const unitPrice = product.price;
      const item = this.itemRepo.create({ product, quantity: input.quantity, unitPrice });
      total += unitPrice * input.quantity;
      items.push(item);
    }

    const order = this.orderRepo.create({ user, items, total, paymentMethod: params.paymentMethod, status: 'paid' });
    return await this.orderRepo.save(order);
  }

  async findMy(userId: string): Promise<Order[]> {
    return await this.orderRepo.find({ where: { user: { id: userId } as any }, order: { createdAt: 'DESC' } });
  }

  async findMyById(userId: string, orderId: string): Promise<Order> {
    const order = await this.orderRepo.findOne({ where: { id: orderId, user: { id: userId } as any } });
    if (!order) throw new NotFoundException('Pedido não encontrado');
    return order;
  }
}


