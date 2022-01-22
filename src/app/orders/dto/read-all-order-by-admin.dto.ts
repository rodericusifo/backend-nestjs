import { OrdersSortingBy } from '@shared/enum/sorting/orders-sorting-by.enum';
import { SortingType } from '@shared/enum/sorting/sorting-type.enum';

export class ReadAllOrderByAdminDTO {
  readonly page?: number;
  readonly limit?: number;
  readonly sortingBy?: OrdersSortingBy;
  readonly sortingType?: SortingType;
}
