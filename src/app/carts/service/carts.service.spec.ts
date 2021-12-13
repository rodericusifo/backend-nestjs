import { CartDTO } from '@app/carts/dto/cart.dto';
import { CreateCartDTO } from '@app/carts/dto/create-cart.dto';
import { ReadAllCartDTO } from '@app/carts/dto/read-all-cart.dto';
import { CartsRepository } from '@app/carts/repository/carts.repository';
import { CartsService } from '@app/carts/service/carts.service';
import { ProductDTO } from '@app/products/dto/product.dto';
import { IProductsService } from '@app/products/service/interface/products-service.interface';
import { ProductsService } from '@app/products/service/products.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { randomUUID } from 'crypto';

describe('CartsService', () => {
  let cartsService: CartsService;
  let cartsRepository: CartsRepository;
  let productsService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CartsService,
        {
          provide: ProductsService,
          useValue: {
            createProduct: jest.fn(),
            deleteAllProduct: jest.fn(),
            readAllProduct: jest.fn(),
            readProduct: jest.fn(),
          } as IProductsService,
        },
        {
          provide: getRepositoryToken(CartsRepository),
          useClass: CartsRepository,
        },
      ],
    }).compile();

    cartsService = module.get<CartsService>(CartsService);
    cartsRepository = module.get<CartsRepository>(CartsRepository);
    productsService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(cartsService).toBeDefined();
    expect(cartsRepository).toBeDefined();
    expect(productsService).toBeDefined();
  });

  describe('createCart()', () => {
    it('should successfully create cart', async () => {
      const argument: CreateCartDTO = {
        orderId: randomUUID(),
        productId: randomUUID(),
        quantity: 3,
      };
      const expectedResult = undefined;
      const expectedError = undefined;
      jest.spyOn(productsService, 'readProduct').mockImplementation(() =>
        Promise.resolve(
          plainToClass(ProductDTO, {
            id: argument.productId,
            name: 'Apple',
            price: 2000,
            stock: 30,
          } as Partial<ProductDTO>),
        ),
      );
      jest
        .spyOn(cartsRepository, 'saveCart')
        .mockImplementation(() => Promise.resolve(null));
      try {
        const data = await cartsService.createCart(argument);
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
    it('should failed create cart', async () => {
      const argument: CreateCartDTO = {
        orderId: randomUUID(),
        productId: randomUUID(),
        quantity: 3,
      };
      const expectedResult = undefined;
      const expectedError = 'Failed Create Cart';
      jest
        .spyOn(productsService, 'readProduct')
        .mockImplementation(() => Promise.reject('Failed Create Cart'));
      try {
        const data = await cartsService.createCart(argument);
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
  });

  describe('readAllCart()', () => {
    it('should successfully read all cart', async () => {
      const argument: ReadAllCartDTO = {
        orderId: randomUUID(),
      };
      const expectedResult: CartDTO[] = [
        plainToClass(CartDTO, {
          id: '12345',
          orderId: argument.orderId,
        } as Partial<CartDTO>),
      ];
      const expectedError = undefined;
      jest.spyOn(cartsRepository, 'findAllCart').mockImplementation(() =>
        Promise.resolve([
          plainToClass(CartDTO, {
            id: '12345',
            orderId: argument.orderId,
          } as Partial<CartDTO>),
        ]),
      );
      try {
        const data = await cartsService.readAllCart(argument);
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
    it('should failed read all cart', async () => {
      const argument: ReadAllCartDTO = {
        orderId: randomUUID(),
      };
      const expectedResult = undefined;
      const expectedError = 'Failed Read All Cart';
      jest
        .spyOn(cartsRepository, 'findAllCart')
        .mockImplementation(() => Promise.reject('Failed Read All Cart'));
      try {
        const data = await cartsService.readAllCart(argument);
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
  });
});
