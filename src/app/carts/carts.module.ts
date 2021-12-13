import { CartsRepository } from '@app/carts/repository/carts.repository';
import { CartsService } from '@app/carts/service/carts.service';
import { ProductsModule } from '@app/products/products.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CartsRepository]), ProductsModule],
  providers: [CartsService],
  exports: [CartsService],
})
export class CartsModule {}
