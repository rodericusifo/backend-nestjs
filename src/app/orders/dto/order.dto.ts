import { CartDTO } from '@app/carts/dto/cart.dto';
import { BadGatewayException } from '@nestjs/common';
import { OrderStatus } from '@shared/enum/order-status.enum';

export class OrderDTO {
  id?: string;
  title?: string;
  status?: OrderStatus;
  paymentProofLink?: string;
  name?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  carts?: CartDTO[];
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  changeOrderStatus(status: OrderStatus) {
    this.status = status;
  }

  setPaymentProofLink(link: string) {
    this.paymentProofLink = link;
  }

  checkStatusEqualWith(status: OrderStatus) {
    if (this.status !== status) {
      throw new BadGatewayException(
        'You Need Submit This Order First before upload payment proof',
      );
    }
  }
}
