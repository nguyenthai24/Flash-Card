import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => {
        const uri = configService.getOrThrow<string>('database.mongodbUri');

        console.log('MongoDB URI:', uri);

        return {
          uri,
          serverSelectionTimeoutMS: 5000,
          maxPoolSize: 10,
          minPoolSize: 2,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
