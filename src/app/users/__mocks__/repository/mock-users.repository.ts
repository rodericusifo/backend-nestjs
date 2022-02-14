/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserDTO } from '@app/users/dto/user.dto';
import { IUsersRepository } from '@app/users/database/repositories/interfaces/users-repository.interface';

export class MockedUsersRepository implements IUsersRepository {
  saveAdminUserForSeed(userDTO: UserDTO) {
    throw new Error('Method not implemented.');
  }
  findAllAdminUserForSeed(): Promise<UserDTO[]> {
    throw new Error('Method not implemented.');
  }
  removeAllAdminUserForSeed() {
    throw new Error('Method not implemented.');
  }
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
