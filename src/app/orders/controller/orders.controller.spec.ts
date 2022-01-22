import { CartDTO } from '@app/carts/dto/cart.dto';
import { OrdersController } from '@app/orders/controller/orders.controller';
import { AddProductCustomerOrderBodyRequest } from '@app/orders/controller/request/body/add-product-customer-order-body.request';
import { CreateCustomerOrderBodyRequest } from '@app/orders/controller/request/body/create-customer-order-body.request';
import { AddProductCustomerOrderParamRequest } from '@app/orders/controller/request/param/add-product-customer-order-param.request';
import { DetailOrderByAdminParamRequest } from '@app/orders/controller/request/param/detail-order-by-admin-param.request';
import { DetailOrderByCustomerParamRequest } from '@app/orders/controller/request/param/detail-order-by-customer-param.request';
import { SubmitOrderByCustomerParamRequest } from '@app/orders/controller/request/param/submit-order-by-customer-param.request';
import { SubmitOrderPaymentProofByCustomerParamRequest } from '@app/orders/controller/request/param/submit-order-payment-proof-by-customer-param.request';
import { ListOrderByAdminQueryRequest } from '@app/orders/controller/request/query/list-order-by-admin-query.request';
import { ListOrderByCustomerQueryRequest } from '@app/orders/controller/request/query/list-order-by-customer-query.request';
import { OrderDTO } from '@app/orders/dto/order.dto';
import { OrdersService } from '@app/orders/service/orders.service';
import { MockedOrdersService } from '@app/orders/__mocks__/service/mock-orders.service';
import { Test, TestingModule } from '@nestjs/testing';
import { IResponse, IResponsePaging } from '@response/response.interface';
import { ResponseModule } from '@response/response.module';
import { ResponseService } from '@response/response.service';
import { Role } from '@shared/enum/role.enum';
import { IHeaders } from '@shared/interface/other/headers.interface';
import { IReadAllServiceMethodResponse } from '@shared/interface/other/service-method-response/read-all-service-method-response.interface';
import { UserRequest } from '@shared/request/user/user.request';
import { plainToClass } from 'class-transformer';
import { randomUUID } from 'crypto';

