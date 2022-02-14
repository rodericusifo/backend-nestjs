import { UserDTO } from '@app/users/dto/user.dto';

export interface IUsersRepository {
  saveUser(userDTO: UserDTO);
  findUserWithEmail(userDTO: UserDTO): Promise<UserDTO>;
  saveAdminUserForSeed(userDTO: UserDTO);
  findAllAdminUserForSeed(): Promise<UserDTO[]>;
  removeAllAdminUserForSeed();
}
