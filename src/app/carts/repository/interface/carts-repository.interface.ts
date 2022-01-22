import { CartDTO } from '@app/carts/dto/cart.dto';

export interface ICartsRepository {
  saveCart(cartDTO: CartDTO);
  findAllCart(cartDTO: CartDTO): Promise<CartDTO[]>;
}
