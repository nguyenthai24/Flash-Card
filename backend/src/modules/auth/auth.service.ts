import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { createHash, randomBytes, randomInt, randomUUID } from 'node:crypto';

import { ErrorCode } from '@/common/constants/error-code.constant';
import { AUTH_REPOSITORY } from '@/common/constants/repository.constant';
import { UserRole } from '@/common/shares/enums';
import { RedisService } from '@/infrastructure/redis/redis.service';
import {
  AuthUserRecord,
  IAuthRepository,
  OAuthAccountRecord,
} from './interfaces/auth-repository.interface';
import { AuthEmailService } from './auth-email.service';
import { RegisterDto } from './dto/request/register.dto';
import { generateOTP } from '@/utils';
import { FIVE_MINUTE, REDIS_KEY } from '@/infrastructure/redis/redis.constants';
import { MailService } from '../mail/mail.service';

const VERIFICATION_CODE_TTL_MS = 10 * 60 * 1000;
const RESET_TOKEN_TTL_MS = 30 * 60 * 1000;
const RESEND_COOLDOWN_SECONDS = 45;
const LOGIN_LOCK_THRESHOLD = 5;
const LOGIN_LOCK_MS = 15 * 60 * 1000;

type OAuthProvider = OAuthAccountRecord['provider'];
type AccessClaims = {
  sub: string;
  email: string;
  role: UserRole;
  sid: string;
  ver: number;
};
type RefreshClaims = { sub: string; sid: string; ver: number; type: 'refresh' };
type OAuthProfile = {
  id: string;
  email: string;
  name: string;
  avatar?: string;
};

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly redis: RedisService,
    private readonly emailService: AuthEmailService,
    private readonly mailService: MailService,
  ) {}

  async register(dto: RegisterDto): Promise<any> {
    const email = dto.email?.trim();

    console.log(111111111, email);

    if (!email) {
      throw new BadRequestException({
        message: 'Vui lòng cung cấp email để nhận mã xác minh.',
      });
    }

    if (dto.password !== dto.re_password) {
      throw new BadRequestException({
        message: 'Mật khẩu nhập lại chưa khớp.',
      });
    }

    const userExists = await this.authRepository.findByEmail(email);

    if (userExists) {
      console.log('234');
      throw new ConflictException({
        message: 'Người dùng này đã tồn tại.',
      });
    }

    const otp = generateOTP();

    const verificationKey = REDIS_KEY.VERIFICATION(email.trim().toLowerCase());
    await this.redis.set(verificationKey, otp, FIVE_MINUTE);

    try {
      const user = await this.authRepository.create({
        email: email,
        password: await argon2.hash(dto.password),
      });
      console.log('User created:', user);
      // Gửi mã OTP đến email
      await this.mailService.sendUserConfirmation(user, otp);

      return {
        data: user ?? null,
        message:
          'Tài khoản đã được tạo. Vui lòng nhập mã OTP đã gửi đến email.',
      };

      // Gửi mã OTP đến email hoặc số điện thoại
    } catch (error) {
      console.log('Error creating user:', error);
      throw error;
      // this.logger.error('Error creating user', error);
      // throw new InternalServerErrorException({
      //   error_code: ErrorCode.INTERNAL_SERVER_ERROR,
      //   message: 'Đã xảy ra lỗi khi tạo tài khoản.',
      // });
    }
  }

  async verifyEmail(
    emailInput: string,
    code: string,
  ): Promise<{ data: null; message: string }> {
    const consumed = await this.authRepository.consumeVerificationToken(
      emailInput.trim().toLowerCase(),
      this.hash(code),
      new Date(),
    );
    if (!consumed) {
      throw new BadRequestException({
        error_code: ErrorCode.INVALID_VERIFICATION_CODE,
        message: 'Mã OTP không hợp lệ hoặc đã hết hạn.',
      });
    }
    return { data: null, message: 'Email đã được xác minh thành công.' };
  }

  async resendVerification(
    emailInput: string,
  ): Promise<{ data: null; message: string }> {
    const email = emailInput.trim().toLowerCase();
    const response = {
      data: null,
      message: 'Nếu tài khoản cần xác minh, mã OTP sẽ được gửi đến email.',
    };
    const user = await this.authRepository.findByEmail(email);
    if (!user || user.email_verified_at) return response;

    const cooldownKey = `auth:verification-cooldown:${this.hash(email)}`;
    if (await this.redis.exists(cooldownKey)) return response;

    const token = this.createVerificationCode();
    await this.authRepository.update(user.id, {
      verification_token_hash: this.hash(token),
      verification_token_expires_at: new Date(
        Date.now() + VERIFICATION_CODE_TTL_MS,
      ),
    });
    await this.redis.set(cooldownKey, true, RESEND_COOLDOWN_SECONDS);
    try {
      await this.emailService.sendVerificationCode(email, token);
    } catch (error) {
      if (!(error instanceof ServiceUnavailableException)) throw error;
      this.logger.error('Verification code email resend failed.');
    }
    return response;
  }

  async login(
    emailInput: string,
    password: string,
    rememberMe: boolean,
  ): Promise<{
    data: ReturnType<AuthService['toPublicUser']>;
    accessToken: string;
    refreshToken: string;
    refreshCookieMaxAge?: number;
  }> {
    const user = await this.authRepository.findByEmail(
      emailInput.trim().toLowerCase(),
    );
    const now = Date.now();
    if (user?.locked_until && user.locked_until.getTime() > now) {
      throw this.authError(
        'ACCOUNT_TEMPORARILY_LOCKED',
        'Tài khoản tạm khóa do đăng nhập sai nhiều lần. Vui lòng thử lại sau.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    let passwordMatches = false;
    if (user?.password) {
      try {
        passwordMatches = await argon2.verify(user.password, password);
      } catch {
        passwordMatches = false;
      }
    }

    if (!user || !passwordMatches) {
      if (user) {
        const attempts = user.failed_login_attempts + 1;
        await this.authRepository.update(user.id, {
          failed_login_attempts:
            attempts >= LOGIN_LOCK_THRESHOLD ? 0 : attempts,
          locked_until:
            attempts >= LOGIN_LOCK_THRESHOLD
              ? new Date(now + LOGIN_LOCK_MS)
              : undefined,
        });
      }
      throw this.authError(
        'INVALID_CREDENTIALS',
        'Email hoặc mật khẩu chưa chính xác.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!user.email_verified_at) {
      throw new ForbiddenException({
        code: 'EMAIL_NOT_VERIFIED',
        message: 'Vui lòng xác minh email trước khi đăng nhập.',
      });
    }

    const sid = randomUUID();
    const refreshExpiresIn = rememberMe ? '30d' : '7d';
    const refreshExpiry = new Date(
      now + (rememberMe ? 30 : 7) * 24 * 60 * 60 * 1000,
    );
    const refreshToken = await this.jwtService.signAsync(
      { sub: user.id, sid, ver: user.token_version, type: 'refresh' },
      { secret: this.refreshSecret(), expiresIn: refreshExpiresIn },
    );
    await this.authRepository.update(user.id, {
      failed_login_attempts: 0,
      locked_until: undefined,
      refresh_sessions: [
        ...user.refresh_sessions.filter(
          (session) => session.expiresAt.getTime() > now,
        ),
        {
          id: sid,
          tokenHash: this.hash(refreshToken),
          expiresAt: refreshExpiry,
          rememberMe,
        },
      ],
    });

    const accessToken = await this.signAccessToken(user, sid);
    return {
      data: this.toPublicUser(user),
      accessToken,
      refreshToken,
      refreshCookieMaxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : undefined,
    };
  }

  async refresh(rawToken: string | undefined): Promise<{
    data: ReturnType<AuthService['toPublicUser']>;
    accessToken: string;
    refreshToken: string;
    refreshCookieMaxAge?: number;
  }> {
    if (!rawToken) throw this.invalidRefreshToken();
    let claims: RefreshClaims;
    try {
      claims = await this.jwtService.verifyAsync<RefreshClaims>(rawToken, {
        secret: this.refreshSecret(),
      });
    } catch {
      throw this.invalidRefreshToken();
    }
    if (claims.type !== 'refresh') throw this.invalidRefreshToken();

    const user = await this.authRepository.findById(claims.sub);
    const session = user?.refresh_sessions.find(
      (item) =>
        item.id === claims.sid && item.tokenHash === this.hash(rawToken),
    );
    if (
      !user ||
      user.token_version !== claims.ver ||
      !session ||
      session.expiresAt.getTime() <= Date.now()
    ) {
      throw this.invalidRefreshToken();
    }

    const refreshToken = await this.jwtService.signAsync(
      {
        sub: claims.sub,
        sid: claims.sid,
        ver: claims.ver,
        type: 'refresh',
      },
      {
        secret: this.refreshSecret(),
        expiresIn: Math.max(
          1,
          Math.floor((session.expiresAt.getTime() - Date.now()) / 1000),
        ),
      },
    );
    const sessions = user.refresh_sessions.map((item) =>
      item.id === claims.sid
        ? { ...item, tokenHash: this.hash(refreshToken) }
        : item,
    );
    await this.authRepository.update(user.id, { refresh_sessions: sessions });
    const accessToken = await this.signAccessToken(user, claims.sid);
    return {
      data: this.toPublicUser(user),
      accessToken,
      refreshToken,
      refreshCookieMaxAge: session.rememberMe
        ? Math.max(0, session.expiresAt.getTime() - Date.now())
        : undefined,
    };
  }

  async logout(
    userId: string,
    rawRefreshToken?: string,
  ): Promise<{ data: null; message: string }> {
    if (rawRefreshToken) {
      let claims: RefreshClaims | undefined;
      try {
        claims = await this.jwtService.verifyAsync<RefreshClaims>(
          rawRefreshToken,
          { secret: this.refreshSecret() },
        );
      } catch {
        claims = undefined;
      }
      const verifiedClaims = claims;
      if (verifiedClaims?.sub === userId && verifiedClaims.type === 'refresh') {
        const user = await this.authRepository.findById(userId);
        await this.authRepository.update(userId, {
          refresh_sessions:
            user?.refresh_sessions.filter(
              (session) =>
                session.id !== verifiedClaims.sid ||
                session.tokenHash !== this.hash(rawRefreshToken),
            ) ?? [],
        });
      }
    }
    return { data: null, message: 'Đã đăng xuất.' };
  }

  async requestPasswordReset(
    emailInput: string,
  ): Promise<{ data: null; message: string }> {
    const user = await this.authRepository.findByEmail(
      emailInput.trim().toLowerCase(),
    );
    if (user) {
      const token = this.createOneTimeToken();
      await this.authRepository.update(user.id, {
        password_reset_token_hash: this.hash(token),
        password_reset_token_expires_at: new Date(
          Date.now() + RESET_TOKEN_TTL_MS,
        ),
      });
      try {
        await this.emailService.sendPasswordResetEmail(user.email, token);
      } catch (error) {
        if (!(error instanceof ServiceUnavailableException)) throw error;
        this.logger.error('Password reset email delivery failed.');
      }
    }
    return {
      data: null,
      message:
        'Nếu email có tài khoản, hướng dẫn đặt lại mật khẩu sẽ được gửi.',
    };
  }

  async resetPassword(
    token: string,
    password: string,
    rePassword: string,
  ): Promise<{ data: null; message: string }> {
    if (password !== rePassword) {
      throw this.authError(
        'PASSWORDS_DO_NOT_MATCH',
        'Mật khẩu nhập lại chưa khớp.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const consumed = await this.authRepository.consumePasswordResetToken(
      this.hash(token),
      await argon2.hash(password),
      new Date(),
    );
    if (!consumed) {
      throw this.authError(
        'INVALID_OR_EXPIRED_TOKEN',
        'Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return { data: null, message: 'Mật khẩu đã được cập nhật.' };
  }

  async getProfile(
    userId: string,
  ): Promise<{ data: ReturnType<AuthService['toPublicUser']> }> {
    const user = await this.authRepository.findById(userId);
    if (!user) throw new UnauthorizedException();
    return { data: this.toPublicUser(user) };
  }

  async validateAccessClaims(
    claims: AccessClaims,
  ): Promise<AuthUserRecord | null> {
    const user = await this.authRepository.findById(claims.sub);
    if (
      !user ||
      user.token_version !== claims.ver ||
      !user.refresh_sessions.some(
        (session) =>
          session.id === claims.sid && session.expiresAt.getTime() > Date.now(),
      )
    ) {
      return null;
    }
    return user;
  }

  createOAuthState(): string {
    return this.createOneTimeToken();
  }

  getOAuthAuthorizationUrl(provider: OAuthProvider, state: string): string {
    const clientId = this.oauthConfig(provider).clientId;
    const redirectUri = this.oauthRedirectUri(provider);
    const callback = encodeURIComponent(redirectUri);
    const encodedState = encodeURIComponent(state);
    const scopes: Record<OAuthProvider, string> = {
      google: 'openid email profile',
      facebook: 'email public_profile',
      github: 'read:user user:email',
    };
    const scope = encodeURIComponent(scopes[provider]);
    const urls: Record<OAuthProvider, string> = {
      google: `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${encodeURIComponent(clientId)}&redirect_uri=${callback}&scope=${scope}&state=${encodedState}`,
      facebook: `https://www.facebook.com/v20.0/dialog/oauth?response_type=code&client_id=${encodeURIComponent(clientId)}&redirect_uri=${callback}&scope=${scope}&state=${encodedState}`,
      github: `https://github.com/login/oauth/authorize?response_type=code&client_id=${encodeURIComponent(clientId)}&redirect_uri=${callback}&scope=${scope}&state=${encodedState}`,
    };
    return urls[provider];
  }

  getConfiguredOAuthProviders(): OAuthProvider[] {
    const providers: OAuthProvider[] = ['google', 'facebook', 'github'];
    return providers.filter((provider) => {
      const { clientId, clientSecret } = this.oauthConfigValues(provider);
      return Boolean(clientId && clientSecret);
    });
  }

  async loginWithOAuth(
    provider: OAuthProvider,
    code: string,
  ): Promise<{
    data: ReturnType<AuthService['toPublicUser']>;
    accessToken: string;
    refreshToken: string;
    refreshCookieMaxAge?: number;
  }> {
    const profile = await this.fetchOAuthProfile(provider, code);
    let user = await this.authRepository.findByOAuthAccount(
      provider,
      profile.id,
    );
    if (!user) {
      user = await this.authRepository.findByEmail(profile.email);
      if (user) {
        user = await this.authRepository.update(user.id, {
          oauth_accounts: [
            ...user.oauth_accounts,
            { provider, providerId: profile.id },
          ],
          email_verified_at: user.email_verified_at ?? new Date(),
        });
      } else {
        const name = profile.name.trim().split(/\s+/);
        const username = await this.uniqueUsername(profile.email.split('@')[0]);
        const password = await argon2.hash(randomBytes(32).toString('hex'));
        user = await this.authRepository.create({
          email: profile.email.toLowerCase(),
          username,
          first_name:
            (name[0]?.length ?? 0) >= 2 ? name[0].slice(0, 60) : 'FlashCard',
          last_name: name.slice(1).join(' ').slice(0, 60) || 'User',
          password,
          avatar: profile.avatar,
          email_verified_at: new Date(),
          oauth_accounts: [{ provider, providerId: profile.id }],
        });
      }
    }
    if (!user)
      throw new UnauthorizedException('Không thể liên kết tài khoản OAuth.');
    return this.createSession(user, false);
  }

  getFrontendUrl(): string {
    return (
      this.config.get<string>('app.frontendUrl') ?? 'http://localhost:3010'
    );
  }

  accessTokenCookieOptions() {
    const domain = this.config.get<string>('auth.cookieDomain');
    return {
      httpOnly: true,
      secure: this.config.get<string>('app.environment') === 'production',
      sameSite:
        this.config.get<string>('app.environment') === 'production'
          ? ('none' as const)
          : ('lax' as const),
      path: '/',
      ...(domain ? { domain } : {}),
    };
  }

  refreshTokenCookieOptions() {
    return { ...this.accessTokenCookieOptions(), path: '/api/auth' };
  }

  private async createSession(
    user: AuthUserRecord,
    rememberMe: boolean,
  ): Promise<{
    data: ReturnType<AuthService['toPublicUser']>;
    accessToken: string;
    refreshToken: string;
    refreshCookieMaxAge?: number;
  }> {
    const sid = randomUUID();
    const now = Date.now();
    const durationDays = rememberMe ? 30 : 7;
    const expiresAt = new Date(now + durationDays * 24 * 60 * 60 * 1000);
    const refreshToken = await this.jwtService.signAsync(
      { sub: user.id, sid, ver: user.token_version, type: 'refresh' },
      {
        secret: this.refreshSecret(),
        expiresIn: rememberMe ? '30d' : '7d',
      },
    );
    await this.authRepository.update(user.id, {
      refresh_sessions: [
        ...user.refresh_sessions.filter(
          (session) => session.expiresAt.getTime() > now,
        ),
        {
          id: sid,
          tokenHash: this.hash(refreshToken),
          expiresAt,
          rememberMe,
        },
      ],
    });
    const accessToken = await this.signAccessToken(user, sid);
    return { data: this.toPublicUser(user), accessToken, refreshToken };
  }

  private signAccessToken(user: AuthUserRecord, sid: string): Promise<string> {
    return this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
      sid,
      ver: user.token_version,
    });
  }

  private async uniqueUsername(seed: string): Promise<string> {
    const base =
      seed
        .toLowerCase()
        .replace(/[^a-z0-9_]/g, '')
        .slice(0, 24) || 'learner';
    let username = base;
    let suffix = 0;
    while (await this.authRepository.findByUsername(username)) {
      suffix += 1;
      username = `${base}${suffix}`;
    }
    return username;
  }

  private async fetchOAuthProfile(
    provider: OAuthProvider,
    code: string,
  ): Promise<OAuthProfile> {
    const { clientId, clientSecret } = this.oauthConfig(provider);
    const redirectUri = this.oauthRedirectUri(provider);
    let accessToken: string;
    let profile: OAuthProfile;

    if (provider === 'google') {
      const tokens = await this.fetchJson<{ access_token: string }>(
        'https://oauth2.googleapis.com/token',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code',
          }),
        },
      );
      accessToken = tokens.access_token;
      const data = await this.fetchJson<{
        sub: string;
        email: string;
        email_verified: boolean;
        name: string;
        picture?: string;
      }>('https://openidconnect.googleapis.com/v1/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!data.email_verified)
        throw new UnauthorizedException('Email OAuth chưa được xác minh.');
      profile = {
        id: data.sub,
        email: data.email,
        name: data.name,
        avatar: data.picture,
      };
    } else if (provider === 'github') {
      const tokens = await this.fetchJson<{ access_token: string }>(
        'https://github.com/login/oauth/access_token',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
          }),
        },
      );
      accessToken = tokens.access_token;
      const [data, emails] = await Promise.all([
        this.fetchJson<{
          id: number;
          name: string | null;
          login: string;
          avatar_url: string;
        }>('https://api.github.com/user', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/vnd.github+json',
          },
        }),
        this.fetchJson<
          { email: string; primary: boolean; verified: boolean }[]
        >('https://api.github.com/user/emails', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/vnd.github+json',
          },
        }),
      ]);
      const email = emails.find((item) => item.primary && item.verified)?.email;
      if (!email)
        throw new UnauthorizedException(
          'Tài khoản GitHub cần email chính đã xác minh.',
        );
      profile = {
        id: String(data.id),
        email,
        name: data.name || data.login,
        avatar: data.avatar_url,
      };
    } else {
      const tokens = await this.fetchJson<{ access_token: string }>(
        `https://graph.facebook.com/v20.0/oauth/access_token?${new URLSearchParams(
          {
            code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
          },
        )}`,
      );
      const data = await this.fetchJson<{
        id: string;
        name: string;
        email?: string;
        picture?: { data?: { url?: string } };
      }>(
        `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${encodeURIComponent(tokens.access_token)}`,
      );
      if (!data.email)
        throw new UnauthorizedException(
          'Facebook không cung cấp email cho tài khoản này.',
        );
      profile = {
        id: data.id,
        email: data.email,
        name: data.name,
        avatar: data.picture?.data?.url,
      };
    }
    return profile;
  }

  private async fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
    let response: Response;
    try {
      response = await fetch(url, init);
    } catch {
      throw new UnauthorizedException(
        'Không thể kết nối với nhà cung cấp OAuth.',
      );
    }
    if (!response.ok) {
      throw new UnauthorizedException(
        'Không thể xác thực với nhà cung cấp OAuth.',
      );
    }
    return (await response.json()) as T;
  }

  private oauthConfig(provider: OAuthProvider): {
    clientId: string;
    clientSecret: string;
  } {
    const { clientId, clientSecret } = this.oauthConfigValues(provider);
    if (!clientId || !clientSecret) {
      throw new HttpException(
        {
          code: 'OAUTH_NOT_CONFIGURED',
          message: `OAuth ${provider} chưa được cấu hình.`,
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
    return { clientId, clientSecret };
  }

  private oauthConfigValues(provider: OAuthProvider): {
    clientId: string | undefined;
    clientSecret: string | undefined;
  } {
    const prefix = `oauth.${provider}`;
    const clientId = this.config.get<string>(`${prefix}.clientId`);
    const clientSecret = this.config.get<string>(`${prefix}.clientSecret`);
    return { clientId, clientSecret };
  }

  private oauthRedirectUri(provider: OAuthProvider): string {
    const configured = this.config.get<string>(`oauth.${provider}.callbackUrl`);
    return (
      configured ??
      `${this.config.get<string>('app.apiUrl') ?? 'http://localhost:3000/api'}/oauth/${provider}/callback`
    );
  }

  private refreshSecret(): string {
    return this.config.getOrThrow<string>('jwt.refreshSecret');
  }

  private createVerificationCode(): string {
    return randomInt(0, 1_000_000).toString().padStart(6, '0');
  }

  private createOneTimeToken(): string {
    return randomBytes(32).toString('hex');
  }

  private hash(value: string): string {
    return createHash('sha256').update(value).digest('hex');
  }

  private invalidRefreshToken(): UnauthorizedException {
    return new UnauthorizedException({
      code: 'INVALID_REFRESH_TOKEN',
      message: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
    });
  }

  private authError(
    code: string,
    message: string,
    status: HttpStatus,
  ): HttpException {
    return new HttpException({ code, message }, status);
  }

  private toPublicUser(user: AuthUserRecord) {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      avatar: user.avatar,
      role: user.role,
      email_verified_at: user.email_verified_at,
    };
  }
}
