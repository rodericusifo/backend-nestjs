import { SortingType } from '@shared/enums/sorting/sorting-type.enum';

export interface IQuery {
  readonly page?: number;
  readonly limit?: number;
  readonly sortingBy?: string;
  readonly sortingType?: SortingType;
}
