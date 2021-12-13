import { AddProductCustomerOrderBodyRequest } from '@app/orders/controller/request/body/add-product-customer-order-body.request';
import { CreateCustomerOrderBodyRequest } from '@app/orders/controller/request/body/create-customer-order-body.request';
import { AddProductCustomerOrderParamRequest } from '@app/orders/controller/request/param/add-product-customer-order-param.request';
import { DetailOrderByAdminParamRequest } from '@app/orders/controller/request/param/detail-order-by-admin-param.request';
import { DetailOrderByCustomerParamRequest } from '@app/orders/controller/request/param/detail-order-by-customer-param.request';
import { OrdersService } from '@app/orders/service/orders.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response, ResponseStatusCode } from '@response/response.decorator';
import { IResponse } from '@response/response.interface';
import { ResponseService } from '@response/response.service';
import { Auth } from '@shared/decorator/auth.decorator';
import { User } from '@shared/decorator/user.decorator';
import { Role } from '@shared/enum/role.enum';
import { UserRequest } from '@shared/request/user/user.request';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(
    @Response() private readonly responseService: ResponseService,
    private readonly ordersService: OrdersService,
  ) {}

  @ResponseStatusCode()
  @Auth(Role.Customer)
  @Post('/create/customer')
  async createCustomerOrder(
    @User() user: UserRequest,
    @Body() body: CreateCustomerOrderBodyRequest,
  ): Promise<IResponse> {
    await this.ordersService.createOrder({ ...body, userId: user.id });
    return this.responseService.success('Successfully Create Order');
  }

  @ResponseStatusCode()
  @Auth(Role.Customer)
  @Post(':id/add-product/customer')
  async addProductCustomerOrder(
    @User() user: UserRequest,
    @Param() param: AddProductCustomerOrderParamRequest,
    @Body() body: AddProductCustomerOrderBodyRequest,
  ): Promise<IResponse> {
    await this.ordersService.addProductToOrder({
      ...param,
      ...body,
      userId: user.id,
    });
    return this.responseService.success('Successfully Add Product To Order');
  }

  @ResponseStatusCode()
  @Auth(Role.Customer)
  @Get(':id/detail/customer')
  async detailOrderByCustomer(
    @User() user: UserRequest,
    @Param() param: DetailOrderByCustomerParamRequest,
  ): Promise<IResponse> {
    const result = await this.ordersService.readOrderByCustomer({
      ...param,
      userId: user.id,
    });
    return this.responseService.success('Order Found', result);
  }

  @ResponseStatusCode()
  @Auth(Role.Admin)
  @Get(':id/detail/admin')
  async detailOrderByAdmin(
    @Param() param: DetailOrderByAdminParamRequest,
  ): Promise<IResponse> {
    const result = await this.ordersService.readOrderByAdmin({
      ...param,
    });
    return this.responseService.success('Order Found', result);
  }
}
