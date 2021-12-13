import { OrderDTO } from '@app/orders/dto/order.dto';
import { IQuery } from '@shared/interface/other/query.interface';

export interface IOrdersRepository {
  saveOrder(orderDTO: Partial<OrderDTO>);
  updateOrder(orderDTO: Partial<OrderDTO>);
  findOrder(orderDTO: Partial<OrderDTO>): Promise<OrderDTO>;
  findOrderWithUserId(orderDTO: Partial<OrderDTO>): Promise<OrderDTO>;
  findAllOrder(): Promise<OrderDTO[]>;
  findAllOrderWithUserId(orderDTO: Partial<OrderDTO>): Promise<OrderDTO[]>;
  findAllOrderPagination(query: IQuery): Promise<OrderDTO[]>;
  findAllOrderPaginationWithUserId(
    query: IQuery,
    orderDTO: Partial<OrderDTO>,
  ): Promise<OrderDTO[]>;
}
