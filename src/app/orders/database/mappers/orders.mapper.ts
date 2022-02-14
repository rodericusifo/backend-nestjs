import { Order } from '@app/orders/database/entities/order.entity';
import { OrderDTO } from '@app/orders/dto/order.dto';
import { plainToInstance } from 'class-transformer';

export class OrdersMapper {
  static DTOToEntity(orderDTO: Partial<OrderDTO>): Order {
    return plainToInstance(Order, orderDTO);
  }

  static EntityToDTO(order: Partial<Order>): OrderDTO {
    return plainToInstance(OrderDTO, order);
  }
}
