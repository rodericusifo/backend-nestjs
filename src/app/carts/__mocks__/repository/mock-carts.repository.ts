/* eslint-disable @typescript-eslint/no-unused-vars */
import { CartDTO } from '@app/carts/dto/cart.dto';
import { ICartsRepository } from '@app/carts/database/repositories/interfaces/carts-repository.interface';

export class MockedCartsRepository implements ICartsRepository {
  saveCart(_cartDTO: CartDTO) {
    throw new Error('Method not implemented.');
  }
  findAllCart(_cartDTO: CartDTO): Promise<CartDTO[]> {
    throw new Error('Method not implemented.');
  }
}
