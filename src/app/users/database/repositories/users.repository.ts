import { UserDTO } from '@app/users/dto/user.dto';
import { User } from '@app/users/database/entities/user.entity';
import { UsersMapper } from '@app/users/database/mappers/users.mapper';
import { IUsersRepository } from '@app/users/database/repositories/interfaces/users-repository.interface';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Role } from '@shared/enums/role.enum';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UsersRepository
  extends Repository<User>
  implements IUsersRepository
{
  async saveUser(userDTO: Partial<UserDTO>) {
    const user = UsersMapper.DTOToEntity(userDTO);
    const foundUser = await this.findOne(
      {
        email: user.email,
      },
      { withDeleted: true },
    );
    if (foundUser) {
      throw new BadRequestException(
        `User with email: '${user.email}' already exist`,
      );
    }
    await this.save(user);
  }

  async findUserWithEmail(userDTO: Partial<UserDTO>): Promise<UserDTO> {
    const user = UsersMapper.DTOToEntity(userDTO);
    const foundUser = await this.findOne({ email: user.email });
    if (!foundUser) {
      throw new UnauthorizedException(
        `The Account with Email: ${user.email} is not registered yet`,
      );
    }
    return UsersMapper.EntityToDTO(foundUser);
  }

  async removeAllAdminUser() {
    const users = await this.find({ roles: [Role.Admin] });
    await this.remove(users);
  }
}
