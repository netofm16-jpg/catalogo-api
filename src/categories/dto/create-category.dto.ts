import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @MaxLength(120)
  name!: string;
}


