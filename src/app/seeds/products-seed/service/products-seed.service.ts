import { ProductsService } from '@app/products/service/products.service';
import { productsSeedDatas } from '@app/seeds/products-seed/data/products-seed.data';
import { Injectable } from '@nestjs/common';
import { ISeedService } from '@shared/interface/service/seed-service.interface';
import { Command } from 'nestjs-command';

@Injectable()
export class ProductsSeedService implements ISeedService {
  constructor(private readonly productsService: ProductsService) {}

  @Command({
    command: 'seed:up:products',
    describe: 'seeding products',
  })
  async Up() {
    await productsSeedDatas.map(async (productsSeedData) => {
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
