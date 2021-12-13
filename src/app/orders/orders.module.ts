import { CartsModule } from '@app/carts/carts.module';
import { FilesModule } from '@app/files/files.module';
import { OrdersController } from '@app/orders/controller/orders.controller';
import { OrdersRepository } from '@app/orders/repository/orders.repository';
import { OrdersService } from '@app/orders/service/orders.service';
import { ProductsModule } from '@app/products/products.module';
import { multerConfiguration } from '@config/multer.configuration';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrdersRepository]),
    CartsModule,
    ProductsModule,
    FilesModule,
    MulterModule.register(multerConfiguration),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
