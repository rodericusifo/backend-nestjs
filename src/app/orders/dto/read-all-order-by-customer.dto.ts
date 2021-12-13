import { OrdersSortingBy } from '@shared/enum/sorting/orders-sorting-by.enum';
import { SortingType } from '@shared/enum/sorting/sorting-type.enum';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
} from 'class-validator';

export class ReadAllOrderByCustomerDTO {
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
  @IsEnum(OrdersSortingBy)
  readonly sortingBy?: OrdersSortingBy;

  @IsOptional()
  @IsEnum(SortingType)
  readonly sortingType?: SortingType;

  @IsNotEmpty()
  @IsUUID()
  readonly userId: string;
}
