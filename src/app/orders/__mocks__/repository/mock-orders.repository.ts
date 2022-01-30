/* eslint-disable @typescript-eslint/no-unused-vars */
import { OrderDTO } from '@app/orders/dto/order.dto';
import { IOrdersRepository } from '@app/orders/database/repositories/interfaces/orders-repository.interface';
import { IQuery } from '@shared/interfaces/other/query.interface';

export class MockedOrdersRepository implements IOrdersRepository {
  saveOrder(_orderDTO: OrderDTO) {
    throw new Error('Method not implemented.');
  }
  updateOrder(_orderDTO: OrderDTO) {
    throw new Error('Method not implemented.');
  }
  findOrder(_orderDTO: OrderDTO): Promise<OrderDTO> {
    throw new Error('Method not implemented.');
  }
  findOrderWithUserId(_orderDTO: OrderDTO): Promise<OrderDTO> {
    throw new Error('Method not implemented.');
  }
  findAllOrder(): Promise<OrderDTO[]> {
    throw new Error('Method not implemented.');
  }
  findAllOrderWithUserId(_orderDTO: OrderDTO): Promise<OrderDTO[]> {
    throw new Error('Method not implemented.');
  }
  findAllOrderPagination(_query: IQuery): Promise<OrderDTO[]> {
    throw new Error('Method not implemented.');
  }
  findAllOrderPaginationWithUserId(
    _query: IQuery,
    _orderDTO: OrderDTO,
  ): Promise<OrderDTO[]> {
    throw new Error('Method not implemented.');
  }
}
