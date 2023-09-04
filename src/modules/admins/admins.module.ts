import { Module } from '@nestjs/common';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';
import { AdminRepository } from './admins.repository';
import { AdminGuard } from './admin.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AdminsController],
  providers: [AdminsService, AdminRepository, AdminGuard, JwtService],
  exports: [AdminGuard],
})
export class AdminsModule {}
