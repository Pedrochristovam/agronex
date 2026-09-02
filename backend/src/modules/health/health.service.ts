import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infrastructure/database/prisma.service';
import { RedisService } from '@/infrastructure/redis/redis.service';

export interface HealthCheckResult {
  status: 'ok' | 'degraded' | 'error';
  timestamp: string;
  uptime: number;
  services: {
    api: { status: 'ok' };
    postgres: { status: 'ok' | 'error'; latencyMs?: number };
    redis: { status: 'ok' | 'error'; latencyMs?: number };
  };
}

@Injectable()
export class HealthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  async check(): Promise<HealthCheckResult> {
    const postgresStart = Date.now();
    const postgresOk = await this.prisma.isHealthy();
    const postgresLatency = Date.now() - postgresStart;

    const redisStart = Date.now();
    const redisOk = await this.redis.isHealthy();
    const redisLatency = Date.now() - redisStart;

    const allOk = postgresOk && redisOk;

    return {
      status: allOk ? 'ok' : postgresOk || redisOk ? 'degraded' : 'error',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      services: {
        api: { status: 'ok' },
        postgres: {
          status: postgresOk ? 'ok' : 'error',
          latencyMs: postgresLatency,
        },
        redis: {
          status: redisOk ? 'ok' : 'error',
          latencyMs: redisLatency,
        },
      },
    };
  }
}
