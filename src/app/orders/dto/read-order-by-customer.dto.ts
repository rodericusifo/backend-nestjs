import { IsNotEmpty, IsUUID } from 'class-validator';

export class ReadOrderByCustomerDTO {
  @IsNotEmpty()
  @IsUUID()
  readonly id: string;

  @IsNotEmpty()
  @IsUUID()
  readonly userId: string;
}
