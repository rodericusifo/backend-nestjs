import { OrderDTO } from '@app/orders/dto/order.dto';
import { IQuery } from '@shared/interface/other/query.interface';

export interface IOrdersRepository {
  saveOrder(orderDTO: OrderDTO);
  updateOrder(orderDTO: OrderDTO);
  findOrder(orderDTO: OrderDTO): Promise<OrderDTO>;
  findOrderWithUserId(orderDTO: OrderDTO): Promise<OrderDTO>;
  findAllOrder(): Promise<OrderDTO[]>;
  findAllOrderWithUserId(orderDTO: OrderDTO): Promise<OrderDTO[]>;
  findAllOrderPagination(query: IQuery): Promise<OrderDTO[]>;
  findAllOrderPaginationWithUserId(
    query: IQuery,
    orderDTO: OrderDTO,
  ): Promise<OrderDTO[]>;
}
