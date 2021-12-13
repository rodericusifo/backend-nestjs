import { CartDTO } from '@app/carts/dto/cart.dto';
import { CreateCartDTO } from '@app/carts/dto/create-cart.dto';
import { ReadAllCartDTO } from '@app/carts/dto/read-all-cart.dto';
import { CartsRepository } from '@app/carts/repository/carts.repository';
import { ICartsService } from '@app/carts/service/interface/carts-service.interface';
import { ProductsService } from '@app/products/service/products.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';

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
    const cartDTO = plainToClass(CartDTO, {
      quantity: payload.quantity,
      product: foundProductDTO,
      orderId: payload.orderId,
    });
    cartDTO.calculateAmount();
    await this.cartsRepository.saveCart(cartDTO);
  }

  async readAllCart(payload: ReadAllCartDTO): Promise<CartDTO[]> {
    const cartDTO = plainToClass(CartDTO, payload);
    const foundCartDTOs = await this.cartsRepository.findAllCart(cartDTO);
    return foundCartDTOs;
  }
}
