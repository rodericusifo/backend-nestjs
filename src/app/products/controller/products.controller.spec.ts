import { ProductsController } from '@app/products/controller/products.controller';
import { ListProductQueryRequest } from '@app/products/controller/request/query/list-product-query.request';
import { ProductDTO } from '@app/products/dto/product.dto';
import { ProductsService } from '@app/products/service/products.service';
import { MockedProductsService } from '@app/products/__mocks__/service/mock-products.service';
import { Test, TestingModule } from '@nestjs/testing';
import { IResponsePaging } from '@response/response.interface';
import { ResponseModule } from '@response/response.module';
import { IReadAllServiceMethodResponse } from '@shared/interface/other/service-method-response/read-all-service-method-response.interface';
import { WinstonModule } from 'nest-winston';

describe('ProductsController', () => {
  let productsController: ProductsController;
  let productsService: MockedProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ResponseModule, WinstonModule.forRoot({})],
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useClass: MockedProductsService,
        },
      ],
    }).compile();

    productsController = module.get<ProductsController>(ProductsController);
    productsService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(productsController).toBeDefined();
    expect(productsService).toBeDefined();
  });

  describe('listProduct()', () => {
    it('should successfully get list product', async () => {
      const queryArgument: ListProductQueryRequest = {
        limit: 5,
        page: 1,
      };
      const expectedResult: IResponsePaging = {
        message: 'All Product Found',
        total_data: 1,
        total_page: Math.ceil(1 / queryArgument.limit),
        current_page: queryArgument.page,
        per_page: 1,
        data: [
          {
            id: '54321',
            name: 'Olleh',
            price: 100,
          },
        ],
      };
      const expectedError = undefined;
      jest.spyOn(productsService, 'readAllProduct').mockImplementation(() =>
        Promise.resolve({
          findAll: [
            {
              id: '12345',
              name: 'Hello',
              price: 200,
            },
          ],
          findAllPagination: [
            {
              id: '54321',
              name: 'Olleh',
              price: 100,
            },
          ],
        } as IReadAllServiceMethodResponse<ProductDTO[]>),
      );
      try {
        const data = await productsController.listProduct({ ...queryArgument });
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
    it('should failed get list product', async () => {
      const queryArgument: ListProductQueryRequest = {
        limit: 5,
        page: 1,
      };
      const expectedResult = undefined;
      const expectedError = 'Failed Get List Product';
      jest
        .spyOn(productsService, 'readAllProduct')
        .mockImplementation(() => Promise.reject('Failed Get List Product'));
      try {
        const data = await productsController.listProduct({ ...queryArgument });
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
  });
});
