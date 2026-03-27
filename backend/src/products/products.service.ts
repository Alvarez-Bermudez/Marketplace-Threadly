import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(page?: number, limit?: number, search?: string) {
    try {
      const where = search
        ? {
            OR: [
              { name: { contains: search } },
              { slug: { contains: search } },
            ],
          }
        : {};
      const skip = limit && page ? (page - 1) * limit : undefined;
      const take = limit && page ? limit : undefined;

      const products = await this.prisma.product.findMany({
        where,
        skip,
        take,
        orderBy: { name: 'asc' },
        include: {
          category: {
            select: {
              name: true,
            },
          },
          images: {
            select: {
              url: true,
            },
          },
          _count: {
            select: {
              orderItems: true,
            },
          },
        },
      });

      const _products = products.map((prod) => ({
        id: prod.id,
        coverImage: prod.images[0].url,
        name: prod.name,
        price: prod.price,
        discountPrice: prod.discountPrice,
        stock: prod.stock,
        orderNumber: prod._count.orderItems,
        category: prod.category.name,
        ratingAverage: prod.ratingAverage,
        reviewCount: prod.reviewCount,
      }));

      const total = await this.prisma.product.count({ where });

      return {
        data: _products,
        meta: { total, page, lastPage: limit ? Math.ceil(total / limit) : 1 },
      };
    } catch {
      throw new InternalServerErrorException('Failed to find products');
    }
  }

  async create(
    createProductDto: CreateProductDto,
    files: Express.Multer.File[],
  ) {
    try {
      const imagePaths = files.map((file) => file.path.replace('public/', ''));

      const sizes: { size: string; stock: number }[] = [];
      const colors: { color: string; stock: number }[] = [];

      //Process sizes: size and stock
      if (createProductDto.sizes && createProductDto.sizesStock) {
        if (
          createProductDto.sizes.length !== createProductDto.sizesStock.length
        ) {
          throw new BadRequestException(
            'sizes and sizesStock must have equal length',
          );
        }

        for (let i = 0; i < createProductDto.sizes.length; i++) {
          sizes.push({
            size: createProductDto.sizes[i],
            stock: createProductDto.sizesStock[i],
          });
        }
      }

      //Process colors: color and stock
      if (createProductDto.colors && createProductDto.colorsStock) {
        if (
          createProductDto.colors.length !== createProductDto.colorsStock.length
        ) {
          throw new BadRequestException(
            'colors and colorsStock must have equal length',
          );
        }

        for (let i = 0; i < createProductDto.colors.length; i++) {
          colors.push({
            color: createProductDto.colors[i],
            stock: createProductDto.colorsStock[i],
          });
        }
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
        },
        include: {
          images: true,
          sizes: true,
        },
      });

      //Connect brand if exists
      if (createProductDto.brandId) {
        await this.prisma.product.update({
          where: { slug: createProductDto.slug },
          data: {
            brand: {
              connect: {
                id: createProductDto.brandId,
              },
            },
          },
        });
      }

      return product;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.log(error);
      throw new InternalServerErrorException('Failed to create product');
    }
  }

  async delete(id: string) {
    try {
      const product = await this.prisma.product.delete({ where: { id } });

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      return product;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to delete product');
    }
  }
}
