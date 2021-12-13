import { AddProductCustomerOrderBodyRequest } from '@app/orders/controller/request/body/add-product-customer-order-body.request';
import { CreateCustomerOrderBodyRequest } from '@app/orders/controller/request/body/create-customer-order-body.request';
import { AddProductCustomerOrderParamRequest } from '@app/orders/controller/request/param/add-product-customer-order-param.request';
import { OrdersService } from '@app/orders/service/orders.service';
import { Body, Controller, Param, Post } from '@nestjs/common';
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
  @Post('/customer/create')
  async createCustomerOrder(
    @User() user: UserRequest,
    @Body() body: CreateCustomerOrderBodyRequest,
  ): Promise<IResponse> {
    await this.ordersService.createOrder({ ...body, userId: user.id });
    return this.responseService.success('Successfully Create Order');
  }

  @ResponseStatusCode()
  @Auth(Role.Customer)
  @Post(':id/customer/add-product')
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
}