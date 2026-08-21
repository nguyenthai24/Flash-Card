import { Global, Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';

import Redis from 'ioredis';

import { REDIS_CLIENT } from './redis.constants';
import { RedisService } from './redis.service';

@Global()
@Module({
  imports: [ConfigModule],

  providers: [
    {
      provide: REDIS_CLIENT,

      inject: [ConfigService],

      useFactory: (configService: ConfigService) => {
        return new Redis({
          host: configService.getOrThrow<string>('redis.host'),

          port: configService.getOrThrow<number>('redis.port'),

          password: configService.get<string>('redis.password'),

          db: configService.getOrThrow<number>('redis.db'),

          maxRetriesPerRequest: null,
        });
      },
    },

    RedisService,
  ],

  exports: [REDIS_CLIENT, RedisService],
})
export class RedisModule {}
