import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';

import { ROLES_KEY } from '@/common/decorators/role.decorator';
import { UserRole } from '@/common/shares/enums';
import { AuthService } from './auth.service';

type AccessClaims = {
  sub: string;
  email: string;
  role: UserRole;
  sid: string;
  ver: number;
};

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: AccessClaims }>();
    const token =
      this.getBearerToken(request) ?? this.getCookie(request, 'access_token');
    if (!token)
      throw new UnauthorizedException('Vui lòng đăng nhập để tiếp tục.');

    let claims: AccessClaims;
    try {
      claims = await this.jwt.verifyAsync<AccessClaims>(token);
    } catch {
      throw new UnauthorizedException(
        'Phiên đăng nhập không hợp lệ hoặc đã hết hạn.',
      );
    }

    const user = await this.authService.validateAccessClaims(claims);
    if (!user)
      throw new UnauthorizedException('Phiên đăng nhập đã bị thu hồi.');

    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (requiredRoles?.length && !requiredRoles.includes(user.role)) {
      throw new ForbiddenException(
        'Bạn không có quyền thực hiện thao tác này.',
      );
    }

    request.user = claims;
    return true;
  }

  private getBearerToken(request: Request): string | undefined {
    const authorization = request.headers.authorization;
    if (!authorization?.startsWith('Bearer ')) return undefined;
    return authorization.slice('Bearer '.length);
  }

  private getCookie(request: Request, name: string): string | undefined {
    const cookieHeader = request.headers.cookie;
    if (!cookieHeader) return undefined;
    const value = cookieHeader
      .split(';')
      .map((item) => item.trim())
      .find((item) => item.startsWith(`${name}=`))
      ?.slice(name.length + 1);
    return value ? decodeURIComponent(value) : undefined;
  }
}
