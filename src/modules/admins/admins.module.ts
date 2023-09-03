import { Module } from '@nestjs/common';
import { AdminsController, AdminGuard, AdminsService, AdminRepository } from './';


@Module({
  controllers: [AdminsController],
  providers: [AdminsService, AdminRepository, AdminGuard],
  exports: [AdminGuard],
})
export class AdminsModule {}
