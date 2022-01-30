import { ProductsSortingBy } from '@shared/enums/sorting/products-sorting-by.enum';
import { SortingType } from '@shared/enums/sorting/sorting-type.enum';

export class ReadAllProductDTO {
  readonly page?: number;
  readonly limit?: number;
  readonly sortingBy?: ProductsSortingBy;
  readonly sortingType?: SortingType;
}
