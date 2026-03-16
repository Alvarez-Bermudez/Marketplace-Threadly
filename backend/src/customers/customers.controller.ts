import { Controller, Get, Param, Query } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { GetCustomersQueryDto } from './dto/get-customers-query.dto';

@Controller('admin')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get('customers')
  findAll(@Query() query: GetCustomersQueryDto) {
    console.log(query.page, query.limit, query.search);
    return this.customersService.findAll(query.page, query.limit, query.search);
  }

  @Get('customers/:id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }
}
