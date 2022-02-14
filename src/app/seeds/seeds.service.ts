import { ProductsSeedService } from '@app/seeds/products-seed/services/products-seed.service';
import { UsersSeedService } from '@app/seeds/users-seed/services/users-seed.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedsService {
  constructor(
    private readonly productsSeedService: ProductsSeedService,
    private readonly usersSeedService: UsersSeedService,
  ) {}

  async onApplicationBootstrap() {
    await this.productsSeedService.seed();
    await this.usersSeedService.seed();
  }
}
