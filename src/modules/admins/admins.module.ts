import { Module } from '@nestjs/common';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';
import { AdminRepository } from './admins.repository';
import { AdminGuard } from './admin.guard';

@Module({
  controllers: [AdminsController],
  providers: [AdminsService, AdminRepository, AdminGuard],
  exports: [AdminGuard],
})
export class AdminsModule {}
