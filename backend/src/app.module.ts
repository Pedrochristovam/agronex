import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import {
  appConfig,
  databaseConfig,
  jwtConfig,
  redisConfig,
  throttleConfig,
  validate,
} from '@/common/config';
import { GlobalExceptionFilter } from '@/common/filters/global-exception.filter';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { TransformInterceptor } from '@/common/interceptors/transform.interceptor';
import { PrismaModule } from '@/infrastructure/database/prisma.module';
import { LoggerModule } from '@/infrastructure/logger/logger.module';
import { RedisModule } from '@/infrastructure/redis/redis.module';
import { AdminModule } from '@/modules/admin/admin.module';
import { AdvancesModule } from '@/modules/advances/advances.module';
import { AnalyticsModule } from '@/modules/analytics/analytics.module';
import { AuctionsModule } from '@/modules/auctions/auctions.module';
import { AuditModule } from '@/modules/audit/audit.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { BidsModule } from '@/modules/bids/bids.module';
import { BuyersModule } from '@/modules/buyers/buyers.module';
import { CategoriesModule } from '@/modules/categories/categories.module';
import { CertificatesModule } from '@/modules/certificates/certificates.module';
import { DeliveriesModule } from '@/modules/deliveries/deliveries.module';
import { DeliveryPartnersModule } from '@/modules/delivery-partners/delivery-partners.module';
import { DocumentsModule } from '@/modules/documents/documents.module';
import { HealthModule } from '@/modules/health/health.module';
import { LotsModule } from '@/modules/lots/lots.module';
import { NotificationsModule } from '@/modules/notifications/notifications.module';
import { OrdersModule } from '@/modules/orders/orders.module';
import { PaymentsModule } from '@/modules/payments/payments.module';
import { ProducersModule } from '@/modules/producers/producers.module';
import { ProductsModule } from '@/modules/products/products.module';
import { RatingsModule } from '@/modules/ratings/ratings.module';
import { ReputationModule } from '@/modules/reputation/reputation.module';
import { RolesModule } from '@/modules/roles/roles.module';
import { RoutesModule } from '@/modules/routes/routes.module';
import { SplitPaymentsModule } from '@/modules/split-payments/split-payments.module';
import { TrackingModule } from '@/modules/tracking/tracking.module';
import { UsersModule } from '@/modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, redisConfig, jwtConfig, throttleConfig],
      validate,
      envFilePath: ['.env'],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: parseInt(process.env.THROTTLE_TTL ?? '60000', 10),
        limit: parseInt(process.env.THROTTLE_LIMIT ?? '100', 10),
      },
    ]),
    PrismaModule,
    RedisModule,
    LoggerModule,
    HealthModule,
    AuthModule,
    UsersModule,
    RolesModule,
    ProducersModule,
    BuyersModule,
    DeliveryPartnersModule,
    ProductsModule,
    CategoriesModule,
    LotsModule,
    AuctionsModule,
    BidsModule,
    OrdersModule,
    PaymentsModule,
    SplitPaymentsModule,
    AdvancesModule,
    RoutesModule,
    DeliveriesModule,
    TrackingModule,
    DocumentsModule,
    CertificatesModule,
    ReputationModule,
    RatingsModule,
    NotificationsModule,
    AnalyticsModule,
    AdminModule,
    AuditModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: GlobalExceptionFilter },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
  ],
})
export class AppModule {}
