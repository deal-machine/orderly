import { Controller, Post, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import {
  CreateCustomerFactory,
  FindCustomerByCpfFactory,
} from 'src/main/checkin/customers';

@Controller('customers')
export class CustomerRouter {
  @Post()
  async create(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    const controller = CreateCustomerFactory.register();
    const result = await controller.handle(request['data']);
    return response.status(result.statusCode).json(result.body);
  }

  @Get(':cpf')
  async getCustomer(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    const controller = FindCustomerByCpfFactory.register();
    const result = await controller.handle(request['data']);
    return response.status(result.statusCode).json(result.body);
  }
}
