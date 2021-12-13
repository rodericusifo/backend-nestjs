import { ApiProperty } from '@nestjs/swagger';
import { ProductsSortingBy } from '@shared/enum/sorting/products-sorting-by.enum';
import { SortingType } from '@shared/enum/sorting/sorting-type.enum';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';

export class ListProductQueryRequest {
  @ApiProperty({ required: false, minimum: 1, example: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  readonly page?: number;

  @ApiProperty({
    required: false,
    minimum: 1,
    example: 5,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  readonly limit?: number;

  @ApiProperty({
    required: false,
    enum: ProductsSortingBy,
    example: ProductsSortingBy.Name,
  })
  @IsOptional()
  @IsEnum(ProductsSortingBy)
  readonly sortingBy?: ProductsSortingBy;

  @ApiProperty({
    required: false,
    enum: SortingType,
    example: SortingType.Ascending,
  })
  @IsOptional()
  @IsEnum(SortingType)
  readonly sortingType?: SortingType;
}
