import { CreateProductDTO } from '@app/products/dto/create-product.dto';
import { ProductDTO } from '@app/products/dto/product.dto';
import { ReadAllProductDTO } from '@app/products/dto/read-all-product.dto';
import { ReadProductDTO } from '@app/products/dto/read-product.dto';
import { ProductsRepository } from '@app/products/repository/products.repository';
import { IProductsService } from '@app/products/service/interface/products-service.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IQuery } from '@shared/interface/other/query.interface';
import { IReadAllServiceMethodResponse } from '@shared/interface/other/service-method-response/read-all-service-method-response.interface';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ProductsService implements IProductsService {
  constructor(
    @InjectRepository(ProductsRepository)
    private readonly productsRepository: ProductsRepository,
  ) {}
  async createProduct(payload: CreateProductDTO) {
    const productDTO = plainToClass(ProductDTO, payload);
    await this.productsRepository.saveProduct(productDTO);
  }
  async readAllProduct(
    payload: ReadAllProductDTO,
  ): Promise<IReadAllServiceMethodResponse<ProductDTO[]>> {
    const query: IQuery = {
      limit: payload.limit,
      page: payload.page,
      sortingBy: payload.sortingBy,
      sortingType: payload.sortingType,
    };
    const productDTOs = await this.productsRepository.findAllProduct();
    const productDTOsPagination =
      await this.productsRepository.findAllProductPagination(query);
    return {
      findAll: productDTOs,
      findAllPagination: productDTOsPagination,
    };
  }

  async readProduct(payload: ReadProductDTO): Promise<ProductDTO> {
    let productDTO = plainToClass(ProductDTO, payload);
    productDTO = await this.productsRepository.findProduct(productDTO);
    return productDTO;
  }

  async deleteAllProduct() {
    await this.productsRepository.clearAllProduct();
  }
}
