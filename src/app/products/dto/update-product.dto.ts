import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class UpdateProductDTO {
  @IsNotEmpty()
  @IsUUID()
  readonly id: string;

  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly price?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly stock?: number;

  @IsOptional()
  @IsString()
  readonly description?: string;
}
