import { Role } from 'generated/prisma';

export class Payload {
  sub: string;
  email: string;
  role: Role;
}
