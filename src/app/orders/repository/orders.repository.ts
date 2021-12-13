import { OrderDTO } from '@app/orders/dto/order.dto';
import { Order } from '@app/orders/entity/order.entity';
import { OrdersMapper } from '@app/orders/mapper/orders.mapper';
import { IOrdersRepository } from '@app/orders/repository/interface/orders-repository.interface';
import { BadRequestException, NotFoundException } from '@nestjs/common';
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
}
