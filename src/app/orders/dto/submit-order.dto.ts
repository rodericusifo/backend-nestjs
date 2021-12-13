import { IsNotEmpty, IsUUID } from 'class-validator';

export class SubmitOrderDTO {
  @IsNotEmpty()
  @IsUUID()
  readonly id: string;

  @IsNotEmpty()
  @IsUUID()
  readonly userId: string;
}
