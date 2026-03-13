import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Controller('')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get('brands')
  findAll() {
    return this.brandsService.findAll();
  }

  @Post('admin/brands')
  @UseInterceptors(
    FileInterceptor('photoData', {
      // storage: diskStorage({
      //   destination: './public/images/brands',
      //   filename: (req, file, callback) => {
      //     const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
      //     callback(null, uniqueName + extname(file.originalname));
      //   },
      // }),
    }),
  )
  async createBrand(
    @Body('name') name: string,
    // @Body('photoDatas') photo: any,
    @UploadedFile() photoData: Express.Multer.File,
  ) {
    console.log(JSON.stringify(photoData, null, 2));
    return;
    // return this.brandsService.createBrand(name, file.filename);
  }
}
