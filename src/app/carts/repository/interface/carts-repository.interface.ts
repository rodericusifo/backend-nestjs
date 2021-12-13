import { CartDTO } from '@app/carts/dto/cart.dto';

export interface ICartsRepository {
  saveCart(cartDTO: Partial<CartDTO>);
  findAllCart(cartDTO: Partial<CartDTO>): Promise<CartDTO[]>;
}
