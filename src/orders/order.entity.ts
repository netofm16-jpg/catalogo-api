import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';

const numericTransformer = {
  to: (value?: number | null) => (typeof value === 'number' ? value : null),
  from: (value?: string | null) => (typeof value === 'string' ? parseFloat(value) : (value as any)),
};

export enum PaymentMethod {
  PIX = 'pix',
  CREDIT = 'credit',
  DEBIT = 'debit',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, { eager: true, nullable: false, onDelete: 'RESTRICT' })
  user!: User;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: ['insert'], eager: true })
  items!: OrderItem[];

  @Column({ type: 'numeric', precision: 14, scale: 2, transformer: numericTransformer })
  total!: number;

  @Column({ type: 'varchar', length: 20 })
  paymentMethod!: PaymentMethod;

  @Column({ type: 'varchar', length: 20, default: 'paid' })
  status!: string; // paid

  @CreateDateColumn()
  createdAt!: Date;
}

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Order, (order) => order.items, { nullable: false, onDelete: 'CASCADE' })
  order!: Order;

  @ManyToOne(() => Product, { eager: true, nullable: false, onDelete: 'RESTRICT' })
  product!: Product;

  @Column({ type: 'int' })
  quantity!: number;

  @Column({ type: 'numeric', precision: 14, scale: 2, transformer: numericTransformer })
  unitPrice!: number;
}


