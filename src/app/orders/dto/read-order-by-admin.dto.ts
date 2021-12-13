import { IsNotEmpty, IsUUID } from 'class-validator';

export class ReadOrderByAdminDTO {
  @IsNotEmpty()
  @IsUUID()
  readonly id: string;
}
