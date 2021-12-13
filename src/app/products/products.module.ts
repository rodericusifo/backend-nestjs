import { ProductsController } from '@app/products/controller/products.controller';
import { ProductsRepository } from '@app/products/repository/products.repository';
import { ProductsService } from '@app/products/service/products.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsRepository])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
