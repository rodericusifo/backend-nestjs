import { CartDTO } from '@app/carts/dto/cart.dto';
import { Cart } from '@app/carts/entity/cart.entity';
import { ProductDTO } from '@app/products/dto/product.dto';
import { Product } from '@app/products/entity/product.entity';
import { plainToClass } from 'class-transformer';

export class CartsMapper {
  static DTOToEntity(cartDTO: Partial<CartDTO>): Cart {
    const cart = plainToClass(Cart, cartDTO);
    cart.product = plainToClass(Product, cartDTO.product);
    return cart;
  }

  static EntityToDTO(cart: Partial<Cart>): CartDTO {
    const cartDTO = plainToClass(CartDTO, cart);
    cartDTO.product = plainToClass(ProductDTO, cart.product);
    return cartDTO;
  }
}
