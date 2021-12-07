import { Controller, Get } from '@nestjs/common';
import { AppService } from '../app/app.service';
import { ResponseService } from '../response/response.service';
import { Response, ResponseStatusCode } from '../response/response.decorator';
import { IResponse } from '../response/response.interface';
@Controller('/')
export class AppController {
  constructor(
    @Response() private readonly responseService: ResponseService,
    private readonly appService: AppService,
  ) {}

  @ResponseStatusCode()
  @Get('/hello')
  async getHello(): Promise<IResponse> {
    const message: string = await this.appService.getHello();
    return this.responseService.success(message);
  }
}
