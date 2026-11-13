import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import type { Request, Response } from 'express';

import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { EmailDto, ResetPasswordDto, TokenDto } from './dto/request/token.dto';
import { LoginDto } from './dto/request/login.dto';
import { RegisterDto } from './dto/request/register.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

const ACCESS_COOKIE = 'access_token';
const REFRESH_COOKIE = 'refresh_token';
const OAUTH_STATE_COOKIE_PREFIX = 'oauth_state';
type OAuthProvider = 'google' | 'facebook' | 'github';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {}

  @Post('auth/register')
  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @ApiOperation({ summary: 'Đăng ký và gửi liên kết xác minh email ' })
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('auth/login')
  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @ApiOperation({ summary: 'Sign in and set httpOnly session cookies' })
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.login(
      dto.email,
      dto.password,
      dto.rememberMe ?? false,
    );
    this.setSessionCookies(
      response,
      result.accessToken,
      result.refreshToken,
      result.refreshCookieMaxAge,
    );
    return { data: result.data, message: 'Đăng nhập thành công.' };
  }

  @Post('auth/refresh')
  @ApiOperation({ summary: 'Rotate the refresh token cookie' })
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    this.assertTrustedOrigin(request);
    const result = await this.authService.refresh(
      this.readCookie(request, REFRESH_COOKIE),
    );
    this.setSessionCookies(
      response,
      result.accessToken,
      result.refreshToken,
      result.refreshCookieMaxAge,
    );
    return { data: result.data, message: 'Phiên đăng nhập đã được làm mới.' };
  }

  @Post('auth/logout')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Revoke the current session' })
  async logout(
    @CurrentUser() user: { sub: string },
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    this.assertTrustedOrigin(request);
    const result = await this.authService.logout(
      user.sub,
      this.readCookie(request, REFRESH_COOKIE),
    );
    response.clearCookie(
      ACCESS_COOKIE,
      this.authService.accessTokenCookieOptions(),
    );
    response.clearCookie(
      REFRESH_COOKIE,
      this.authService.refreshTokenCookieOptions(),
    );
    return result;
  }

  @Get('auth/me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get the authenticated user profile' })
  me(@CurrentUser() user: { sub: string }) {
    return this.authService.getProfile(user.sub);
  }

  @Post('auth/verify-email')
  @ApiOperation({ summary: 'Verify an email address with a one-time token' })
  verifyEmail(@Body() dto: TokenDto) {
    return this.authService.verifyEmail(dto.token);
  }

  @Post('auth/resend-verification')
  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 3, ttl: 60_000 } })
  @ApiOperation({ summary: 'Resend an email verification link' })
  resendVerification(@Body() dto: EmailDto) {
    return this.authService.resendVerification(dto.email);
  }

  @Post('auth/forgot-password')
  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 3, ttl: 60_000 } })
  @ApiOperation({ summary: 'Send a password reset link when the email exists' })
  forgotPassword(@Body() dto: EmailDto) {
    return this.authService.requestPasswordReset(dto.email);
  }

  @Post('auth/reset-password')
  @ApiOperation({ summary: 'Reset a password with a one-time token' })
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(
      dto.token,
      dto.password,
      dto.re_password,
    );
  }

  @Get('auth/oauth/providers')
  @ApiOperation({ summary: 'List configured OAuth providers' })
  oauthProviders() {
    return { data: this.authService.getConfiguredOAuthProviders() };
  }

  @Get('oauth/:provider')
  startOAuth(@Req() request: Request, @Res() response: Response): void {
    const rawProvider = request.params.provider;
    const provider = this.parseProvider(
      Array.isArray(rawProvider) ? (rawProvider[0] ?? '') : rawProvider,
    );
    const state = this.authService.createOAuthState();
    response.cookie(`${OAUTH_STATE_COOKIE_PREFIX}_${provider}`, state, {
      ...this.authService.accessTokenCookieOptions(),
      path: `/api/oauth/${provider}`,
      maxAge: 10 * 60 * 1000,
    });
    response.redirect(
      this.authService.getOAuthAuthorizationUrl(provider, state),
    );
  }

  @Get('oauth/:provider/callback')
  async completeOAuth(
    @Req() request: Request,
    @Res() response: Response,
    @Query('code') code?: string,
    @Query('state') state?: string,
    @Query('error') providerError?: string,
  ): Promise<void> {
    const rawProvider = request.params.provider;
    const provider = this.parseProvider(
      Array.isArray(rawProvider) ? (rawProvider[0] ?? '') : rawProvider,
    );
    const stateCookieName = `${OAUTH_STATE_COOKIE_PREFIX}_${provider}`;
    const stateCookie = this.readCookie(request, stateCookieName);
    response.clearCookie(stateCookieName, {
      ...this.authService.accessTokenCookieOptions(),
      path: `/api/oauth/${provider}`,
    });

    if (
      !state ||
      !stateCookie ||
      state !== stateCookie ||
      providerError ||
      !code
    ) {
      response.redirect(this.oauthResultUrl('error'));
      return;
    }

    try {
      const result = await this.authService.loginWithOAuth(provider, code);
      this.setSessionCookies(
        response,
        result.accessToken,
        result.refreshToken,
        result.refreshCookieMaxAge,
      );
      response.redirect(this.oauthResultUrl('success'));
    } catch (error) {
      if (error instanceof HttpException) {
        response.redirect(this.oauthResultUrl('error'));
        return;
      }
      throw error;
    }
  }

  private setSessionCookies(
    response: Response,
    accessToken: string,
    refreshToken: string,
    refreshCookieMaxAge?: number,
  ) {
    const rememberCookie = this.authService.refreshTokenCookieOptions();
    response.cookie(ACCESS_COOKIE, accessToken, {
      ...this.authService.accessTokenCookieOptions(),
      maxAge: 15 * 60 * 1000,
    });
    response.cookie(
      REFRESH_COOKIE,
      refreshToken,
      refreshCookieMaxAge === undefined
        ? rememberCookie
        : { ...rememberCookie, maxAge: refreshCookieMaxAge },
    );
  }

  private readCookie(request: Request, name: string): string | undefined {
    const cookieHeader = request.headers.cookie;
    if (!cookieHeader) return undefined;
    const value = cookieHeader
      .split(';')
      .map((item) => item.trim())
      .find((item) => item.startsWith(`${name}=`))
      ?.slice(name.length + 1);
    return value ? decodeURIComponent(value) : undefined;
  }

  private parseProvider(value: string): OAuthProvider {
    if (value === 'google' || value === 'facebook' || value === 'github') {
      return value;
    }
    throw new HttpException(
      {
        code: 'UNSUPPORTED_OAUTH_PROVIDER',
        message: 'Nhà cung cấp OAuth không hỗ trợ.',
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  private oauthResultUrl(status: 'success' | 'error'): string {
    const url = new URL('/auth/callback', this.authService.getFrontendUrl());
    url.searchParams.set('status', status);
    return url.toString();
  }

  private assertTrustedOrigin(request: Request): void {
    const origin = request.headers.origin;
    const trustedOrigin = new URL(
      this.config.get<string>('app.frontendUrl') ?? 'http://localhost:3010',
    ).origin;
    if (origin && origin !== trustedOrigin) {
      throw new HttpException(
        { code: 'UNTRUSTED_ORIGIN', message: 'Nguồn yêu cầu không được phép.' },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
