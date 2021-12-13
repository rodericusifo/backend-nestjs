import { LoginAuthDTO } from '@app/auth/dto/login-auth.dto';
import { RegisterAuthDTO } from '@app/auth/dto/register-auth.dto';
import { ILoginAuthServiceMethodResponse } from '@shared/interface/other/service-method-response/login-auth-service-method-response.interface';

export interface IAuthService {
  registerAuth(payload: RegisterAuthDTO);
  loginAuth(payload: LoginAuthDTO): Promise<ILoginAuthServiceMethodResponse>;
}
