import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BrandsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const brands = await this.prisma.brand.findMany();

    return brands;
  }

  async createBrand(name: string, filename: string) {
    const photoUrl = `/public/images/brand/${filename}`;

    return this.prisma.brand.create({
      data: {
        name,
        imageUrl: photoUrl,
      },
    });
  }
}
