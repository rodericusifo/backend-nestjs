/* eslint-disable @typescript-eslint/no-unused-vars */
import { CreateUserDTO } from '@app/users/dto/create-user.dto';
import { ReadUserForLoginDTO } from '@app/users/dto/read-user-for-login.dto';
import { UserDTO } from '@app/users/dto/user.dto';
import { IUsersService } from '@app/users/services/interfaces/users-service.interface';

export class MockedUsersService implements IUsersService {
  createUserAsAdmin(_payload: CreateUserDTO) {
    throw new Error('Method not implemented.');
  }
  createUserAsCustomer(_payload: CreateUserDTO) {
    throw new Error('Method not implemented.');
  }
  readUserForLogin(_payload: ReadUserForLoginDTO): Promise<UserDTO> {
    throw new Error('Method not implemented.');
  }
  deleteAllAdminUser() {
    throw new Error('Method not implemented.');
  }
}
