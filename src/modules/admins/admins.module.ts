import { Module } from '@nestjs/common';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';
import { AdminRepository } from './admins.repository';
import { PrismaModule } from 'src/database/prisma.module';
import { AdminGuard } from './admin.guard';

@Module({
  imports: [PrismaModule],
  controllers: [AdminsController],
  providers: [AdminsService, AdminRepository, AdminGuard],
  exports:[AdminGuard]
})
export class AdminsModule {}
