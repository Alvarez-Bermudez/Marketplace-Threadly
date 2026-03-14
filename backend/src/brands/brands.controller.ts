import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { GetBrandsQueryDto } from './dto/get-brands-query.dto';

@Controller('')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get('brands')
  findAll(@Query() query: GetBrandsQueryDto) {
    return this.brandsService.findAll(query.page, query.limit, query.brand);
  }

  @Post('admin/brands')
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
}
