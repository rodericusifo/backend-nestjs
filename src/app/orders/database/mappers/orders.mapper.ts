import { OrderDTO } from '@app/orders/dto/order.dto';
import { Order } from '@app/orders/database/entities/order.entity';
import { plainToClass } from 'class-transformer';

export class OrdersMapper {
  static DTOToEntity(orderDTO: Partial<OrderDTO>): Order {
    return plainToClass(Order, orderDTO);
  }

  static EntityToDTO(order: Partial<Order>): OrderDTO {
    return plainToClass(OrderDTO, order);
  }
}
