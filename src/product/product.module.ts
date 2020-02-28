import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { product } from '../entities/product';

@Module({
  imports: [
    TypeOrmModule.forFeature([product])
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