describe('OrdersController', () => {
  let ordersController: OrdersController;
  let ordersService: MockedOrdersService;
  let responseService: ResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ResponseModule],
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useClass: MockedOrdersService,
        },
      ],
    }).compile();

    ordersController = module.get(OrdersController);
    ordersService = module.get(OrdersService);
    responseService = module.get(ResponseService);
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

  describe('detailOrderByCustomer()', () => {
    it('should successfully see detail order by customer', async () => {
      const paramArgument: DetailOrderByCustomerParamRequest = {
        id: randomUUID(),
      };
      const userArgument: UserRequest = {
        id: randomUUID(),
        email: 'rodericus123@gmail.com',
        name: 'Rodericus Ifo',
        roles: [Role.Customer],
      };
      const expectedResult: IResponse = {
        message: 'Order Found',
        data: plainToClass(OrderDTO, {
          id: paramArgument.id,
          title: 'Order 1',
          userId: userArgument.id,
          carts: [
            plainToClass(CartDTO, {
              id: '12345',
              quantity: 2,
            } as Partial<CartDTO>),
          ],
        } as Partial<OrderDTO>),
      };
      const expectedError = undefined;
      jest.spyOn(ordersService, 'readOrderByCustomer').mockImplementation(() =>
        Promise.resolve(
          plainToClass(OrderDTO, {
            id: paramArgument.id,
            title: 'Order 1',
            userId: userArgument.id,
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
        const data = await ordersController.detailOrderByCustomer(
          userArgument,
          paramArgument,
        );
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
    it('should failed see detail order by customer', async () => {
      const paramArgument: DetailOrderByCustomerParamRequest = {
        id: randomUUID(),
      };
      const userArgument: UserRequest = {
        id: randomUUID(),
        email: 'rodericus123@gmail.com',
        name: 'Rodericus Ifo',
        roles: [Role.Customer],
      };
      const expectedResult = undefined;
      const expectedError = 'Failed See Order Detail By Customer';
      jest
        .spyOn(ordersService, 'readOrderByCustomer')
        .mockImplementation(() =>
          Promise.reject('Failed See Order Detail By Customer'),
        );
      try {
        const data = await ordersController.detailOrderByCustomer(
          userArgument,
          paramArgument,
        );
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
  });

  describe('listOrderByAdmin()', () => {
    it('should successfully get list order by admin', async () => {
      const queryArgument: ListOrderByAdminQueryRequest = {
        limit: 5,
        page: 1,
      };
      const UUIDv1 = randomUUID();
      const UUIDv2 = randomUUID();
      const expectedResult: IResponsePaging = {
        message: 'All Order Found',
        total_data: 1,
        total_page: Math.ceil(1 / queryArgument.limit),
        current_page: queryArgument.page,
        per_page: 1,
        data: [
          plainToClass(OrderDTO, {
            id: UUIDv1,
            title: 'Order 2',
            carts: [
              plainToClass(CartDTO, {
                id: UUIDv2,
                quantity: 3,
              } as Partial<CartDTO>),
            ],
          } as Partial<OrderDTO>),
        ],
      };
      const expectedError = undefined;
      jest.spyOn(ordersService, 'readAllOrderByAdmin').mockImplementation(() =>
        Promise.resolve({
          findAll: [
            plainToClass(OrderDTO, {
              id: UUIDv1,
              title: 'Order 1',
            } as Partial<OrderDTO>),
          ],
          findAllPagination: [
            plainToClass(OrderDTO, {
              id: UUIDv1,
              title: 'Order 2',
              carts: [
                plainToClass(CartDTO, {
                  id: UUIDv2,
                  quantity: 3,
                } as Partial<CartDTO>),
              ],
            } as Partial<OrderDTO>),
          ],
        } as IReadAllServiceMethodResponse<OrderDTO[]>),
      );
      try {
        const data = await ordersController.listOrderByAdmin(queryArgument);
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
    it('should failed get list order by admin', async () => {
      const queryArgument: ListOrderByAdminQueryRequest = {
        limit: 5,
        page: 1,
      };
      const expectedResult = undefined;
      const expectedError = 'Failed Get List Order By Admin';
      jest
        .spyOn(ordersService, 'readAllOrderByAdmin')
        .mockImplementation(() =>
          Promise.reject('Failed Get List Order By Admin'),
        );
      try {
        const data = await ordersController.listOrderByAdmin(queryArgument);
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
  });

  describe('listOrderByCustomer()', () => {
    it('should successfully get list order by customer', async () => {
      const queryArgument: ListOrderByCustomerQueryRequest = {
        limit: 5,
        page: 1,
      };
      const userArgument: UserRequest = {
        id: randomUUID(),
        email: 'rodericus123@gmail.com',
        name: 'Rodericus Ifo',
        roles: [Role.Customer],
      };
      const UUIDv1 = randomUUID();
      const UUIDv2 = randomUUID();
      const expectedResult: IResponsePaging = {
        message: 'All Order Found',
        total_data: 1,
        total_page: Math.ceil(1 / queryArgument.limit),
        current_page: queryArgument.page,
        per_page: 1,
        data: [
          plainToClass(OrderDTO, {
            id: UUIDv1,
            title: 'Order 2',
            userId: userArgument.id,
            carts: [
              plainToClass(CartDTO, {
                id: UUIDv2,
                quantity: 4,
              } as Partial<CartDTO>),
            ],
          } as Partial<OrderDTO>),
        ],
      };
      const expectedError = undefined;
      jest
        .spyOn(ordersService, 'readAllOrderByCustomer')
        .mockImplementation(() =>
          Promise.resolve({
            findAll: [
              plainToClass(OrderDTO, {
                id: UUIDv1,
                title: 'Order 1',
                userId: userArgument.id,
              } as Partial<OrderDTO>),
            ],
            findAllPagination: [
              plainToClass(OrderDTO, {
                id: UUIDv1,
                title: 'Order 2',
                userId: userArgument.id,
                carts: [
                  plainToClass(CartDTO, {
                    id: UUIDv2,
                    quantity: 4,
                  } as Partial<CartDTO>),
                ],
              } as Partial<OrderDTO>),
            ],
          } as IReadAllServiceMethodResponse<OrderDTO[]>),
        );
      try {
        const data = await ordersController.listOrderByCustomer(
          userArgument,
          queryArgument,
        );
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
    it('should failed get list order by customer', async () => {
      const queryArgument: ListOrderByCustomerQueryRequest = {
        limit: 5,
        page: 1,
      };
      const userArgument: UserRequest = {
        id: randomUUID(),
        email: 'rodericus123@gmail.com',
        name: 'Rodericus Ifo',
        roles: [Role.Customer],
      };
      const expectedResult = undefined;
      const expectedError = 'Failed Get List Order By Customer';
      jest
        .spyOn(ordersService, 'readAllOrderByCustomer')
        .mockImplementation(() =>
          Promise.reject('Failed Get List Order By Customer'),
        );
      try {
        const data = await ordersController.listOrderByCustomer(
          userArgument,
          queryArgument,
        );
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
  });

  describe('submitOrderByCustomer()', () => {
    it('should successfully submit order by customer', async () => {
      const paramArgument: SubmitOrderByCustomerParamRequest = {
        id: randomUUID(),
      };
      const userArgument: UserRequest = {
        id: randomUUID(),
        email: 'rodericus123@gmail.com',
        name: 'Rodericus Ifo',
        roles: [Role.Customer],
      };
      const expectedResult: IResponse = {
        message: 'Submit Order Success',
      };
      const expectedError = undefined;
      jest
        .spyOn(ordersService, 'submitOrder')
        .mockImplementation(() => Promise.resolve(null));
      try {
        const data = await ordersController.submitOrderByCustomer(
          userArgument,
          paramArgument,
        );
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
    it('should failed submit order by customer', async () => {
      const paramArgument: SubmitOrderByCustomerParamRequest = {
        id: randomUUID(),
      };
      const userArgument: UserRequest = {
        id: randomUUID(),
        email: 'rodericus123@gmail.com',
        name: 'Rodericus Ifo',
        roles: [Role.Customer],
      };
      const expectedResult = undefined;
      const expectedError = 'Failed Submit Order By Customer';
      jest
        .spyOn(ordersService, 'submitOrder')
        .mockImplementation(() =>
          Promise.reject('Failed Submit Order By Customer'),
        );
      try {
        const data = await ordersController.submitOrderByCustomer(
          userArgument,
          paramArgument,
        );
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
  });

  describe('submitOrderPaymentProofByCustomer()', () => {
    it('should successfully submit order payment proof by customer', async () => {
      const paramArgument: SubmitOrderPaymentProofByCustomerParamRequest = {
        id: randomUUID(),
      };
      const userArgument: UserRequest = {
        id: randomUUID(),
        email: 'rodericus123@gmail.com',
        name: 'Rodericus Ifo',
        roles: [Role.Customer],
      };
      const headersArgument: IHeaders = {
        origin: 'http://localhost:3000',
      };
      const fileArgument: any = {
        path: 'pdf/a.pdf',
        originalname: 'a.pdf',
        mimetype: 'pdf',
      } as Partial<Express.Multer.File>;
      const expectedResult: IResponse = {
        message: 'Submit Payment Proof Order Success',
      };
      const expectedError = undefined;
      jest
        .spyOn(ordersService, 'submitOrderPaymentProof')
        .mockImplementation(() => Promise.resolve(null));
      try {
        const data = await ordersController.submitOrderPaymentProofByCustomer(
          userArgument,
          paramArgument,
          fileArgument,
          headersArgument,
        );
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
    it('should failed submit order payment proof by customer', async () => {
      const paramArgument: SubmitOrderPaymentProofByCustomerParamRequest = {
        id: randomUUID(),
      };
      const userArgument: UserRequest = {
        id: randomUUID(),
        email: 'rodericus123@gmail.com',
        name: 'Rodericus Ifo',
        roles: [Role.Customer],
      };
      const headersArgument: IHeaders = {
        origin: 'http://localhost:3000',
      };
      const fileArgument: any = {
        path: 'pdf/a.pdf',
        originalname: 'a.pdf',
        mimetype: 'pdf',
      } as Partial<Express.Multer.File>;
      const expectedResult = undefined;
      const expectedError = 'Failed Submit Order Payment Proof By Customer';
      jest
        .spyOn(ordersService, 'submitOrderPaymentProof')
        .mockImplementation(() =>
          Promise.reject('Failed Submit Order Payment Proof By Customer'),
        );
      try {
        const data = await ordersController.submitOrderPaymentProofByCustomer(
          userArgument,
          paramArgument,
          fileArgument,
          headersArgument,
        );
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
  });
});
