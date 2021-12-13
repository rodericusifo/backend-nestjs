import { CreateProductDTO } from '@app/products/dto/create-product.dto';
import * as faker from 'faker';

export class ProductsSeedBuilder {
  static build(total: number): CreateProductDTO[] {
    const array: CreateProductDTO[] = [];

    for (let i = 0; i < total; i++) {
      const item: CreateProductDTO = {
        name: faker.commerce.productName(),
        price: Number(faker.commerce.price(20000)),
        stock: faker.datatype.number({ min: 5, max: 500 }),
        description: faker.commerce.productDescription(),
      };
      array.push(item);
    }

    return array;
  }
}
