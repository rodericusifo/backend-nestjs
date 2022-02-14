import { UsersRepository } from '@app/users/database/repositories/users.repository';
import { CreateUserDTO } from '@app/users/dto/create-user.dto';
import { ReadUserForLoginDTO } from '@app/users/dto/read-user-for-login.dto';
import { UserDTO } from '@app/users/dto/user.dto';
import { IUsersService } from '@app/users/services/interfaces/users-service.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    private readonly configService: ConfigService,
  ) {}
  async createUserAsAdmin(payload: CreateUserDTO) {
    const userDTO = plainToInstance(UserDTO, payload);
    userDTO.setAsAdmin();
    await userDTO.encryptPassword(
      +this.configService.get<number>('app.hash.passwordSaltLength'),
    );
    await this.usersRepository.saveUser(userDTO);
  }

  async createUserAsCustomer(payload: CreateUserDTO) {
    const userDTO = plainToInstance(UserDTO, payload);
    userDTO.setAsCustomer();
    await userDTO.encryptPassword(
      +this.configService.get<number>('app.hash.passwordSaltLength'),
    );
    await this.usersRepository.saveUser(userDTO);
  }

  async readUserForLogin(payload: ReadUserForLoginDTO): Promise<UserDTO> {
    const userDTO = plainToInstance(UserDTO, payload);
    const foundUserDTO = await this.usersRepository.findUserWithEmail(userDTO);
    await foundUserDTO.decryptPasswordAndValidate(userDTO.password);
    return foundUserDTO;
  }
}
