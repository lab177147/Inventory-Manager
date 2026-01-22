import { IsString, IsNumber, IsOptional, Min, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @Min(0.01)
  price: number;
}
