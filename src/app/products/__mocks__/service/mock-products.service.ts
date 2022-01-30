/* eslint-disable @typescript-eslint/no-unused-vars */
import { CreateProductDTO } from '@app/products/dto/create-product.dto';
import { ProductDTO } from '@app/products/dto/product.dto';
import { ReadAllProductDTO } from '@app/products/dto/read-all-product.dto';
import { ReadProductDTO } from '@app/products/dto/read-product.dto';
import { UpdateProductDTO } from '@app/products/dto/update-product.dto';
import { IProductsService } from '@app/products/services/interfaces/products-service.interface';
import { IReadAllServiceMethodResponse } from '@shared/interfaces/other/service-method-response/read-all-service-method-response.interface';

export class MockedProductsService implements IProductsService {
  createProduct(_payload: CreateProductDTO) {
    throw new Error('Method not implemented.');
  }
  updateProduct(_payload: UpdateProductDTO) {
    throw new Error('Method not implemented.');
  }
  deleteAllProduct() {
    throw new Error('Method not implemented.');
  }
  readAllProduct(
    _payload: ReadAllProductDTO,
  ): Promise<IReadAllServiceMethodResponse<ProductDTO[]>> {
    throw new Error('Method not implemented.');
  }
  readProduct(_payload: ReadProductDTO): Promise<ProductDTO> {
    throw new Error('Method not implemented.');
  }
}
