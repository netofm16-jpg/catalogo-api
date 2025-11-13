import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(params: { name: string }): Promise<Category> {
    const entity = this.categoryRepository.create({ name: params.name });
    return await this.categoryRepository.save(entity);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findOne(id: string): Promise<Category> {
    const found = await this.categoryRepository.findOne({ where: { id } });
    if (!found) throw new NotFoundException('Categoria não encontrada');
    return found;
  }

  async update(id: string, params: { name?: string }): Promise<Category> {
    const category = await this.findOne(id);
    if (typeof params.name === 'string') {
      category.name = params.name;
    }
    return await this.categoryRepository.save(category);
  }

  async remove(id: string): Promise<void> {
    const result = await this.categoryRepository.delete(id);
    if (!result.affected) throw new NotFoundException('Categoria não encontrada');
  }
}


