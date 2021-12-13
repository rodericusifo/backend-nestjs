import { CreateProductDTO } from '@app/products/dto/create-product.dto';

export const productsSeedDatas: CreateProductDTO[] = [
  { name: 'Peach', price: 100000, stock: 50, description: 'This is a Peach' },
  { name: 'Apple', price: 30000, stock: 100, description: 'This is an Apple' },
  {
    name: 'Orange',
    price: 10000,
    stock: 200,
    description: 'This is an Orange',
  },
];
