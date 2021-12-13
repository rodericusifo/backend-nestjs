/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoginAuthDTO } from '@app/auth/dto/login-auth.dto';
import { RegisterAuthDTO } from '@app/auth/dto/register-auth.dto';
import { IAuthService } from '@app/auth/service/interface/auth-service.interface';
import { UsersService } from '@app/users/service/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ILoginAuthServiceMethodResponse } from '@shared/interface/other/service-method-response/login-auth-service-method-response.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async registerAuth(payload: RegisterAuthDTO) {
    await this.usersService.createUserAsCustomer(payload);
  }

  async loginAuth(
    payload: LoginAuthDTO,
  ): Promise<ILoginAuthServiceMethodResponse> {
    const user = await this.usersService.readUserForLogin(payload);
    const { password, createdAt, updatedAt, deletedAt, ...result } = user;
    return { accessToken: this.jwtService.sign(result) };
  }
}
