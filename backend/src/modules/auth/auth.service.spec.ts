import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { createHash } from 'node:crypto';

import { UserRole } from '@/common/shares/enums';
import { RedisService } from '@/infrastructure/redis/redis.service';
import { AuthEmailService } from './auth-email.service';
import { AuthService } from './auth.service';
import {
  AuthUserRecord,
  IAuthRepository,
} from './interfaces/auth-repository.interface';

describe('AuthService', () => {
  let service: AuthService;
  let repository: jest.Mocked<IAuthRepository>;
  let user: AuthUserRecord;
  let verificationToken: string | undefined;
  let sendVerificationEmail: jest.Mock;
  let verifyJwt: jest.Mock;

  beforeEach(() => {
    user = {
      id: 'user-id',
      email: 'learner@example.com',
      username: 'learner',
      first_name: 'learner',
      last_name: 'User',
      role: UserRole.USER,
      refresh_sessions: [],
      failed_login_attempts: 0,
      token_version: 0,
      oauth_accounts: [],
    };
    verificationToken = undefined;

    repository = {
      findById: jest.fn().mockImplementation(() => Promise.resolve(user)),
      findByEmail: jest.fn().mockResolvedValue(null),
      findByUsername: jest.fn().mockResolvedValue(null),
      findByOAuthAccount: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockImplementation((data) => {
        user = { ...user, ...data };
        return Promise.resolve(user);
      }),
      update: jest.fn().mockImplementation((_id, data) => {
        user = { ...user, ...data };
        return Promise.resolve(user);
      }),
      consumeVerificationToken: jest
        .fn()
        .mockImplementation((hash, verifiedAt) => {
          if (
            user.verification_token_hash !== hash ||
            !user.verification_token_expires_at ||
            user.verification_token_expires_at <= verifiedAt ||
            user.email_verified_at
          ) {
            return Promise.resolve(false);
          }
          user.email_verified_at = verifiedAt;
          user.verification_token_hash = undefined;
          user.verification_token_expires_at = undefined;
          return Promise.resolve(true);
        }),
      consumePasswordResetToken: jest
        .fn()
        .mockImplementation((hash, password, consumedAt) => {
          if (
            user.password_reset_token_hash !== hash ||
            !user.password_reset_token_expires_at ||
            user.password_reset_token_expires_at <= consumedAt
          ) {
            return Promise.resolve(false);
          }
          user.password = password;
          user.password_reset_token_hash = undefined;
          user.password_reset_token_expires_at = undefined;
          user.refresh_sessions = [];
          user.failed_login_attempts = 0;
          user.locked_until = null;
          user.token_version += 1;
          return Promise.resolve(true);
        }),
    };
    sendVerificationEmail = jest.fn().mockImplementation((_email, token) => {
      verificationToken = token;
      return Promise.resolve();
    });

    const config = new ConfigService({
      jwt: { refreshSecret: 'test-refresh-secret-that-is-long-enough' },
      app: { frontendUrl: 'http://localhost:3010' },
    });
    verifyJwt = jest.fn();
    const jwt = {
      signAsync: jest.fn().mockResolvedValue('signed-token'),
      verifyAsync: verifyJwt,
    } as unknown as JwtService;
    const redis = {
      exists: jest.fn().mockResolvedValue(false),
      set: jest.fn().mockResolvedValue(undefined),
    } as unknown as RedisService;
    const email = {
      sendVerificationEmail,
      sendPasswordResetEmail: jest.fn(),
    } as unknown as AuthEmailService;
    service = new AuthService(repository, jwt, config, redis, email);
  });

  it('creates a password hash and stores only a hashed verification token', async () => {
    await service.register({
      email: 'Learner@example.com',
      password: 'strong-pass-123',
      re_password: 'strong-pass-123',
    });

    expect(user.email).toBe('learner@example.com');
    expect(await argon2.verify(user.password!, 'strong-pass-123')).toBe(true);
    expect(user.verification_token_hash).not.toBe(verificationToken);
    expect(sendVerificationEmail).toHaveBeenCalledWith(
      'learner@example.com',
      verificationToken,
    );
  });

  it('rejects mismatched registration passwords before creating a user', async () => {
    await expect(
      service.register({
        email: 'learner@example.com',
        password: 'strong-pass-123',
        re_password: 'different-pass',
      }),
    ).rejects.toThrow('Mật khẩu nhập lại chưa khớp.');

    expect(repository.create.mock.calls).toHaveLength(0);
  });

  it('consumes a valid email verification token once', async () => {
    await service.register({
      email: 'learner@example.com',
      password: 'strong-pass-123',
      re_password: 'strong-pass-123',
    });
    await service.verifyEmail(verificationToken!);

    expect(user.email_verified_at).toBeInstanceOf(Date);
    expect(user.verification_token_hash).toBeUndefined();
    await expect(service.verifyEmail(verificationToken!)).rejects.toThrow(
      'Liên kết xác minh không hợp lệ hoặc đã hết hạn.',
    );
  });

  it('creates a server-side session for verified users and honors remember me', async () => {
    user.email_verified_at = new Date();
    user.password = await argon2.hash('strong-pass-123');
    repository.findByEmail.mockResolvedValue(user);

    const result = await service.login(
      'learner@example.com',
      'strong-pass-123',
      true,
    );

    expect(result.refreshCookieMaxAge).toBe(30 * 24 * 60 * 60 * 1000);
    expect(user.refresh_sessions).toHaveLength(1);
    expect(user.refresh_sessions[0].rememberMe).toBe(true);
    expect(user.refresh_sessions[0].tokenHash).not.toBe(result.refreshToken);
  });

  it('revokes all refresh sessions after a valid password reset', async () => {
    const token = 'one-time-password-reset-token';
    user.password_reset_token_hash = createHash('sha256')
      .update(token)
      .digest('hex');
    user.password_reset_token_expires_at = new Date(Date.now() + 60_000);
    user.refresh_sessions = [
      {
        id: 'existing-session',
        tokenHash: 'stored-hash',
        expiresAt: new Date(Date.now() + 60_000),
      },
    ];

    await service.resetPassword(token, 'new-strong-pass', 'new-strong-pass');

    expect(await argon2.verify(user.password!, 'new-strong-pass')).toBe(true);
    expect(user.refresh_sessions).toEqual([]);
    expect(user.token_version).toBe(1);
    expect(user.failed_login_attempts).toBe(0);
    expect(user.password_reset_token_hash).toBeUndefined();
  });

  it('rotates refresh tokens and rejects replay of the consumed token', async () => {
    const oldToken = 'previous-refresh-token';
    user.refresh_sessions = [
      {
        id: 'session-id',
        tokenHash: createHash('sha256').update(oldToken).digest('hex'),
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
        rememberMe: true,
      },
    ];
    verifyJwt.mockResolvedValue({
      sub: user.id,
      sid: 'session-id',
      ver: 0,
      type: 'refresh',
      iat: 100,
      exp: 200,
    });

    const result = await service.refresh(oldToken);

    expect(result.refreshToken).toBe('signed-token');
    expect(result.refreshCookieMaxAge).toBeGreaterThan(0);
    expect(user.refresh_sessions[0].tokenHash).toBe(
      createHash('sha256').update('signed-token').digest('hex'),
    );
    expect(user.refresh_sessions[0].tokenHash).not.toBe(
      createHash('sha256').update(oldToken).digest('hex'),
    );
    await expect(service.refresh(oldToken)).rejects.toThrow(
      'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
    );
  });
});
