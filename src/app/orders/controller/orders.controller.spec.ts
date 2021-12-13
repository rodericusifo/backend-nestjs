import { CartDTO } from '@app/carts/dto/cart.dto';
import { CartsService } from '@app/carts/service/carts.service';
import { ICartsService } from '@app/carts/service/interface/carts-service.interface';
import { OrdersController } from '@app/orders/controller/orders.controller';
import { AddProductCustomerOrderBodyRequest } from '@app/orders/controller/request/body/add-product-customer-order-body.request';
import { CreateCustomerOrderBodyRequest } from '@app/orders/controller/request/body/create-customer-order-body.request';
import { AddProductCustomerOrderParamRequest } from '@app/orders/controller/request/param/add-product-customer-order-param.request';
import { DetailOrderByAdminParamRequest } from '@app/orders/controller/request/param/detail-order-by-admin-param.request';
import { OrderDTO } from '@app/orders/dto/order.dto';
import { OrdersRepository } from '@app/orders/repository/orders.repository';
import { OrdersService } from '@app/orders/service/orders.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IResponse } from '@response/response.interface';
import { ResponseModule } from '@response/response.module';
import { ResponseService } from '@response/response.service';
import { Role } from '@shared/enum/role.enum';
import { UserRequest } from '@shared/request/user/user.request';
import { plainToClass } from 'class-transformer';
import { randomUUID } from 'crypto';

describe('OrdersController', () => {
  let ordersController: OrdersController;
  let ordersService: OrdersService;
  let responseService: ResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ResponseModule],
      controllers: [OrdersController],
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

    ordersController = module.get<OrdersController>(OrdersController);
    ordersService = module.get<OrdersService>(OrdersService);
    responseService = module.get<ResponseService>(ResponseService);
  });

  it('should be defined', () => {
    expect(ordersController).toBeDefined();
    expect(ordersService).toBeDefined();
    expect(responseService).toBeDefined();
  });

  describe('createCustomerOrder()', () => {
    it('should successfully create customer order', async () => {
      const bodyArgument: CreateCustomerOrderBodyRequest = {
        email: 'rodericus123@gmail.com',
        name: 'Rodericus Ifo',
        address: 'Hello Street',
        phoneNumber: '081233456787',
        title: 'Order 1',
      };
      const userArgument: UserRequest = {
        id: randomUUID(),
        email: 'rodericus123@gmail.com',
        name: 'Rodericus Ifo',
        roles: [Role.Admin],
      };
      const expectedResult: IResponse = {
        message: 'Successfully Create Order',
      };
      const expectedError = undefined;
      jest
        .spyOn(ordersService, 'createOrder')
        .mockImplementation(() => Promise.resolve(null));
      try {
        const data = await ordersController.createCustomerOrder(
          userArgument,
          bodyArgument,
        );
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
    it('should failed create customer order', async () => {
      const bodyArgument: CreateCustomerOrderBodyRequest = {
        email: 'rodericus123@gmail.com',
        name: 'Rodericus Ifo',
        address: 'Hello Street',
        phoneNumber: '081233456787',
        title: 'Order 1',
      };
      const userArgument: UserRequest = {
        id: randomUUID(),
        email: 'rodericus123@gmail.com',
        name: 'Rodericus Ifo',
        roles: [Role.Admin],
      };
      const expectedResult = undefined;
      const expectedError = 'Failed Create Customer Order';
      jest
        .spyOn(ordersService, 'createOrder')
        .mockImplementation(() =>
          Promise.reject('Failed Create Customer Order'),
        );
      try {
        const data = await ordersController.createCustomerOrder(
          userArgument,
          bodyArgument,
        );
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
  });

  describe('addProductCustomerOrder()', () => {
    it('should successfully add product to customer order', async () => {
      const bodyArgument: AddProductCustomerOrderBodyRequest = {
        productId: randomUUID(),
        quantity: 5,
      };
      const paramArgument: AddProductCustomerOrderParamRequest = {
        id: randomUUID(),
      };
      const userArgument: UserRequest = {
        id: randomUUID(),
        email: 'rodericus123@gmail.com',
        name: 'Rodericus Ifo',
        roles: [Role.Admin],
      };
      const expectedResult: IResponse = {
        message: 'Successfully Add Product To Order',
      };
      const expectedError = undefined;
      jest
        .spyOn(ordersService, 'addProductToOrder')
        .mockImplementation(() => Promise.resolve(null));
      try {
        const data = await ordersController.addProductCustomerOrder(
          userArgument,
          paramArgument,
          bodyArgument,
        );
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
    it('should failed add product to customer order', async () => {
      const bodyArgument: AddProductCustomerOrderBodyRequest = {
        productId: randomUUID(),
        quantity: 5,
      };
      const paramArgument: AddProductCustomerOrderParamRequest = {
        id: randomUUID(),
      };
      const userArgument: UserRequest = {
        id: randomUUID(),
        email: 'rodericus123@gmail.com',
        name: 'Rodericus Ifo',
        roles: [Role.Admin],
      };
      const expectedResult = undefined;
      const expectedError = 'Failed Add Product to Order';
      jest
        .spyOn(ordersService, 'addProductToOrder')
        .mockImplementation(() =>
          Promise.reject('Failed Add Product to Order'),
        );
      try {
        const data = await ordersController.addProductCustomerOrder(
          userArgument,
          paramArgument,
          bodyArgument,
        );
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
  });

  describe('detailOrderByAdmin()', () => {
    it('should successfully see detail order by admin', async () => {
      const paramArgument: DetailOrderByAdminParamRequest = {
        id: randomUUID(),
      };
      const expectedResult: IResponse = {
        message: 'Order Found',
        data: plainToClass(OrderDTO, {
          id: paramArgument.id,
          title: 'Order 1',
          carts: [
            plainToClass(CartDTO, {
              id: '12345',
              quantity: 2,
            } as Partial<CartDTO>),
          ],
        } as Partial<OrderDTO>),
      };
      const expectedError = undefined;
      jest.spyOn(ordersService, 'readOrderByAdmin').mockImplementation(() =>
        Promise.resolve(
          plainToClass(OrderDTO, {
            id: paramArgument.id,
            title: 'Order 1',
            carts: [
              plainToClass(CartDTO, {
                id: '12345',
                quantity: 2,
              } as Partial<CartDTO>),
            ],
          } as Partial<OrderDTO>),
        ),
      );
      try {
        const data = await ordersController.detailOrderByAdmin(paramArgument);
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
    it('should failed see detail order by admin', async () => {
      const paramArgument: DetailOrderByAdminParamRequest = {
        id: randomUUID(),
      };
      const expectedResult = undefined;
      const expectedError = 'Failed See Order Detail By Admin';
      jest
        .spyOn(ordersService, 'readOrderByAdmin')
        .mockImplementation(() =>
          Promise.reject('Failed See Order Detail By Admin'),
        );
      try {
        const data = await ordersController.detailOrderByAdmin(paramArgument);
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
  });
});
