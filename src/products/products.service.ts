import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { Category } from '../categories/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(params: {
    name: string;
    price: number;
    description?: string;
    imageUrl?: string;
    imageBase64?: string;
    categoryId: string;
    featured?: boolean;
    published?: boolean;
  }): Promise<Product> {
    const category = await this.categoryRepository.findOne({ where: { id: params.categoryId } });
    if (!category) throw new NotFoundException('Categoria não encontrada');

    const entity = this.productRepository.create({
      name: params.name,
      price: params.price,
      description: params.description,
      imageUrl: params.imageUrl ?? '/placeholder.svg',
      imageBase64: params.imageBase64,
      category,
      featured: params.featured ?? false,
      published: params.published ?? false,
    });
    return await this.productRepository.save(entity);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    const found = await this.productRepository.findOne({ where: { id } });
    if (!found) throw new NotFoundException('Produto não encontrado');
    return found;
  }

  async update(id: string, params: {
    name?: string;
    price?: number;
    description?: string;
    imageUrl?: string;
    imageBase64?: string;
    categoryId?: string;
    featured?: boolean;
    published?: boolean;
  }): Promise<Product> {
    const product = await this.findOne(id);
    if (typeof params.name === 'string') product.name = params.name;
    if (typeof params.price === 'number') product.price = params.price;
    if (typeof params.description === 'string') product.description = params.description;
    if (typeof params.imageUrl === 'string') product.imageUrl = params.imageUrl;
    if (typeof params.imageBase64 === 'string') product.imageBase64 = params.imageBase64;
    if (typeof params.featured === 'boolean') product.featured = params.featured;
    if (typeof params.published === 'boolean') product.published = params.published;

    if (params.categoryId) {
      const category = await this.categoryRepository.findOne({ where: { id: params.categoryId } });
      if (!category) throw new NotFoundException('Categoria não encontrada');
      product.category = category;
    }
    return await this.productRepository.save(product);
  }

  async remove(id: string): Promise<void> {
    const result = await this.productRepository.delete(id);
    if (!result.affected) throw new NotFoundException('Produto não encontrado');
  }
}


