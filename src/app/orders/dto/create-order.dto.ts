import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsMobilePhone()
  readonly phoneNumber: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsUUID()
  readonly userId: string;
}
