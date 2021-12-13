import { ProductsModule } from '@app/products/products.module';
import { ProductsSeedService } from '@app/seeds/products-seed/service/products-seed.service';
import { UsersSeedService } from '@app/seeds/users-seed/service/users-seed.service';
import { UsersModule } from '@app/users/users.module';
import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';

@Module({
  imports: [CommandModule, ProductsModule, UsersModule],
  providers: [ProductsSeedService, UsersSeedService],
})
export class SeedsModule {}
