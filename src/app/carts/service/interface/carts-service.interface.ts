import { CartDTO } from '@app/carts/dto/cart.dto';
import { CreateCartDTO } from '@app/carts/dto/create-cart.dto';
import { ReadAllCartDTO } from '@app/carts/dto/read-all-cart.dto';

export interface ICartsService {
  createCart(payload: CreateCartDTO);
  readAllCart(payload: ReadAllCartDTO): Promise<CartDTO[]>;
}
