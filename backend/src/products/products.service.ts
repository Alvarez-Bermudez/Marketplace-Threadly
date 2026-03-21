import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createProductDto: CreateProductDto,
    files: Express.Multer.File[],
  ) {
    try {
      const imagePaths = files.map((file) => file.path);

      //Process sizes: size and stock
      if (
        createProductDto.sizes.length !== createProductDto.sizesStock.length
      ) {
        throw new BadRequestException(
          'sizes and sizesStock must have equal length',
        );
      }

      const sizes: { size: string; stock: number }[] = [];
      for (let i = 0; i < createProductDto.sizes.length; i++) {
        sizes.push({
          size: createProductDto.sizes[i],
          stock: createProductDto.sizesStock[i],
        });
      }

      //Process colors: color and stock
      if (
        createProductDto.colors.length !== createProductDto.colorsStock.length
      ) {
        throw new BadRequestException(
          'colors and colorsStock must have equal length',
        );
      }

      const colors: { color: string; stock: number }[] = [];
      for (let i = 0; i < createProductDto.sizes.length; i++) {
        colors.push({
          color: createProductDto.colors[i],
          stock: createProductDto.colorsStock[i],
        });
      }

      const product = await this.prisma.product.create({
        data: {
          name: createProductDto.name,
          slug: createProductDto.slug,
          price: createProductDto.price,
          discountPrice: createProductDto.discountPrice,
          stock: createProductDto.stock,
          details: createProductDto.details,
          description: createProductDto.description,

          brand: {
            connect: {
              id: createProductDto.brandId,
            },
          },

          category: {
            connect: {
              id: createProductDto.categoryId,
            },
          },

          type: {
            connect: {
              id: createProductDto.typeId,
            },
          },

          images: {
            create: imagePaths.map((path) => ({ url: path })),
          },

          sizes: {
            create: sizes,
          },

          colors: {
            create: colors,
          },
        },
        include: {
          images: true,
          sizes: true,
          colors: true,
        },
      });

      return product;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create product');
    }
  }
}
