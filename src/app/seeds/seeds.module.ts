import { ProductsRepository } from '@app/products/database/repositories/products.repository';
import { ProductsSeedService } from '@app/seeds/products-seed/services/products-seed.service';
import { SeedsService } from '@app/seeds/seeds.service';
import { UsersSeedService } from '@app/seeds/users-seed/services/users-seed.service';
import { UsersRepository } from '@app/users/database/repositories/users.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsRepository, UsersRepository])],
  providers: [ProductsSeedService, UsersSeedService, SeedsService],
})
export class SeedsModule {}
