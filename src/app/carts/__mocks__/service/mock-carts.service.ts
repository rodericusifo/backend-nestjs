/* eslint-disable @typescript-eslint/no-unused-vars */
import { CartDTO } from '@app/carts/dto/cart.dto';
import { CreateCartDTO } from '@app/carts/dto/create-cart.dto';
import { ReadAllCartDTO } from '@app/carts/dto/read-all-cart.dto';
import { ICartsService } from '@app/carts/services/interfaces/carts-service.interface';

export class MockedCartsService implements ICartsService {
  createCart(_payload: CreateCartDTO) {
    throw new Error('Method not implemented.');
  }
  readAllCart(_payload: ReadAllCartDTO): Promise<CartDTO[]> {
    throw new Error('Method not implemented.');
  }
}
