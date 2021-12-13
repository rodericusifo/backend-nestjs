import { ProductDTO } from '@app/products/dto/product.dto';
import { BadRequestException } from '@nestjs/common';
import {
  IsDateString,
  IsInstance,
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
} from 'class-validator';

export class CartDTO {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  quantity?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  amount?: number;

  @IsOptional()
  @IsInstance(ProductDTO)
  product?: ProductDTO;

  @IsOptional()
  @IsUUID()
  orderId?: string;

  @IsOptional()
  @IsDateString()
  createdAt?: Date;

  @IsOptional()
  @IsDateString()
  updatedAt?: Date;

  @IsOptional()
  @IsDateString()
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
