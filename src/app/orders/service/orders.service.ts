import { CartsService } from '@app/carts/service/carts.service';
import { AddProductToOrderDTO } from '@app/orders/dto/add-product-to-order.dto';
import { CreateOrderDTO } from '@app/orders/dto/create-order.dto';
import { OrderDTO } from '@app/orders/dto/order.dto';
import { ReadOrderByAdminDTO } from '@app/orders/dto/read-order-by-admin.dto';
import { OrdersRepository } from '@app/orders/repository/orders.repository';
import { IOrdersService } from '@app/orders/service/interface/orders-service.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';

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
    const foundOrderDTO = await this.ordersRepository.findOrderWithUserId(
      orderDTO,
    );
    await this.cartsService.createCart({
      orderId: foundOrderDTO.id,
      productId: payload.productId,
      quantity: payload.quantity,
    });
  }

  async readOrderByAdmin(payload: ReadOrderByAdminDTO): Promise<OrderDTO> {
    const orderDTO = plainToClass(OrderDTO, {
      id: payload.id,
    });
    const foundOrderDTO = await this.ordersRepository.findOrder(orderDTO);
    foundOrderDTO.carts = await this.cartsService.readAllCart({
      orderId: foundOrderDTO.id,
    });
    return foundOrderDTO;
  }
}
