import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ROLES_KEY } from '../decorators/role.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    console.log('1. Guard bắt đầu');

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const role = this.reflector.get<string>(ROLES_KEY, context.getHandler());

    console.log(ROLES_KEY, role);

    console.log('2. Guard đọc metadata:', isPublic);

    if (isPublic) {
      console.log('3. Public → cho phép');
      return true;
    }

    console.log('3. Không public → cần authentication');

    return false;
  }
}
