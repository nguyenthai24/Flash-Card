import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';

import { AUTH_REPOSITORY } from '@/common/constants/repository.constant';
import { User, UserSchema } from '../users/schemas/user.schemas';
import { AuthController } from './auth.controller';
import { AuthEmailService } from './auth-email.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthRepository } from './repositories/auth.repository';

@Module({
  imports: [
    ConfigModule,
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 10 }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const expiresIn = config.get<string>('jwt.expiresIn') ?? '15m';
        const match = /^(\d+)(s|m|h|d)$/.exec(expiresIn);
        const value = Number(match?.[1] ?? 15);
        const unit = match?.[2] ?? 'm';
        const seconds =
          value *
          (unit === 'd'
            ? 86_400
            : unit === 'h'
              ? 3_600
              : unit === 'm'
                ? 60
                : 1);
        return {
          secret: config.getOrThrow<string>('jwt.secret'),
          signOptions: { expiresIn: seconds },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthEmailService,
    AuthRepository,
    JwtAuthGuard,
    { provide: AUTH_REPOSITORY, useExisting: AuthRepository },
  ],
  exports: [AUTH_REPOSITORY, AuthService, JwtAuthGuard],
})
export class AuthModule {}
