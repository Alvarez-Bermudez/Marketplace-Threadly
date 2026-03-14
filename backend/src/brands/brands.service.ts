import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BrandsService {
  constructor(private prisma: PrismaService) {}

  async findAll(page?: number, limit?: number, brand?: string) {
    const where = brand ? { name: { contains: brand } } : {};
    const skip = limit && page ? (page - 1) * limit : undefined;
    const take = limit && page ? limit : undefined;

    const brands = await this.prisma.brand.findMany({
      where,
      skip,
      take,
      orderBy: { name: 'asc' },
    });

    const total = await this.prisma.brand.count({ where });

    return {
      data: brands,
      meta: { total, page, lastPage: limit ? Math.ceil(total / limit) : 1 },
    };
  }

  async findOne(id: string) {
    try {
      const brand = await this.prisma.brand.findUnique({ where: { id } });

      if (!brand) {
        throw new NotFoundException('Brand not found');
      }

      return brand;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to find brand');
    }
  }

  async createBrand(name: string, filename: string) {
    const photoUrl = `/public/images/brands/${filename}`;

    try {
      const brand = this.prisma.brand.create({
        data: {
          name,
          imageUrl: photoUrl,
        },
      });

      return brand;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('This brand already exists!');
        }
      }
      throw new InternalServerErrorException('Failed to add brand');
    }
  }

  async updateOne(id: string, name?: string, filename?: string) {
    const photoUrl = filename ? `/public/images/brands/${filename}` : undefined;

    try {
      const brand = this.prisma.brand.update({
        where: { id },
        data: {
          name,
          imageUrl: photoUrl,
        },
      });

      return brand;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('This brand already exists!');
        }
        throw new InternalServerErrorException('Failed to update brand');
      }
    }
  }
}
