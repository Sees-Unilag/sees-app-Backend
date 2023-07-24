import { Injectable } from '@nestjs/common';
import { Admin, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AdminRepository {
  constructor(private readonly prisma: PrismaService) {}
}
