import { UserDTO } from '@app/users/dto/user.dto';

export interface IUsersRepository {
  saveUser(userDTO: UserDTO);
  findUserWithEmail(userDTO: UserDTO): Promise<UserDTO>;
  removeAllAdminUser();
}
