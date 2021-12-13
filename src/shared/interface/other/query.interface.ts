import { SortingType } from '@shared/enum/sorting/sorting-type.enum';

export interface IQuery {
  readonly page?: number;
  readonly limit?: number;
  readonly sortingBy?: string;
  readonly sortingType?: SortingType;
}
