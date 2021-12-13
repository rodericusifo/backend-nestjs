import { IsNotEmpty, IsUUID } from 'class-validator';

export class ReadAllCartDTO {
  @IsNotEmpty()
  @IsUUID()
  readonly orderId: string;
}
