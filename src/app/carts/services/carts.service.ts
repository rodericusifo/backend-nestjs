import { CartsRepository } from '@app/carts/database/repositories/carts.repository';
import { CartDTO } from '@app/carts/dto/cart.dto';
import { CreateCartDTO } from '@app/carts/dto/create-cart.dto';
import { ReadAllCartDTO } from '@app/carts/dto/read-all-cart.dto';
import { ICartsService } from '@app/carts/services/interfaces/carts-service.interface';
import { ProductsService } from '@app/products/services/products.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CartsService implements ICartsService {
  constructor(
    @InjectRepository(CartsRepository)
    private readonly cartsRepository: CartsRepository,
    private readonly productsService: ProductsService,
  ) {}

  async createCart(payload: CreateCartDTO) {
    const foundProductDTO = await this.productsService.readProduct({
      id: payload.productId,
    });
    foundProductDTO.checkAvailability();
    const cartDTO = plainToInstance(CartDTO, {
      quantity: payload.quantity,
      product: foundProductDTO,
      orderId: payload.orderId,
    });
    cartDTO.calculateAmount();
    await this.cartsRepository.saveCart(cartDTO);
  }

  async readAllCart(payload: ReadAllCartDTO): Promise<CartDTO[]> {
    const cartDTO = plainToInstance(CartDTO, payload);
    const foundCartDTOs = await this.cartsRepository.findAllCart(cartDTO);
    return foundCartDTOs;
  }
}
