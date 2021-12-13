import { OrderDTO } from '@app/orders/dto/order.dto';

export interface IOrdersRepository {
  saveOrder(orderDTO: Partial<OrderDTO>);
  findOrder(orderDTO: Partial<OrderDTO>): Promise<OrderDTO>;
}
