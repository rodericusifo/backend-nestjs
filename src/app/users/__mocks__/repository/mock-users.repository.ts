/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserDTO } from '@app/users/dto/user.dto';
import { IUsersRepository } from '@app/users/repository/interface/users-repository.interface';

export class MockedUsersRepository implements IUsersRepository {
  saveUser(_userDTO: UserDTO) {
    throw new Error('Method not implemented.');
  }
  findUserWithEmail(_userDTO: UserDTO): Promise<UserDTO> {
    throw new Error('Method not implemented.');
  }
  removeAllAdminUser() {
    throw new Error('Method not implemented.');
  }
}