import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Role } from 'src/auth/enums/roles.enum';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async findAll(page?: number, limit?: number, search?: string) {
    try {
      const where = search
        ? {
            OR: [
              { name: { contains: search } },
              { email: { contains: search } },
            ],
            role: Role.CUSTOMER,
          }
        : { role: Role.CUSTOMER };
      const skip = limit && page ? (page - 1) * limit : undefined;
      const take = limit && page ? limit : undefined;

      const customers = await this.prisma.user.findMany({
        where,
        skip,
        take,
        orderBy: { name: 'asc' },
        include: {
          _count: {
            select: { orders: true },
          },
        },
      });

      const total = await this.prisma.user.count({ where });

      const _customers = customers.map((custom) => ({
        id: custom.id,
        name: custom.name,
        email: custom.email,
        registeredAt: custom.createdAt,
        orders: {
          _count: custom._count.orders,
        },
      }));

      return {
        data: _customers,
        meta: { total, page, lastPage: limit ? Math.ceil(total / limit) : 1 },
      };
    } catch {
      throw new InternalServerErrorException('Failed to find customers');
    }
  }

  async findOne(id: string) {
    try {
      const customer = await this.prisma.user.findUnique({
        where: { id, role: Role.CUSTOMER },
        include: {
          orders: {
            include: {
              items: {
                include: { product: true },
              },
            },
          },
        },
      });

      if (!customer) throw new NotFoundException('Customer not found!');

      const _customer = {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        registeredAt: customer.createdAt,
        orders: customer.orders.map((order) => ({
          id: order.id,
          total: order.total,
          status: order.status,
          createdAt: order.createdAt,
          items: order.items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            price: item.price,
            product: {
              id: item.product.id,
              name: item.product.name,
            },
          })),
        })),
      };
      return _customer;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to find customer');
    }
  }
}
