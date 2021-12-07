import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

@Injectable()
export class ResponseInterceptor
  implements NestInterceptor<Promise<any> | string>
{
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<Promise<any> | string>> {
    const ctx: HttpArgumentsHost = context.switchToHttp();
    const responseExpress: any = ctx.getResponse();

    return next.handle().pipe(
      map(async (response: Promise<Record<string, any> | string>) => {
        const status: number = responseExpress.statusCode;
        const data: Record<string, any> | string = await response;

        if (typeof data !== 'object') {
          throw new InternalServerErrorException('response must be in object');
        }

        const { code, ...others } = data;
        return {
          code: code || status,
          ...others,
        };
      }),
    );
  }
}
