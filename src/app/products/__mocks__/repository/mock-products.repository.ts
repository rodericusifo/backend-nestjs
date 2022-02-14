/* eslint-disable @typescript-eslint/no-unused-vars */
import { ProductDTO } from '@app/products/dto/product.dto';
import { IProductsRepository } from '@app/products/database/repositories/interfaces/products-repository.interface';
import { IQuery } from '@shared/interfaces/other/query.interface';

export class MockedProductsRepository implements IProductsRepository {
  saveProductForSeed(_productDTO: Partial<ProductDTO>) {
    throw new Error('Method not implemented.');
  }
  findAllProductForSeed(): Promise<ProductDTO[]> {
    throw new Error('Method not implemented.');
  }
  clearAllProductForSeed() {
    throw new Error('Method not implemented.');
  }
  saveProduct(_productDTO: ProductDTO) {
    throw new Error('Method not implemented.');
  }
  clearAllProduct() {
    throw new Error('Method not implemented.');
  }
  findAllProductPagination(_query: IQuery): Promise<ProductDTO[]> {
    throw new Error('Method not implemented.');
  }
  findAllProduct(): Promise<ProductDTO[]> {
    throw new Error('Method not implemented.');
  }
  updateProduct(_productDTO: ProductDTO) {
    throw new Error('Method not implemented.');
  }
  findProduct(_productDTO: ProductDTO): Promise<ProductDTO> {
    throw new Error('Method not implemented.');
  }
}
