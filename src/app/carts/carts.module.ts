import { CartsRepository } from '@app/carts/database/repositories/carts.repository';
import { CartsService } from '@app/carts/services/carts.service';
import { ProductsModule } from '@app/products/products.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CartsRepository]), ProductsModule],
  providers: [CartsService],
  exports: [CartsService],
})
export class CartsModule {}
