import { CreateUserDTO } from '@app/users/dto/create-user.dto';
import { ReadUserForLoginDTO } from '@app/users/dto/read-user-for-login.dto';
import { UserDTO } from '@app/users/dto/user.dto';
import { UsersRepository } from '@app/users/repository/users.repository';
import { UsersService } from '@app/users/service/users.service';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UsersRepository),
          useClass: UsersRepository,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersRepository>(
      getRepositoryToken(UsersRepository),
    );
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  describe('createUserAsAdmin()', () => {
    it('should successfully create user as admin', async () => {
      const argument: CreateUserDTO = {
        email: 'rodericus123@gmail.com',
        name: 'Rodericus Ifo',
        password: '12345',
      };
      const expectedResult = undefined;
      const expectedError = undefined;
      jest
        .spyOn(usersRepository, 'saveUser')
        .mockImplementation(() => Promise.resolve(null));
      jest
        .spyOn(bcrypt, 'hash')
        .mockImplementation(() =>
          Promise.resolve('This is encrypted password'),
        );
      try {
        const data = await usersService.createUserAsAdmin(argument);
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
    it('should failed create user as admin', async () => {
      const argument: CreateUserDTO = {
        email: 'rodericus123@gmail.com',
        name: 'Rodericus Ifo',
        password: '12345',
      };
      const expectedResult = undefined;
      const expectedError = 'Failed Create User As Admin';
      jest
        .spyOn(usersRepository, 'saveUser')
        .mockImplementation(() =>
          Promise.reject('Failed Create User As Admin'),
        );
      jest
        .spyOn(bcrypt, 'hash')
        .mockImplementation(() =>
          Promise.resolve('This is encrypted password'),
        );
      try {
        const data = await usersService.createUserAsAdmin(argument);
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
  });

  describe('createUserAsCustomer()', () => {
    it('should successfully create user as customer', async () => {
      const argument: CreateUserDTO = {
        email: 'rodericus123@gmail.com',
        name: 'Rodericus Ifo',
        password: '12345',
      };
      const expectedResult = undefined;
      const expectedError = undefined;
      jest
        .spyOn(usersRepository, 'saveUser')
        .mockImplementation(() => Promise.resolve(null));
      jest
        .spyOn(bcrypt, 'hash')
        .mockImplementation(() =>
          Promise.resolve('This is encrypted password'),
        );
      try {
        const data = await usersService.createUserAsCustomer(argument);
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
    it('should failed create user as customer', async () => {
      const argument: CreateUserDTO = {
        email: 'rodericus123@gmail.com',
        name: 'Rodericus Ifo',
        password: '12345',
      };
      const expectedResult = undefined;
      const expectedError = 'Failed Create User As Customer';
      jest
        .spyOn(usersRepository, 'saveUser')
        .mockImplementation(() =>
          Promise.reject('Failed Create User As Customer'),
        );
      jest
        .spyOn(bcrypt, 'hash')
        .mockImplementation(() =>
          Promise.resolve('This is encrypted password'),
        );
      try {
        const data = await usersService.createUserAsCustomer(argument);
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
  });

  describe('readUserForLogin()', () => {
    it('should successfully read user for login', async () => {
      const argument: ReadUserForLoginDTO = {
        email: 'rodericus123@gmail.com',
        password: '12345',
      };
      const encryptedPassword = await bcrypt.hash(argument.password, 16);
      const expectedResult: UserDTO = plainToClass(UserDTO, {
        id: '1112222',
        name: 'Rodericus Ifo',
        email: 'rodericus123@gmail.com',
        password: encryptedPassword,
        createdAt: null,
        updatedAt: null,
        deletedAt: null,
      });
      const expectedError = undefined;
      jest.spyOn(usersRepository, 'findUserForLogin').mockImplementation(() =>
        Promise.resolve(
          plainToClass(UserDTO, {
            id: '1112222',
            name: 'Rodericus Ifo',
            email: 'rodericus123@gmail.com',
            password: encryptedPassword,
            createdAt: null,
            updatedAt: null,
            deletedAt: null,
          }),
        ),
      );
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(true));
      try {
        const data = await usersService.readUserForLogin(argument);
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
    it('should failed read user for login', async () => {
      const argument: ReadUserForLoginDTO = {
        email: 'rodericus123@gmail.com',
        password: '12345',
      };
      const expectedResult = undefined;
      const expectedError = 'Failed Read User For Login';
      jest
        .spyOn(usersRepository, 'findUserForLogin')
        .mockImplementation(() => Promise.reject('Failed Read User For Login'));
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(true));
      try {
        const data = await usersService.readUserForLogin(argument);
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
  });

  describe('deleteAllUser()', () => {
    it('should successfully clear all user', async () => {
      const expectedResult = undefined;
      const expectedError = undefined;
      jest
        .spyOn(usersRepository, 'removeAllAdminUser')
        .mockImplementation(() => Promise.resolve(null));
      try {
        const data = await usersService.deleteAllAdminUser();
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
    it('should failed clear all user', async () => {
      const expectedResult = undefined;
      const expectedError = 'Failed Clear All User';
      jest
        .spyOn(usersRepository, 'removeAllAdminUser')
        .mockImplementation(() => Promise.reject('Failed Clear All User'));
      try {
        const data = await usersService.deleteAllAdminUser();
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
  });
});
