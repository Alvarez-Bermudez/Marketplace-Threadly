import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Prisma } from 'generated/prisma';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(page?: number, limit?: number, search?: string) {
    try {
      const where = search ? { name: { contains: search } } : {};
      const skip = limit && page ? (page - 1) * limit : undefined;
      const take = limit && page ? limit : undefined;

      const categories = await this.prisma.category.findMany({
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

      const total = await this.prisma.category.count({ where });

      const _categories = categories.map((categ) => ({
        id: categ.id,
        name: categ.name,
        productsQuantity: categ._count,
      }));

      return {
        data: _categories,
        meta: { total, page, lastPage: limit ? Math.ceil(total / limit) : 1 },
      };
    } catch {
      throw new InternalServerErrorException('Failed to find categories');
    }
  }

  async findOne(id: string) {
    try {
      const category = await this.prisma.category.findUnique({ where: { id } });

      if (!category) throw new NotFoundException('Category not found!');

      return category;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to find category');
    }
  }

  //Only admin
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.prisma.category.create({
        data: createCategoryDto,
      });

      return category;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('This category name already exists!');
        }
      }
      throw new InternalServerErrorException('Failed to create category');
    }
  }

  //Only admin
  async updateOne(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.prisma.category.update({
        where: { id },
        data: updateCategoryDto,
      });

      return category;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('This category name already exists!');
        }
      }
      throw new InternalServerErrorException('Failed to update category');
    }
  }

  async delete(id: string) {
    try {
      const category = await this.prisma.category.delete({ where: { id } });

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      return category;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to delete category');
    }
  }
}
