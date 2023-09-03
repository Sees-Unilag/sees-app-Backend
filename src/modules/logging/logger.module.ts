import { Module } from '@nestjs/common';
import { WinstonLogger, LoggerService } from './';

@Module({
  providers: [{ provide: LoggerService, useClass: WinstonLogger }],
  exports: [LoggerService],
})
export default class LoggerModule {}
