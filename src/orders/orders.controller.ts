import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Req() req: any, @Body() body: CreateOrderDto) {
    const userId = req.user.id as string;
    return await this.ordersService.create({ userId, items: body.items, paymentMethod: body.paymentMethod });
  }

  @Get('my')
  async my(@Req() req: any) {
    const userId = req.user.id as string;
    return await this.ordersService.findMy(userId);
  }

  @Get(':id')
  async findOne(@Req() req: any, @Param('id') id: string) {
    const userId = req.user.id as string;
    return await this.ordersService.findMyById(userId, id);
  }
}


