import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() body: CreateProductDto) {
    const isBase64 = typeof body.image === 'string' && body.image.startsWith('data:');
    return await this.productsService.create({
      name: body.name,
      price: body.price,
      description: body.description,
      imageUrl: body.imageUrl ?? (isBase64 ? undefined : body.image),
      imageBase64: body.imageBase64 ?? (isBase64 ? body.image : undefined),
      categoryId: body.categoryId,
      featured: body.featured,
      published: body.published,
    });
  }

  @Get()
  async findAll() {
    return await this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateProductDto) {
    let imageUrl = body.imageUrl;
    let imageBase64 = body.imageBase64;
    if (typeof body.image === 'string') {
      const asBase64 = body.image.startsWith('data:');
      if (asBase64) imageBase64 = body.image;
      else imageUrl = body.image;
    }
    return await this.productsService.update(id, {
      name: body.name,
      price: body.price,
      description: body.description,
      imageUrl,
      imageBase64,
      categoryId: body.categoryId,
      featured: body.featured,
      published: body.published,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.productsService.remove(id);
    return { deleted: true };
  }
}


