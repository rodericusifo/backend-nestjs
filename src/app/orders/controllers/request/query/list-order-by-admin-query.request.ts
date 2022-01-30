import { ApiProperty } from '@nestjs/swagger';
import { OrdersSortingBy } from '@shared/enums/sorting/orders-sorting-by.enum';
import { SortingType } from '@shared/enums/sorting/sorting-type.enum';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';

export class ListOrderByAdminQueryRequest {
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
    enum: OrdersSortingBy,
    example: OrdersSortingBy.Title,
  })
  @IsOptional()
  @IsEnum(OrdersSortingBy)
  readonly sortingBy?: OrdersSortingBy;

  @ApiProperty({
    required: false,
    enum: SortingType,
    example: SortingType.Ascending,
  })
  @IsOptional()
  @IsEnum(SortingType)
  readonly sortingType?: SortingType;
}
