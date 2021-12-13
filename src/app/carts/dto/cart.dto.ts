import { ProductDTO } from '@app/products/dto/product.dto';
import { Exclude } from 'class-transformer';
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
  @Exclude()
  deletedAt?: Date;

  calculateAmount() {
    this.amount = this.quantity * this.product.price;
  }
}
