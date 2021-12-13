import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';
import { randomUUID } from 'crypto';

export class AddProductCustomerOrderBodyRequest {
  @ApiProperty({ example: 1, minimum: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  readonly quantity: number;

  @ApiProperty({ example: randomUUID() })
  @IsNotEmpty()
  @IsUUID()
  readonly productId: string;
}
