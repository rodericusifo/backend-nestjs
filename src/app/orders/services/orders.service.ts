import { CartsService } from '@app/carts/services/carts.service';
import { FilesService } from '@app/files/services/files.service';
import { OrdersRepository } from '@app/orders/database/repositories/orders.repository';
import { AddProductToOrderDTO } from '@app/orders/dto/add-product-to-order.dto';
import { CreateOrderDTO } from '@app/orders/dto/create-order.dto';
import { OrderDTO } from '@app/orders/dto/order.dto';
import { ReadAllOrderByAdminDTO } from '@app/orders/dto/read-all-order-by-admin.dto';
import { ReadAllOrderByCustomerDTO } from '@app/orders/dto/read-all-order-by-customer.dto';
import { ReadOrderByAdminDTO } from '@app/orders/dto/read-order-by-admin.dto';
import { ReadOrderByCustomerDTO } from '@app/orders/dto/read-order-by-customer.dto';
import { SubmitOrderPaymentProofDTO } from '@app/orders/dto/submit-order-payment-proof.dto';
import { SubmitOrderDTO } from '@app/orders/dto/submit-order.dto';
import { IOrdersService } from '@app/orders/services/interfaces/orders-service.interface';
import { ProductsService } from '@app/products/services/products.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatus } from '@shared/enums/order-status.enum';
import { IQuery } from '@shared/interfaces/other/query.interface';
import { IReadAllServiceMethodResponse } from '@shared/interfaces/other/service-method-response/read-all-service-method-response.interface';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class OrdersService implements IOrdersService {
  constructor(
    @InjectRepository(OrdersRepository)
    private readonly ordersRepository: OrdersRepository,
    private readonly cartsService: CartsService,
    private readonly productsService: ProductsService,
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  async createOrder(payload: CreateOrderDTO) {
    const orderDTO = plainToInstance(OrderDTO, payload);
    await this.ordersRepository.saveOrder(orderDTO);
  }

  async addProductToOrder(payload: AddProductToOrderDTO) {
    const orderDTO = plainToInstance(OrderDTO, {
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
    const orderDTO = plainToInstance(OrderDTO, {
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
    const orderDTO = plainToInstance(OrderDTO, {
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
    const orderDTO = plainToInstance(OrderDTO, {
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
    const orderDTO = plainToInstance(OrderDTO, {
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

  async submitOrderPaymentProof(payload: SubmitOrderPaymentProofDTO) {
    const orderDTO = plainToInstance(OrderDTO, {
      id: payload.id,
      userId: payload.userId,
    });
    const foundOrderDTO = await this.ordersRepository.findOrderWithUserId(
      orderDTO,
    );
    foundOrderDTO.checkStatusEqualWith(OrderStatus.Submitted);
    const savedPaymentProofDTO = await this.filesService.createFile({
      mimeType: payload.mimeType,
      originalName: payload.originalName,
      path: payload.path,
      userId: payload.userId,
    });
    foundOrderDTO.setPaymentProofLink(
      `${payload.urlOrigin}${this.configService.get(
        'app.prefix',
      )}/files/payment-proof/${savedPaymentProofDTO.id}/download`,
    );
    await this.ordersRepository.updateOrder({
      ...foundOrderDTO,
      userId: orderDTO.userId,
    });
  }
}
