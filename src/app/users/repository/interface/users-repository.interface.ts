import { UserDTO } from '@app/users/dto/user.dto';

export interface IUsersRepository {
  saveUser(userDTO: Partial<UserDTO>);
  findUserForLogin(userDTO: Partial<UserDTO>): Promise<UserDTO>;
  removeAllAdminUser();
}
