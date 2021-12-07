import {
  applyDecorators,
  Inject,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ResponseFilter } from './response.filter';
import { ResponseInterceptor } from './response.interceptor';
import { ResponseService } from './response.service';

export function Response(): (
  target: Record<string, any>,
  key: string | symbol,
  index?: number,
) => void {
  return Inject(ResponseService);
}

export function ResponseStatusCode() {
  return applyDecorators(
    UseInterceptors(ResponseInterceptor),
    UseFilters(ResponseFilter),
  );
}
