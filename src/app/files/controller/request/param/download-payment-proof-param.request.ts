import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { randomUUID } from 'crypto';

export class DownloadPaymentProofParamRequest {
  @ApiProperty({ example: randomUUID() })
  @IsNotEmpty()
  @IsUUID()
  readonly id: string;
}
