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
  findAll(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ) {
    return this.productsService.findAllPaginated(page, limit);
  }

  @Get('search')
  search(@Query('title') title: string): Promise<Product[]> {
    return this.productsService.search(title);
  }

  @Get('latest')
  latest(): Promise<Product[]> {
    return this.productsService.latest();
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
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<Product>,
  ): Promise<Product> {
    return this.productsService.update(id, updateData);
  }
}
