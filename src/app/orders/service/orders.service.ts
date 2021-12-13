import { CartsService } from '@app/carts/service/carts.service';
import { CreateOrderDTO } from '@app/orders/dto/create-order.dto';
import { OrderDTO } from '@app/orders/dto/order.dto';
import { OrdersRepository } from '@app/orders/repository/orders.repository';
import { IOrdersService } from '@app/orders/service/interface/orders-service.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { AddProductToOrderDTO } from '../dto/add-product-to-order.dto';

@Injectable()
export class OrdersService implements IOrdersService {
  constructor(
    @InjectRepository(OrdersRepository)
    private readonly ordersRepository: OrdersRepository,
    private readonly cartsService: CartsService,
  ) {}
  async createOrder(payload: CreateOrderDTO) {
    const orderDTO = plainToClass(OrderDTO, payload);
    await this.ordersRepository.saveOrder(orderDTO);
  }

  async addProductToOrder(payload: AddProductToOrderDTO) {
    const orderDTO = plainToClass(OrderDTO, {
      id: payload.id,
      userId: payload.userId,
    });
    const foundOrderDTO = await this.ordersRepository.findOrder(orderDTO);
    await this.cartsService.createCart({
      orderId: foundOrderDTO.id,
      productId: payload.productId,
      quantity: payload.quantity,
    });
  }
}
