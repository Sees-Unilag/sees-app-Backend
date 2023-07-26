import { Injectable } from '@nestjs/common';

@Injectable()
export default abstract class LoggerService {
  warn(_message: string): void {
    console.warn(`WARN: ${_message}`);
  }

  error(_message: string): void {
    console.error(`ERROR: ${_message}`);
  }

  info(_message: string): void {
    console.log(`INFO: ${_message}`);
  }

  http(_message: string): void {
    console.log(`HTTP: ${_message}`);
  }

  debug(_message: string): void {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`DEBUG: ${_message}`);
    }
  }
}
