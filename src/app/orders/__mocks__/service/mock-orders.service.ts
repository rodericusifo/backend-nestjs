/* eslint-disable @typescript-eslint/no-unused-vars */

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
import { IReadAllServiceMethodResponse } from '@shared/interfaces/other/service-method-response/read-all-service-method-response.interface';

export class MockedOrdersService implements IOrdersService {
  createOrder(_payload: CreateOrderDTO) {
    throw new Error('Method not implemented.');
  }
  readAllOrderByAdmin(
    _payload: ReadAllOrderByAdminDTO,
  ): Promise<IReadAllServiceMethodResponse<OrderDTO[]>> {
    throw new Error('Method not implemented.');
  }
  readAllOrderByCustomer(
    _payload: ReadAllOrderByCustomerDTO,
  ): Promise<IReadAllServiceMethodResponse<OrderDTO[]>> {
    throw new Error('Method not implemented.');
  }
  readOrderByAdmin(_payload: ReadOrderByAdminDTO): Promise<OrderDTO> {
    throw new Error('Method not implemented.');
  }
  readOrderByCustomer(_payload: ReadOrderByCustomerDTO): Promise<OrderDTO> {
    throw new Error('Method not implemented.');
  }
  submitOrder(_payload: SubmitOrderDTO) {
    throw new Error('Method not implemented.');
  }
  submitOrderPaymentProof(_payload: SubmitOrderPaymentProofDTO) {
    throw new Error('Method not implemented.');
  }
  addProductToOrder(_payload: AddProductToOrderDTO) {
    throw new Error('Method not implemented.');
  }
}
