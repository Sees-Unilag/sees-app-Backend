import { Module } from '@nestjs/common';
import LoggerService from './logger.interface';
import { WinstonLogger } from './logger.service';

@Module({
  providers: [{ provide: LoggerService, useClass: WinstonLogger }],
  exports: [LoggerService],
})
export default class LoggerModule {}
