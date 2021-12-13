import { usersSeedDatas } from '@app/seeds/users-seed/data/users-seed.data';
import { UsersService } from '@app/users/service/users.service';
import { Injectable } from '@nestjs/common';
import { ISeedService } from '@shared/interface/service/seed-service.interface';
import { Command } from 'nestjs-command';

@Injectable()
export class UsersSeedService implements ISeedService {
  constructor(private readonly usersService: UsersService) {}

  @Command({
    command: 'seed:up:users',
    describe: 'seeding users',
  })
  async Up() {
    await usersSeedDatas.map(async (usersSeedData) => {
      await this.usersService.createUserAsAdmin(usersSeedData);
    });
  }

  @Command({
    command: 'seed:drop:users',
    describe: 'drop seeding users',
  })
  async drop() {
    await this.usersService.deleteAllAdminUser();
  }
}
