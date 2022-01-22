import { ProductDTO } from '@app/products/dto/product.dto';
import { BadRequestException } from '@nestjs/common';

export class CartDTO {
  id?: string;
  quantity?: number;
  amount?: number;
  product?: ProductDTO;
  orderId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  calculateAmount() {
    this.amount = this.quantity * this.product.price;
  }

  validateForSubmit() {
    if (this.quantity > this.product.stock) {
      throw new BadRequestException(
        `Cart with id: ${this.id} can't be processable because the quantity exceeds product's stock`,
      );
    }
  }
}
