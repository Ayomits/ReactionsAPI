import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/app/v1/user/user.service';
import { ForbiddenException } from 'src/exceptions/forbidden';
import { UnauthorizedException } from 'src/exceptions/unauthorized';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRole = this.reflector.get<string>(
      'role',
      context.getHandler(),
    );

    if (!requiredRole) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const user = await this.userService.findUserById(req.uid);

    if (!user) throw new UnauthorizedException();

    if (!user.roles.find((r) => r.name === requiredRole))
      throw new ForbiddenException();

    return true;
  }
}

export const RequireRole = (role: string) => SetMetadata('role', role);
