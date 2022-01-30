import { CreateProductDTO } from '@app/products/dto/create-product.dto';
import { ProductDTO } from '@app/products/dto/product.dto';
import { ReadAllProductDTO } from '@app/products/dto/read-all-product.dto';
import { ReadProductDTO } from '@app/products/dto/read-product.dto';
import { UpdateProductDTO } from '@app/products/dto/update-product.dto';
import { IReadAllServiceMethodResponse } from '@shared/interfaces/other/service-method-response/read-all-service-method-response.interface';

export interface IProductsService {
  createProduct(payload: CreateProductDTO);
  updateProduct(payload: UpdateProductDTO);
  deleteAllProduct();
  readAllProduct(
    payload: ReadAllProductDTO,
  ): Promise<IReadAllServiceMethodResponse<ProductDTO[]>>;
  readProduct(payload: ReadProductDTO): Promise<ProductDTO>;
}
