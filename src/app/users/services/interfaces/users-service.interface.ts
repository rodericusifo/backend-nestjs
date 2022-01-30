import { CreateUserDTO } from '@app/users/dto/create-user.dto';
import { ReadUserForLoginDTO } from '@app/users/dto/read-user-for-login.dto';
import { UserDTO } from '@app/users/dto/user.dto';

export interface IUsersService {
  createUserAsAdmin(payload: CreateUserDTO);
  createUserAsCustomer(payload: CreateUserDTO);
  readUserForLogin(payload: ReadUserForLoginDTO): Promise<UserDTO>;
  deleteAllAdminUser();
}
