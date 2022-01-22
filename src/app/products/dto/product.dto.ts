import { BadRequestException } from '@nestjs/common';

export class ProductDTO {
  id?: string;
  name?: string;
  price?: number;
  stock?: number;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  checkAvailability() {
    if (this.stock <= 0) {
      throw new BadRequestException(
        `Product with id: ${this.id} is not available (Out of Stock) `,
      );
    }
  }
}
