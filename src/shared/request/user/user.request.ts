import { Role } from '@shared/enums/role.enum';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class UserRequest {
  @IsNotEmpty()
  @IsUUID()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsArray()
  @IsEnum(Role, { each: true })
  readonly roles: Role[];
}
