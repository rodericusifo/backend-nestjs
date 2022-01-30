import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerOrderBodyRequest {
  @ApiProperty({ example: 'Order 1' })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: '087678900123' })
  @IsNotEmpty()
  @IsMobilePhone()
  readonly phoneNumber: string;

  @ApiProperty({ example: 'john@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'John Street' })
  @IsNotEmpty()
  @IsString()
  readonly address: string;
}
