import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerOrderBodyRequest {
  @ApiProperty({ example: 'Order 1' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '087678900123' })
  @IsNotEmpty()
  @IsMobilePhone()
  phoneNumber: string;

  @ApiProperty({ example: 'john@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John Street' })
  @IsNotEmpty()
  @IsString()
  address: string;
}
