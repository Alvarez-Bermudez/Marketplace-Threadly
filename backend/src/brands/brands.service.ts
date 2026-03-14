import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BrandsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const brands = await this.prisma.brand.findMany();

    return brands;
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
}
