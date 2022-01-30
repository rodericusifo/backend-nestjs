import { OrdersSortingBy } from '@shared/enums/sorting/orders-sorting-by.enum';
import { SortingType } from '@shared/enums/sorting/sorting-type.enum';

export class ReadAllOrderByAdminDTO {
  readonly page?: number;
  readonly limit?: number;
  readonly sortingBy?: OrdersSortingBy;
  readonly sortingType?: SortingType;
}
