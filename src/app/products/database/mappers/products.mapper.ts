import { Product } from '@app/products/database/entities/product.entity';
import { ProductDTO } from '@app/products/dto/product.dto';
import { plainToInstance } from 'class-transformer';

export class ProductsMapper {
  static DTOToEntity(productDTO: Partial<ProductDTO>): Product {
    return plainToInstance(Product, productDTO);
  }

  static EntityToDTO(product: Partial<Product>): ProductDTO {
    return plainToInstance(ProductDTO, product);
  }
}
