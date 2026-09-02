import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Public } from '@/common/decorators/public.decorator';
import { HealthService } from './health.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Verifica saúde da API, PostgreSQL e Redis' })
  async check(@Res({ passthrough: true }) res: Response) {
    const result = await this.healthService.check();
    const httpStatus =
      result.status === 'ok'
        ? HttpStatus.OK
        : result.status === 'degraded'
          ? HttpStatus.OK
          : HttpStatus.SERVICE_UNAVAILABLE;

    res.status(httpStatus);
    return result;
  }
}
