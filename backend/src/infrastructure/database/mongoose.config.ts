import { ConfigService } from '@nestjs/config';

export const mongooseConfig = {
  inject: [ConfigService],

  useFactory: (configService: ConfigService) => ({
    uri: configService.getOrThrow<string>('database.mongodbUri'),

    // Mongoose options
    autoIndex: true,
  }),
};
