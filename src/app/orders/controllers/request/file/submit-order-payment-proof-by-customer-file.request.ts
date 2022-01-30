import { ApiProperty } from '@nestjs/swagger';

export class SubmitOrderPaymentProofByCustomerFileRequest {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
