import { IErrors } from 'src/message/message.interface';

export interface IResponse {
  readonly message: string;
  readonly errors?: IErrors[];
  readonly data?: Record<string, any> | Record<string, any>[];
}

export interface IResponsePaging extends Omit<IResponse, 'errors' | 'data'> {
  readonly total_data: number;
  readonly total_page: number;
  readonly current_page: number;
  readonly per_page: number;
  readonly data: Record<string, any> | Record<string, any>[];
}
