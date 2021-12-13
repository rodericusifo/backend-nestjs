import { LoginAuthDTO } from '@app/auth/dto/login-auth.dto';
import { RegisterAuthDTO } from '@app/auth/dto/register-auth.dto';
import { AuthService } from '@app/auth/service/auth.service';
import { UserDTO } from '@app/users/dto/user.dto';
import { IUsersService } from '@app/users/service/interface/users-service.interface';
import { UsersService } from '@app/users/service/users.service';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { ILoginAuthServiceMethodResponse } from '@shared/interface/other/service-method-response/login-auth-service-method-response.interface';
import { plainToClass } from 'class-transformer';
import { randomUUID } from 'crypto';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            createUserAsAdmin: jest.fn(),
            createUserAsCustomer: jest.fn(),
            deleteAllAdminUser: jest.fn(),
            readUserForLogin: jest.fn(),
          } as IUsersService,
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
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
          plainToClass(UserDTO, {
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
