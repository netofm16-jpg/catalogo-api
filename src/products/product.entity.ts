import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../categories/category.entity';

const numericTransformer = {
  to: (value?: number | null) => (typeof value === 'number' ? value : null),
  from: (value?: string | null) => (typeof value === 'string' ? parseFloat(value) : (value as any)),
};

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 200 })
  name!: string;

  @Column({ type: 'numeric', precision: 12, scale: 2, transformer: numericTransformer })
  price!: number;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ length: 300, default: '/placeholder.svg' })
  imageUrl!: string;

  @Column({ type: 'text', nullable: true })
  imageBase64?: string | null;

  @Column({ default: false })
  featured!: boolean;

  @Column({ default: false })
  published!: boolean;

  @ManyToOne(() => Category, { eager: true, nullable: false, onDelete: 'RESTRICT' })
  category!: Category;
}


