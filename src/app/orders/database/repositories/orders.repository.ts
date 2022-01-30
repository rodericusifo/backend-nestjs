import { OrderDTO } from '@app/orders/dto/order.dto';
import { Order } from '@app/orders/database/entities/order.entity';
import { OrdersMapper } from '@app/orders/database/mappers/orders.mapper';
import { IOrdersRepository } from '@app/orders/database/repositories/interfaces/orders-repository.interface';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { OrdersSortingBy } from '@shared/enums/sorting/orders-sorting-by.enum';
import { SortingType } from '@shared/enums/sorting/sorting-type.enum';
import { IQuery } from '@shared/interfaces/other/query.interface';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Order)
export class OrdersRepository
  extends Repository<Order>
  implements IOrdersRepository
{
  async saveOrder(orderDTO: Partial<OrderDTO>) {
    const order = OrdersMapper.DTOToEntity(orderDTO);
    const foundOrder = await this.findOne({
      title: order.title,
      userId: order.userId,
    });
    if (foundOrder) {
      throw new BadRequestException(
        `Order with title: '${order.title}' already exist`,
      );
    }
    await this.save(order);
  }

  async findOrder(orderDTO: Partial<OrderDTO>): Promise<OrderDTO> {
    const order = OrdersMapper.DTOToEntity(orderDTO);
    const foundOrder = await this.findOne({ id: order.id });
    if (!foundOrder) {
      throw new NotFoundException(`Order with ID: ${order.id} was not found`);
    }
    return OrdersMapper.EntityToDTO(foundOrder);
  }

  async findOrderWithUserId(orderDTO: Partial<OrderDTO>): Promise<OrderDTO> {
    const order = OrdersMapper.DTOToEntity(orderDTO);
    const foundOrder = await this.findOne({
      id: order.id,
      userId: order.userId,
    });
    if (!foundOrder) {
      throw new NotFoundException(`Order with ID: ${order.id} was not found`);
    }
    return OrdersMapper.EntityToDTO(foundOrder);
  }

  async findAllOrder(): Promise<OrderDTO[]> {
    const foundOrders = await this.find();
    return foundOrders.map(OrdersMapper.EntityToDTO);
  }

  async findAllOrderWithUserId(
    orderDTO: Partial<OrderDTO>,
  ): Promise<OrderDTO[]> {
    const order = OrdersMapper.DTOToEntity(orderDTO);
    const foundOrders = await this.find({ userId: order.userId });
    return foundOrders.map(OrdersMapper.EntityToDTO);
  }

  async findAllOrderPagination(query: IQuery): Promise<OrderDTO[]> {
    const foundOrders = await this.find({
      skip: (query.page - 1) * query.limit || 0,
      take: query.limit || 10,
      order: {
        title:
          query.sortingBy === OrdersSortingBy.Title &&
          query.sortingType === SortingType.Descending
            ? 'DESC'
            : 'ASC',
      },
    });
    if (foundOrders.length === 0) {
      throw new NotFoundException(`All Orders was Not Found`);
    }
    return foundOrders.map(OrdersMapper.EntityToDTO);
  }
  async findAllOrderPaginationWithUserId(
    query: IQuery,
    orderDTO: Partial<OrderDTO>,
  ): Promise<OrderDTO[]> {
    const order = OrdersMapper.DTOToEntity(orderDTO);
    const foundOrders = await this.find({
      where: {
        userId: order.userId,
      },
      skip: (query.page - 1) * query.limit || 0,
      take: query.limit || 10,
      order: {
        title:
          query.sortingBy === OrdersSortingBy.Title &&
          query.sortingType === SortingType.Descending
            ? 'DESC'
            : 'ASC',
      },
    });
    if (foundOrders.length === 0) {
      throw new NotFoundException(`All Orders was Not Found`);
    }
    return foundOrders.map(OrdersMapper.EntityToDTO);
  }

  async updateOrder(orderDTO: Partial<OrderDTO>) {
    const order = OrdersMapper.DTOToEntity(orderDTO);
    const updatedOrder = await this.update(
      { id: order.id, userId: order.userId },
      { status: order.status, paymentProofLink: order.paymentProofLink },
    );
    if (!updatedOrder.affected) {
      throw new NotFoundException(`Order with ID: ${order.id} was not found`);
    }
  }
}
