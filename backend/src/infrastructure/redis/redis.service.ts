import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';

import Redis from 'ioredis';
import { REDIS_CLIENT } from './redis.constants';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject(REDIS_CLIENT)
    private readonly redis: Redis,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.redis.ping();
  }

  async onModuleDestroy(): Promise<void> {
    await this.redis.quit();
  }

  async ping(): Promise<string> {
    return this.redis.ping();
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.redis.get(key);

    if (value === null) {
      return null;
    }

    return JSON.parse(value) as T;
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    const serializedValue = JSON.stringify(value);

    if (ttl !== undefined) {
      await this.redis.set(key, serializedValue, 'EX', ttl);

      return;
    }

    await this.redis.set(key, serializedValue);
  }

  async delete(key: string): Promise<void> {
    await this.redis.del(key);
  }

  async exists(key: string): Promise<boolean> {
    return (await this.redis.exists(key)) === 1;
  }
}
