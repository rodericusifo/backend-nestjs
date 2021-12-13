import { CartDTO } from '@app/carts/dto/cart.dto';
import { Cart } from '@app/carts/entity/cart.entity';
import { ProductsMapper } from '@app/products/mapper/products.mapper';
import { plainToClass } from 'class-transformer';

export class CartsMapper {
  static DTOToEntity(cartDTO: Partial<CartDTO>): Cart {
    const cart = plainToClass(Cart, cartDTO);
    cart.product = ProductsMapper.DTOToEntity(cartDTO.product);
    return cart;
  }

  static EntityToDTO(cart: Partial<Cart>): CartDTO {
    const cartDTO = plainToClass(CartDTO, cart);
    cartDTO.product = ProductsMapper.EntityToDTO(cart.product);
    return cartDTO;
  }
}
