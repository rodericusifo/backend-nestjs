import { UsersSeedBuilder } from '@app/seeds/users-seed/builder/users-seed.builder';
import { UsersService } from '@app/users/service/users.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ISeedService } from '@shared/interface/service/seed-service.interface';
import { Command } from 'nestjs-command';

@Injectable()
export class UsersSeedService implements ISeedService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  @Command({
    command: 'seed:up:users',
    describe: 'seeding users',
  })
  async up() {
    UsersSeedBuilder.build(
      +this.configService.get<number>('db-seed.users'),
    ).forEach(async (usersSeedData) => {
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
