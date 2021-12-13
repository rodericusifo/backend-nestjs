import { ProductDTO } from '@app/products/dto/product.dto';
import { Product } from '@app/products/entity/product.entity';
import { plainToClass } from 'class-transformer';

export class ProductsMapper {
  static DTOToEntity(productDTO: Partial<ProductDTO>): Product {
    return plainToClass(Product, productDTO);
  }

  static EntityToDTO(product: Partial<Product>): ProductDTO {
    return plainToClass(ProductDTO, product);
  }
}
