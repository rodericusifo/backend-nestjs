import { usersSeedDatas } from '@app/seeds/users-seed/data/users-seed.data';
import { UsersRepository } from '@app/users/database/repositories/users.repository';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ISeedService } from '@shared/interfaces/service/seed-service.interface';

@Injectable()
export class UsersSeedService implements ISeedService {
  private readonly loggerConsole = new Logger(UsersSeedService.name);

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly configService: ConfigService,
  ) {}

  async seed() {
    this.loggerConsole.debug('Seed Users on Progress');
    const userDTOs = await this.usersRepository.findAllAdminUserForSeed();
    if (usersSeedDatas.length < userDTOs.length) {
      await this.usersRepository.removeAllAdminUserForSeed();
    }
    usersSeedDatas.forEach(async (usersSeedData) => {
      usersSeedData.setAsAdmin();
      await usersSeedData.encryptPassword(
        +this.configService.get<number>('app.hash.passwordSaltLength'),
      );
      await this.usersRepository.saveAdminUserForSeed(usersSeedData);
    });
    this.loggerConsole.debug(
      `Successfully Seed Users. Total of Data: ${userDTOs.length}`,
    );
  }
}
