import { ProductsSortingBy } from '@shared/enum/sorting/products-sorting-by.enum';
import { SortingType } from '@shared/enum/sorting/sorting-type.enum';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';

export class ReadAllProductDTO {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  readonly page?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  readonly limit?: number;

  @IsOptional()
  @IsEnum(ProductsSortingBy)
  readonly sortingBy?: ProductsSortingBy;

  @IsOptional()
  @IsEnum(SortingType)
  readonly sortingType?: SortingType;
}
