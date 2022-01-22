import { ProductDTO } from '@app/products/dto/product.dto';
import { IQuery } from '@shared/interface/other/query.interface';

export interface IProductsRepository {
  saveProduct(productDTO: ProductDTO);
  clearAllProduct();
  findAllProductPagination(query: IQuery): Promise<ProductDTO[]>;
  findAllProduct(): Promise<ProductDTO[]>;
  updateProduct(productDTO: ProductDTO);
  findProduct(productDTO: ProductDTO): Promise<ProductDTO>;
}
