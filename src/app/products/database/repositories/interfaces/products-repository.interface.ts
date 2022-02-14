import { ProductDTO } from '@app/products/dto/product.dto';
import { IQuery } from '@shared/interfaces/other/query.interface';

export interface IProductsRepository {
  saveProduct(productDTO: ProductDTO);
  findAllProductPagination(query: IQuery): Promise<ProductDTO[]>;
  findAllProduct(): Promise<ProductDTO[]>;
  updateProduct(productDTO: ProductDTO);
  findProduct(productDTO: ProductDTO): Promise<ProductDTO>;
  saveProductForSeed(productDTO: Partial<ProductDTO>);
  findAllProductForSeed(): Promise<ProductDTO[]>;
  clearAllProductForSeed();
}
