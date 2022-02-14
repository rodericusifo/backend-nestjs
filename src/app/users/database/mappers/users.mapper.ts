import { User } from '@app/users/database/entities/user.entity';
import { UserDTO } from '@app/users/dto/user.dto';
import { plainToInstance } from 'class-transformer';

export class UsersMapper {
  static DTOToEntity(userDTO: Partial<UserDTO>): User {
    return plainToInstance(User, userDTO);
  }

  static EntityToDTO(user: Partial<User>): UserDTO {
    return plainToInstance(UserDTO, user);
  }
}
