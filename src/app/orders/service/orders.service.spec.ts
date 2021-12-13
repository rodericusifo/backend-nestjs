import { CartsService } from '@app/carts/service/carts.service';
import { ICartsService } from '@app/carts/service/interface/carts-service.interface';
import { AddProductToOrderDTO } from '@app/orders/dto/add-product-to-order.dto';
import { CreateOrderDTO } from '@app/orders/dto/create-order.dto';
import { OrderDTO } from '@app/orders/dto/order.dto';
import { OrdersRepository } from '@app/orders/repository/orders.repository';
import { OrdersService } from '@app/orders/service/orders.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { randomUUID } from 'crypto';

describe('OrdersService', () => {
  let ordersService: OrdersService;
  let ordersRepository: OrdersRepository;
  let cartsService: CartsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: CartsService,
          useValue: {
            createCart: jest.fn(),
            readAllCart: jest.fn(),
          } as ICartsService,
        },
        {
          provide: getRepositoryToken(OrdersRepository),
          useClass: OrdersRepository,
        },
      ],
    }).compile();

    ordersService = module.get<OrdersService>(OrdersService);
    ordersRepository = module.get<OrdersRepository>(
      getRepositoryToken(OrdersRepository),
    );
    cartsService = module.get<CartsService>(CartsService);
  });

  it('should be defined', () => {
    expect(ordersService).toBeDefined();
    expect(ordersRepository).toBeDefined();
    expect(cartsService).toBeDefined();
  });

  describe('createOrder()', () => {
    it('should successfully create order', async () => {
      const argument: CreateOrderDTO = {
        email: 'rodericus123@gmail.com',
        name: 'Rodericus Ifo',
        address: 'Hello Street',
        phoneNumber: '081233456787',
        title: 'Order 1',
        userId: randomUUID(),
      };
      const expectedResult = undefined;
      const expectedError = undefined;
      jest
        .spyOn(ordersRepository, 'saveOrder')
        .mockImplementation(() => Promise.resolve(null));
      try {
        const data = await ordersService.createOrder(argument);
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
    it('should failed create user as admin', async () => {
      const argument: CreateOrderDTO = {
        email: 'rodericus123@gmail.com',
        name: 'Rodericus Ifo',
        address: 'Hello Street',
        phoneNumber: '081233456787',
        title: 'Order 1',
        userId: randomUUID(),
      };
      const expectedResult = undefined;
      const expectedError = 'Failed Create Order';
      jest
        .spyOn(ordersRepository, 'saveOrder')
        .mockImplementation(() => Promise.reject('Failed Create Order'));
      try {
        const data = await ordersService.createOrder(argument);
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
  });

  describe('addProductToOrder()', () => {
    it('should successfully add product to order', async () => {
      const argument: AddProductToOrderDTO = {
        id: randomUUID(),
        productId: randomUUID(),
        userId: randomUUID(),
        quantity: 3,
      };
      const expectedResult = undefined;
      const expectedError = undefined;
      jest
        .spyOn(ordersRepository, 'findOrder')
        .mockImplementation(() =>
          Promise.resolve(
            plainToClass(OrderDTO, { id: argument.id } as Partial<OrderDTO>),
          ),
        );
      jest
        .spyOn(cartsService, 'createCart')
        .mockImplementation(() => Promise.resolve(null));
      try {
        const data = await ordersService.addProductToOrder(argument);
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
    it('should failed add product to order', async () => {
      const argument: AddProductToOrderDTO = {
        id: randomUUID(),
        productId: randomUUID(),
        userId: randomUUID(),
        quantity: 3,
      };
      const expectedResult = undefined;
      const expectedError = 'Failed Add Product to Order';
      jest
        .spyOn(ordersRepository, 'findOrder')
        .mockImplementation(() =>
          Promise.reject('Failed Add Product to Order'),
        );
      try {
        const data = await ordersService.addProductToOrder(argument);
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
  });
});
