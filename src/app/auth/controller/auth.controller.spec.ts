import { AuthController } from '@app/auth/controller/auth.controller';
import { LoginBodyRequest } from '@app/auth/controller/request/body/login-body.request';
import { RegisterBodyRequest } from '@app/auth/controller/request/body/register-body.request';
import { AuthService } from '@app/auth/service/auth.service';
import { MockedAuthService } from '@app/auth/__mocks__/service/mock-auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { IResponse } from '@response/response.interface';
import { ResponseModule } from '@response/response.module';
import { ResponseService } from '@response/response.service';

describe('AuthController', () => {
  let authController: AuthController;
  let responseService: ResponseService;
  let authService: MockedAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ResponseModule],
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useClass: MockedAuthService,
        },
      ],
    }).compile();

    authController = module.get(AuthController);
    responseService = module.get(ResponseService);
    authService = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
    expect(responseService).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe('register()', () => {
    it('should successfully register', async () => {
      const bodyArgument: RegisterBodyRequest = {
        name: 'Rodericus Ifo Krista',
        email: 'ifo@gmail.com',
        password: '12345',
      };
      const expectedResult: IResponse = { message: 'Successfully Register' };
      const expectedError = undefined;
      jest
        .spyOn(authService, 'registerAuth')
        .mockImplementation(() => Promise.resolve(null));
      jest
        .spyOn(responseService, 'success')
        .mockImplementation(
          () => ({ message: 'Successfully Register' } as IResponse),
        );
      try {
        const data = await authController.register({ ...bodyArgument });
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
    it('should failed register', async () => {
      const bodyArgument: RegisterBodyRequest = {
        name: 'Rodericus Ifo Krista',
        email: 'ifo@gmail.com',
        password: '12345',
      };
      const expectedResult = undefined;
      const expectedError = 'Failed Register';
      jest
        .spyOn(authService, 'registerAuth')
        .mockImplementation(() => Promise.reject('Failed Register'));
      try {
        const data = await authController.register({ ...bodyArgument });
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
  });

  describe('login()', () => {
    it('should successfully login', async () => {
      const bodyArgument: LoginBodyRequest = {
        email: 'ifo@gmail.com',
        password: '12345',
      };
      const expectedResult: IResponse = {
        message: 'Successfully Login',
        data: { accessToken: 'ABCDEFGH' },
      };
      const expectedError = undefined;
      jest
        .spyOn(authService, 'loginAuth')
        .mockImplementation(() => Promise.resolve({ accessToken: 'ABCDEFGH' }));
      jest.spyOn(responseService, 'success').mockImplementation(
        () =>
          ({
            message: 'Successfully Login',
            data: { accessToken: 'ABCDEFGH' },
          } as IResponse),
      );
      try {
        const data = await authController.login({ ...bodyArgument });
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
    it('should failed login', async () => {
      const bodyArgument: LoginBodyRequest = {
        email: 'ifo@gmail.com',
        password: '12345',
      };
      const expectedResult = undefined;
      const expectedError = 'Failed Login';
      jest
        .spyOn(authService, 'loginAuth')
        .mockImplementation(() => Promise.reject('Failed Login'));
      try {
        const data = await authController.login({ ...bodyArgument });
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
  });
});
