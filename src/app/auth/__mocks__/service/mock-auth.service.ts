/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoginAuthDTO } from '@app/auth/dto/login-auth.dto';
import { RegisterAuthDTO } from '@app/auth/dto/register-auth.dto';
import { IAuthService } from '@app/auth/service/interface/auth-service.interface';
import { ILoginAuthServiceMethodResponse } from '@shared/interface/other/service-method-response/login-auth-service-method-response.interface';

export class MockedAuthService implements IAuthService {
  registerAuth(_payload: RegisterAuthDTO) {
    throw new Error('Method not implemented.');
  }
  loginAuth(_payload: LoginAuthDTO): Promise<ILoginAuthServiceMethodResponse> {
    throw new Error('Method not implemented.');
  }
}
