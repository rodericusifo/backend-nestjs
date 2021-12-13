import { UserDTO } from '@app/users/dto/user.dto';

export interface IUsersRepository {
  saveUser(userDTO: Partial<UserDTO>);
  findUserWithEmail(userDTO: Partial<UserDTO>): Promise<UserDTO>;
  removeAllAdminUser();
}
