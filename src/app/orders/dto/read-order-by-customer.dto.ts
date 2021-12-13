import { IsNotEmpty, IsUUID } from 'class-validator';

export class ReadOrderByCustomerDTO {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
