import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginBodyRequest {
  @ApiProperty({ example: 'john@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '12345' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
