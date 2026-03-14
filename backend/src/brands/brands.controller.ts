import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { GetBrandsQueryDto } from './dto/get-brands-query.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';

@Controller('')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get('brands')
  findAll(@Query() query: GetBrandsQueryDto) {
    return this.brandsService.findAll(query.page, query.limit, query.brand);
  }

  @Get('brands/:id')
  findOne(@Param('id') id: string) {
    return this.brandsService.findOne(id);
  }

  @Post('admin/brands')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(
    FileInterceptor('photoData', {
      storage: diskStorage({
        destination: './public/images/brands',
        filename: (req, file, callback) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, uniqueName + extname(file.originalname));
        },
      }),
    }),
  )
  async createBrand(
    @Body('name') name: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.brandsService.createBrand(name, file.filename);
  }

  @Patch('admin/brands/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(
    FileInterceptor('photoData', {
      storage: diskStorage({
        destination: './public/images/brands',
        filename: (req, file, callback) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, uniqueName + extname(file.originalname));
        },
      }),
    }),
  )
  async updateOne(
    @Param('id') id: string,
    @Body('name') name?: string,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const _file = file ? file.filename : undefined;

    return this.brandsService.updateOne(id, name, _file);
  }

  @Delete('admin/brands/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  async deleteOne(@Param('id') id: string) {
    return this.brandsService.delete(id);
  }
}
