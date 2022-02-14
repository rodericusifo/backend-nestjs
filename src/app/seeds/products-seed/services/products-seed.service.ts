import { ProductsRepository } from '@app/products/database/repositories/products.repository';
import { productsSeedDatas } from '@app/seeds/products-seed/data/products-seed.data';
import { Injectable, Logger } from '@nestjs/common';
import { ISeedService } from '@shared/interfaces/service/seed-service.interface';

@Injectable()
export class ProductsSeedService implements ISeedService {
  private readonly loggerConsole = new Logger(ProductsSeedService.name);

  constructor(private readonly productsRepository: ProductsRepository) {}

  async seed() {
    this.loggerConsole.debug('Seed Products on Progress');
    const productDTOs = await this.productsRepository.findAllProductForSeed();
    if (productsSeedDatas.length < productDTOs.length) {
      await this.productsRepository.clearAllProductForSeed();
    }
    productsSeedDatas.forEach(async (productsSeedData) => {
      await this.productsRepository.saveProductForSeed(productsSeedData);
    });
    this.loggerConsole.debug(
      `Successfully Seed Products. Total of Data: ${productDTOs.length}`,
    );
  }
}
