/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'generated/prisma';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';

@Injectable()
export class ProductTypesService {
  constructor(private prisma: PrismaService) {}

  async findAll(page?: number, limit?: number, search?: string) {
    try {
      const where = search ? { name: { contains: search } } : {};
      const skip = limit && page ? (page - 1) * limit : undefined;
      const take = limit && page ? limit : undefined;

      const productTypes = await this.prisma.productType.findMany({
        where,
        skip,
        take,
        orderBy: { name: 'asc' },
        include: {
          _count: {
            select: { products: true },
          },
        },
      });

      const total = await this.prisma.productType.count({ where });

      const _productTypes = productTypes.map((type) => ({
        id: type.id,
        name: type.name,
        productsQuantity: type._count,
      }));

      return {
        data: _productTypes,
        meta: { total, page, lastPage: limit ? Math.ceil(total / limit) : 1 },
      };
    } catch {
      throw new InternalServerErrorException('Failed to find product types');
    }
  }

  async findOne(id: string) {
    try {
      const productType = await this.prisma.productType.findUnique({
        where: { id },
      });

      if (!productType) throw new NotFoundException('Product type not found!');

      return productType;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to find product Type');
    }
  }

  //Only admin
  async create(createProductTypeDto: CreateProductTypeDto) {
    try {
      const productType = await this.prisma.productType.create({
        data: createProductTypeDto,
      });

      return productType;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('This product type name already exists!');
        }
      }
      throw new InternalServerErrorException('Failed to create product type');
    }
  }

  //Only admin
  async updateOne(id: string, updateProductTypeDto: UpdateProductTypeDto) {
    try {
      const productType = await this.prisma.productType.update({
        where: { id },
        data: updateProductTypeDto,
      });

      return productType;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('This product type name already exists!');
        }
      }
      throw new InternalServerErrorException('Failed to update product type');
    }
  }

  async delete(id: string) {
    try {
      const productType = await this.prisma.productType.delete({
        where: { id },
      });

      if (!productType) {
        throw new NotFoundException('Product type not found');
      }

      return productType;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to delete product type');
    }
  }
}
