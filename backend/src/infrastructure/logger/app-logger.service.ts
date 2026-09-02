import { Injectable, Logger, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppLoggerService implements LoggerService {
  private readonly logger = new Logger('AGRONEX');

  constructor(private readonly configService: ConfigService) {}

  log(message: string, context?: string) {
    this.logger.log(message, context);
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, trace, context);
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, context);
  }

  debug(message: string, context?: string) {
    const level = this.configService.get<string>('app.logLevel', 'debug');
    if (level === 'debug') {
      this.logger.debug(message, context);
    }
  }

  verbose(message: string, context?: string) {
    this.logger.verbose(message, context);
  }
}
