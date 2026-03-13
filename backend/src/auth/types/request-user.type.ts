import { Role } from 'generated/prisma';

export class RequestUser {
  userId: string;
  emai: string;
  role: Role;
}
