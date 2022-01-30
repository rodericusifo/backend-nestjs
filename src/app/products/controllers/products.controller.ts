import { ListProductQueryRequest } from '@app/products/controllers/request/query/list-product-query.request';
import { ProductsService } from '@app/products/services/products.service';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response, ResponseStatusCode } from '@response/response.decorator';
import { IResponsePaging } from '@response/response.interface';
import { ResponseService } from '@response/response.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    @Response() private readonly responseService: ResponseService,
    private readonly productsService: ProductsService,
  ) {}

  @ResponseStatusCode()
  @Get('/list')
  async listProduct(
    @Query() query: ListProductQueryRequest,
  ): Promise<IResponsePaging> {
    const result = await this.productsService.readAllProduct({ ...query });
    return this.responseService.paging(
      'All Product Found',
      result.findAll.length,
      Math.ceil(result.findAll.length / query.limit),
      query.page,
      result.findAllPagination.length,
      result.findAllPagination,
    );
  }
}
