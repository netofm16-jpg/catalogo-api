import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { UsersService } from './users/users.service';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/category.entity';
import { ProductsModule } from './products/products.module';
import { Product } from './products/product.entity';
import { RevokedToken } from './auth/entities/revoked-token.entity';
import { OrdersModule } from './orders/orders.module';
import { Order, OrderItem } from './orders/order.entity';
import * as bcrypt from 'bcryptjs';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'root',
      database: process.env.DB_NAME || 'api_catalogo',
      entities: [User, Category, Product, RevokedToken, Order, OrderItem],
      synchronize: true,
      logging: false,
    }),
    UsersModule,
    AuthModule,
    CategoriesModule,
    ProductsModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly usersService: UsersService) {}

  async onModuleInit(): Promise<void> {
    // seed admin padrão caso não exista
    const adminPassword = 'Admin@123';
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await this.usersService.ensureAdminSeed({
      name: 'Administrador',
      email: 'admin@catalogo.local',
      passwordHash,
    });
  }
}
