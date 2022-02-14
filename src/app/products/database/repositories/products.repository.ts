import { Product } from '@app/products/database/entities/product.entity';
import { ProductsMapper } from '@app/products/database/mappers/products.mapper';
import { IProductsRepository } from '@app/products/database/repositories/interfaces/products-repository.interface';
import { ProductDTO } from '@app/products/dto/product.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ProductsSortingBy } from '@shared/enums/sorting/products-sorting-by.enum';
import { SortingType } from '@shared/enums/sorting/sorting-type.enum';
import { IQuery } from '@shared/interfaces/other/query.interface';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Product)
export class ProductsRepository
  extends Repository<Product>
  implements IProductsRepository
{
  async saveProduct(productDTO: Partial<ProductDTO>) {
    const product = ProductsMapper.DTOToEntity(productDTO);
    const foundProduct = await this.findOne({
      name: product.name,
    });
    if (foundProduct) {
      throw new BadRequestException(
        `Product with name: '${product.name}' already exist`,
      );
    }
    await this.save(product);
  }

  async findAllProductPagination(query: IQuery): Promise<ProductDTO[]> {
    const foundProducts = await this.find({
      skip: (query.page - 1) * query.limit || 0,
      take: query.limit || 10,
      order: {
        name:
          query.sortingBy === ProductsSortingBy.Name &&
          query.sortingType === SortingType.Descending
            ? 'DESC'
            : 'ASC',
      },
    });
    if (foundProducts.length === 0) {
      throw new NotFoundException(`All Products was Not Found`);
    }
    return foundProducts.map(ProductsMapper.EntityToDTO);
  }

  async findAllProduct(): Promise<ProductDTO[]> {
    const foundProducts = await this.find();
    return foundProducts.map(ProductsMapper.EntityToDTO);
  }

  async findProduct(productDTO: Partial<ProductDTO>): Promise<ProductDTO> {
    const product = ProductsMapper.DTOToEntity(productDTO);
    const foundProduct = await this.findOne({ id: product.id });
    if (!foundProduct) {
      throw new NotFoundException(
        `Product with ID: ${product.id} was not found`,
      );
    }
    return ProductsMapper.EntityToDTO(foundProduct);
  }

  async updateProduct(productDTO: Partial<ProductDTO>) {
    const product = ProductsMapper.DTOToEntity(productDTO);
    const updatedProduct = await this.update({ id: product.id }, product);
    if (!updatedProduct.affected) {
      throw new NotFoundException(
        `Product with ID: ${product.id} was not found`,
      );
    }
  }

  async saveProductForSeed(productDTO: Partial<ProductDTO>) {
    const product = ProductsMapper.DTOToEntity(productDTO);
    const foundProduct = await this.findOne({
      name: product.name,
    });
    if (foundProduct) {
      return;
    }
    await this.save(product);
  }

  async findAllProductForSeed(): Promise<ProductDTO[]> {
    const foundProducts = await this.find();
    return foundProducts.map(ProductsMapper.EntityToDTO);
  }

  async clearAllProductForSeed() {
    await this.clear();
  }
}
