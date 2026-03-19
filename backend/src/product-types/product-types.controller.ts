import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductTypesService } from './product-types.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';
import { GetProductTypesQueryDto } from './dto/get-product-types-query.dto';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';

@Controller()
export class ProductTypesController {
  constructor(private readonly productTypesService: ProductTypesService) {}

  @Get('product-types')
  findAll(@Query() query: GetProductTypesQueryDto) {
    return this.productTypesService.findAll(
      query.page,
      query.limit,
      query.search,
    );
  }

  @Get('product-types/:id')
  findOne(@Param('id') id: string) {
    return this.productTypesService.findOne(id);
  }

  @Post('admin/product-types')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  create(@Body() createProductTypeDto: CreateProductTypeDto) {
    return this.productTypesService.create(createProductTypeDto);
  }

  @Patch('admin/product-types/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  updateOne(
    @Param('id') id: string,
    @Body() updateProductTypeDto: UpdateProductTypeDto,
  ) {
    return this.productTypesService.updateOne(id, updateProductTypeDto);
  }

  @Delete('admin/product-types/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  delete(@Param('id') id: string) {
    return this.productTypesService.delete(id);
  }
}
