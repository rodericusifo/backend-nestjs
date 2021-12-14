import { Role } from '@shared/enum/role.enum';
import { IsArray, IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

export class ReadFilePaymentProofDTO {
  @IsNotEmpty()
  @IsUUID()
  readonly id: string;

  @IsNotEmpty()
  @IsUUID()
  readonly userId: string;

  @IsNotEmpty()
  @IsArray()
  @IsEnum(Role, { each: true })
  readonly userRoles: Role[];
}
