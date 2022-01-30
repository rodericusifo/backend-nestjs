import { LoginBodyRequest } from '@app/auth/controllers/request/body/login-body.request';
import { RegisterBodyRequest } from '@app/auth/controllers/request/body/register-body.request';
import { AuthService } from '@app/auth/services/auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response, ResponseStatusCode } from '@response/response.decorator';
import { IResponse } from '@response/response.interface';
import { ResponseService } from '@response/response.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Response() private readonly responseService: ResponseService,
    private readonly authService: AuthService,
  ) {}

  @ResponseStatusCode()
  @Post('/register')
  async register(@Body() body: RegisterBodyRequest): Promise<IResponse> {
    await this.authService.registerAuth({ ...body });
    return this.responseService.success('Successfully Register');
  }

  @ResponseStatusCode()
  @Post('/login')
  async login(@Body() body: LoginBodyRequest): Promise<IResponse> {
    const result = await this.authService.loginAuth({ ...body });
    return this.responseService.success('Successfully Login', result);
  }
}
