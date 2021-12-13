import { AddProductToOrderDTO } from '@app/orders/dto/add-product-to-order.dto';
import { CreateOrderDTO } from '@app/orders/dto/create-order.dto';
import { OrderDTO } from '@app/orders/dto/order.dto';
import { ReadOrderByAdminDTO } from '@app/orders/dto/read-order-by-admin.dto';
import { ReadOrderByCustomerDTO } from '@app/orders/dto/read-order-by-customer.dto';

export interface IOrdersService {
  createOrder(payload: CreateOrderDTO);
  readOrderByAdmin(payload: ReadOrderByAdminDTO): Promise<OrderDTO>;
  readOrderByCustomer(payload: ReadOrderByCustomerDTO): Promise<OrderDTO>;
  addProductToOrder(payload: AddProductToOrderDTO);
}
