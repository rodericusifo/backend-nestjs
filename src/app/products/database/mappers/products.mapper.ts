import { ProductDTO } from '@app/products/dto/product.dto';
import { Product } from '@app/products/database/entities/product.entity';
import { plainToClass } from 'class-transformer';

export class ProductsMapper {
  static DTOToEntity(productDTO: Partial<ProductDTO>): Product {
    return plainToClass(Product, productDTO);
  }

  static EntityToDTO(product: Partial<Product>): ProductDTO {
    return plainToClass(ProductDTO, product);
  }
}
