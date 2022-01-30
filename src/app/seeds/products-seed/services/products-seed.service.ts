import { ProductsService } from '@app/products/services/products.service';
import { ProductsSeedBuilder } from '@app/seeds/products-seed/builders/products-seed.builder';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ISeedService } from '@shared/interfaces/service/seed-service.interface';
import { Command } from 'nestjs-command';

@Injectable()
export class ProductsSeedService implements ISeedService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly configService: ConfigService,
  ) {}

  @Command({
    command: 'seed:up:products',
    describe: 'seeding products',
  })
  async up() {
    ProductsSeedBuilder.build(
      +this.configService.get<number>('db-seed.products'),
    ).forEach(async (productsSeedData) => {
      await this.productsService.createProduct(productsSeedData);
    });
  }

  @Command({
    command: 'seed:drop:products',
    describe: 'drop seeding products',
  })
  async drop() {
    await this.productsService.deleteAllProduct();
  }
}
