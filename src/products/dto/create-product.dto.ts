import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  name!: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price!: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  imageUrl?: string; // default '/placeholder.svg' se não enviado

  @IsOptional()
  @IsString()
  image?: string; // aceita base64 (sem limite aqui) ou URL alternativa

  @IsOptional()
  @IsString()
  imageBase64?: string; // imagem salva em base64 no banco

  @IsUUID()
  categoryId!: string;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsBoolean()
  published?: boolean;
}


