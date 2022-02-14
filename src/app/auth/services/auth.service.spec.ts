import { LoginAuthDTO } from '@app/auth/dto/login-auth.dto';
import { RegisterAuthDTO } from '@app/auth/dto/register-auth.dto';
import { AuthService } from '@app/auth/services/auth.service';
import { UserDTO } from '@app/users/dto/user.dto';
import { UsersService } from '@app/users/services/users.service';
import { MockedUsersService } from '@app/users/__mocks__/service/mock-users.service';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { ILoginAuthServiceMethodResponse } from '@shared/interfaces/other/service-method-response/login-auth-service-method-response.interface';
import { MockedJwtService } from '@shared/__mocks__/service/mock-jwt.service';
import { plainToInstance } from 'class-transformer';
import { randomUUID } from 'crypto';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: MockedUsersService;
  let jwtService: MockedJwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useClass: MockedUsersService,
        },
        {
          provide: JwtService,
          useClass: MockedJwtService,
        },
      ],
    }).compile();

    authService = module.get(AuthService);
    usersService = module.get(UsersService);
    jwtService = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(usersService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('registerAuth()', () => {
    it('should successfully register', async () => {
      const argument: RegisterAuthDTO = {
        name: 'Rodericus Ifo Krista',
        email: 'ifo@gmail.com',
        password: '12345',
      };
      const expectedResult = undefined;
      const expectedError = undefined;
      jest
        .spyOn(usersService, 'createUserAsCustomer')
        .mockImplementation(() => Promise.resolve(null));
      try {
        const data = await authService.registerAuth(argument);
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
    it('should failed create a product', async () => {
      const argument: RegisterAuthDTO = {
        name: 'Rodericus Ifo Krista',
        email: 'ifo@gmail.com',
        password: '12345',
      };
      const expectedResult = undefined;
      const expectedError = 'Failed Register';
      jest
        .spyOn(usersService, 'createUserAsCustomer')
        .mockImplementation(() => Promise.reject('Failed Register'));
      try {
        const data = await authService.registerAuth(argument);
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
  });

  describe('loginAuth()', () => {
    it('should successfully login', async () => {
      const argument: LoginAuthDTO = {
        email: 'ifo@gmail.com',
        password: '12345',
      };
      const expectedResult: ILoginAuthServiceMethodResponse = {
        accessToken: 'ABCDEFGH',
      };
      const expectedError = undefined;
      jest.spyOn(usersService, 'readUserForLogin').mockImplementation(() =>
        Promise.resolve(
          plainToInstance(UserDTO, {
            id: randomUUID(),
            email: 'ifo@gmail.com',
            password: '12345',
          } as Partial<UserDTO>),
        ),
      );
      jest.spyOn(jwtService, 'sign').mockImplementation(() => 'ABCDEFGH');
      try {
        const data = await authService.loginAuth(argument);
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
    it('should failed create a product', async () => {
      const argument: LoginAuthDTO = {
        email: 'ifo@gmail.com',
        password: '12345',
      };
      const expectedResult = undefined;
      const expectedError = 'Failed Login';
      jest
        .spyOn(usersService, 'readUserForLogin')
        .mockImplementation(() => Promise.reject('Failed Login'));
      try {
        const data = await authService.loginAuth(argument);
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
  });
});
