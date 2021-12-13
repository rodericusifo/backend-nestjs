import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class CreateCartDTO {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  readonly quantity: number;

  @IsNotEmpty()
  @IsUUID()
  readonly productId: string;

  @IsNotEmpty()
  @IsUUID()
  readonly orderId: string;
}
