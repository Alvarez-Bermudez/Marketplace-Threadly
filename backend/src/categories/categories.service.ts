import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Prisma } from 'generated/prisma';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    const categories = this.prisma.category.findMany();
    return categories;
  }

  //Only admin
  create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = this.prisma.category.create({
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
  updateOne(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = this.prisma.category.update({
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
}
