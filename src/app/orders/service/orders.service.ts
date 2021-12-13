import { CartsService } from '@app/carts/service/carts.service';
import { AddProductToOrderDTO } from '@app/orders/dto/add-product-to-order.dto';
import { CreateOrderDTO } from '@app/orders/dto/create-order.dto';
import { OrderDTO } from '@app/orders/dto/order.dto';
import { ReadAllOrderByAdminDTO } from '@app/orders/dto/read-all-order-by-admin.dto';
import { ReadAllOrderByCustomerDTO } from '@app/orders/dto/read-all-order-by-customer.dto';
import { ReadOrderByAdminDTO } from '@app/orders/dto/read-order-by-admin.dto';
import { ReadOrderByCustomerDTO } from '@app/orders/dto/read-order-by-customer.dto';
import { SubmitOrderDTO } from '@app/orders/dto/submit-order.dto';
import { OrdersRepository } from '@app/orders/repository/orders.repository';
import { IOrdersService } from '@app/orders/service/interface/orders-service.interface';
import { ProductsService } from '@app/products/service/products.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatus } from '@shared/enum/order-status.enum';
import { IQuery } from '@shared/interface/other/query.interface';
import { IReadAllServiceMethodResponse } from '@shared/interface/other/service-method-response/read-all-service-method-response.interface';
import { plainToClass } from 'class-transformer';

@Injectable()
export class OrdersService implements IOrdersService {
  constructor(
    @InjectRepository(OrdersRepository)
    private readonly ordersRepository: OrdersRepository,
    private readonly cartsService: CartsService,
    private readonly productsService: ProductsService,
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

  async readOrderByCustomer(
    payload: ReadOrderByCustomerDTO,
  ): Promise<OrderDTO> {
    const orderDTO = plainToClass(OrderDTO, {
      id: payload.id,
      userId: payload.userId,
    });
    const foundOrderDTO = await this.ordersRepository.findOrderWithUserId(
      orderDTO,
    );
    foundOrderDTO.carts = await this.cartsService.readAllCart({
      orderId: foundOrderDTO.id,
    });
    return foundOrderDTO;
  }

  async readAllOrderByAdmin(
    payload: ReadAllOrderByAdminDTO,
  ): Promise<IReadAllServiceMethodResponse<OrderDTO[]>> {
    const query: IQuery = {
      limit: payload.limit,
      page: payload.page,
      sortingBy: payload.sortingBy,
      sortingType: payload.sortingType,
    };
    const orderDTOs = await this.ordersRepository.findAllOrder();
    let orderDTOsPagination =
      await this.ordersRepository.findAllOrderPagination(query);
    orderDTOsPagination = await Promise.all(
      orderDTOsPagination.map(async (orderDTO) => {
        orderDTO.carts = await this.cartsService.readAllCart({
          orderId: orderDTO.id,
        });
        return orderDTO;
      }),
    );
    return {
      findAll: orderDTOs,
      findAllPagination: orderDTOsPagination,
    };
  }

  async readAllOrderByCustomer(
    payload: ReadAllOrderByCustomerDTO,
  ): Promise<IReadAllServiceMethodResponse<OrderDTO[]>> {
    const orderDTO = plainToClass(OrderDTO, {
      userId: payload.userId,
    });
    const query: IQuery = {
      limit: payload.limit,
      page: payload.page,
      sortingBy: payload.sortingBy,
      sortingType: payload.sortingType,
    };
    const orderDTOs = await this.ordersRepository.findAllOrderWithUserId(
      orderDTO,
    );
    let orderDTOsPagination =
      await this.ordersRepository.findAllOrderPaginationWithUserId(
        query,
        orderDTO,
      );
    orderDTOsPagination = await Promise.all(
      orderDTOsPagination.map(async (orderDTOSingle) => {
        orderDTOSingle.carts = await this.cartsService.readAllCart({
          orderId: orderDTOSingle.id,
        });
        return orderDTOSingle;
      }),
    );
    return {
      findAll: orderDTOs,
      findAllPagination: orderDTOsPagination,
    };
  }

  async submitOrder(payload: SubmitOrderDTO) {
    const orderDTO = plainToClass(OrderDTO, {
      id: payload.id,
      userId: payload.userId,
    });
    const foundOrderDTO = await this.ordersRepository.findOrderWithUserId(
      orderDTO,
    );
    foundOrderDTO.carts = await this.cartsService.readAllCart({
      orderId: foundOrderDTO.id,
    });
    foundOrderDTO.carts.forEach((cart) => {
      cart.validateForSubmit();
    });
    foundOrderDTO.carts.forEach(async (cart) => {
      await this.productsService.updateProduct({
        id: cart.product.id,
        stock: cart.product.stock - cart.quantity,
      });
    });
    foundOrderDTO.changeOrderStatus(OrderStatus.Submitted);
    await this.ordersRepository.updateOrder({
      ...foundOrderDTO,
      userId: orderDTO.userId,
    });
  }
}
