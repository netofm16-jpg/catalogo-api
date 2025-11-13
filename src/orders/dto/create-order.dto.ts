import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsEnum, IsInt, IsNotEmpty, IsUUID, Min, ValidateNested } from 'class-validator';
import { PaymentMethod } from '../order.entity';

class OrderItemInput {
  @IsUUID()
  productId!: string;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  quantity!: number;
}

export class CreateOrderDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemInput)
  items!: OrderItemInput[];

  @IsEnum(PaymentMethod)
  paymentMethod!: PaymentMethod;
}


