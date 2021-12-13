import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterBodyRequest {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'john@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '12345' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
