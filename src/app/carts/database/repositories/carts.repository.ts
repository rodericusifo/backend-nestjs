import { CartDTO } from '@app/carts/dto/cart.dto';
import { Cart } from '@app/carts/database/entities/cart.entity';
import { CartsMapper } from '@app/carts/database/mappers/carts.mapper';
import { ICartsRepository } from '@app/carts/database/repositories/interfaces/carts-repository.interface';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Cart)
export class CartsRepository
  extends Repository<Cart>
  implements ICartsRepository
{
  async saveCart(cartDTO: Partial<CartDTO>) {
    const cart = CartsMapper.DTOToEntity(cartDTO);
    const foundCart = await this.findOne({
      product: cart.product,
      orderId: cart.orderId,
    });
    if (foundCart) {
      await this.update(
        { id: foundCart.id },
        {
          quantity: foundCart.quantity + cart.quantity,
          amount: foundCart.amount + cart.amount,
        },
      );
      return;
    }
    await this.save(cart);
  }

  async findAllCart(cartDTO: Partial<CartDTO>): Promise<CartDTO[]> {
    const cart = CartsMapper.DTOToEntity(cartDTO);
    const foundCart = await this.find({
      where: {
        orderId: cart.orderId,
      },
      relations: ['product'],
    });
    return foundCart.map(CartsMapper.EntityToDTO);
  }
}
