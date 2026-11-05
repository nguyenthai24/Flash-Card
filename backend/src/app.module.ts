import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import configuration from '@/config/configuration';
import { envValidationSchema } from './config/env.validation';
import { DatabaseModule } from './infrastructure/database/database.module';
import { RedisModule } from './infrastructure/redis/redis.module';
import { HealthModule } from './infrastructure/health/health.module';
import { OrderModule } from './modules/orders/order.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development',
      load: [configuration],
      validationSchema: envValidationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),
    DatabaseModule,
    RedisModule,
    HealthModule,
    OrderModule,
    UserModule,
    // HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
