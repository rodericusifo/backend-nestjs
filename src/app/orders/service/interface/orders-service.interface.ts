import { AddProductToOrderDTO } from '@app/orders/dto/add-product-to-order.dto';
import { CreateOrderDTO } from '@app/orders/dto/create-order.dto';

export interface IOrdersService {
  createOrder(payload: CreateOrderDTO);
  addProductToOrder(payload: AddProductToOrderDTO);
}
