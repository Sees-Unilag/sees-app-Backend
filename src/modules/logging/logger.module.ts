import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger.interface';
import { WinstonLogger } from './logger.service';

@Global()
@Module({
  providers: [{ provide: LoggerService, useClass: WinstonLogger }],
  exports: [LoggerService],
})
export default class LoggerModule {}
