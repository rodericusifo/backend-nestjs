import { Cart } from '@app/carts/database/entities/cart.entity';
import { CartDTO } from '@app/carts/dto/cart.dto';
import { Product } from '@app/products/database/entities/product.entity';
import { ProductDTO } from '@app/products/dto/product.dto';
import { plainToInstance } from 'class-transformer';

export class CartsMapper {
  static DTOToEntity(cartDTO: Partial<CartDTO>): Cart {
    const cart = plainToInstance(Cart, cartDTO);
    cart.product = plainToInstance(Product, cartDTO.product);
    return cart;
  }

  static EntityToDTO(cart: Partial<Cart>): CartDTO {
    const cartDTO = plainToInstance(CartDTO, cart);
    cartDTO.product = plainToInstance(ProductDTO, cart.product);
    return cartDTO;
  }
}
