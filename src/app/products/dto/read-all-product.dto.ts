import { ProductsSortingBy } from '@shared/enum/sorting/products-sorting-by.enum';
import { SortingType } from '@shared/enum/sorting/sorting-type.enum';

export class ReadAllProductDTO {
  readonly page?: number;
  readonly limit?: number;
  readonly sortingBy?: ProductsSortingBy;
  readonly sortingType?: SortingType;
}
