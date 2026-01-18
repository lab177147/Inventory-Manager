import { Controller, Get, Post, Delete, Param, Body, ParseIntPipe, Query, Put} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() productData: Partial<Product>): Promise<Product> {
    return this.productsService.create(productData);
  }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productsService.remove(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateData: Partial<Product>): Promise<Product> {
    return this.productsService.update(id, updateData);
  }

  @Get('search')
  search(@Query('query') query: string): Promise<Product[]> {
    return this.productsService.search(query);
  }

  @Get('latest')
  latest(): Promise<Product[]> {
    return this.productsService.latest();
  }
}
