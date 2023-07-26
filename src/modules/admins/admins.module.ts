import { Module } from '@nestjs/common';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';
import { AdminRepository } from './admins.repository';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AdminsController],
  providers: [AdminsService, AdminRepository],
})
export class AdminsModule {}
