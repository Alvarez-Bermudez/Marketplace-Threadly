import { Injectable } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  // getHello(): string {
  //   return 'Hello World!';
  // }

  async putName(): Promise<string> {
    await this.prisma.user.deleteMany();
    return 'Cleared users';
  }
}
