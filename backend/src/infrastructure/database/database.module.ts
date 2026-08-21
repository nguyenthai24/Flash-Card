import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],

      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>('database.mongodbUri'),

        serverSelectionTimeoutMS: 5000,

        maxPoolSize: 10,

        minPoolSize: 2,
      }),
    }),
  ],
})
export class DatabaseModule {}
