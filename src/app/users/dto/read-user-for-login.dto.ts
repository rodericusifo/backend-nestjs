import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ReadUserForLoginDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
