import { UserDTO } from '@app/users/dto/user.dto';
import { User } from '@app/users/database/entities/user.entity';
import { plainToClass } from 'class-transformer';

export class UsersMapper {
  static DTOToEntity(userDTO: Partial<UserDTO>): User {
    return plainToClass(User, userDTO);
  }

  static EntityToDTO(user: Partial<User>): UserDTO {
    return plainToClass(UserDTO, user);
  }
}
