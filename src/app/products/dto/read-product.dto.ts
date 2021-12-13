import { IsNotEmpty, IsUUID } from 'class-validator';

export class ReadProductDTO {
  @IsNotEmpty()
  @IsUUID()
  readonly id: string;
}
