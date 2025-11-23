import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TokensService } from 'src/app/v1/tokens/tokens.service';
import { UnauthorizedException } from 'src/exceptions/unauthorized';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokensService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const headers = req.headers;

    const authorization = headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('Header authorization is not provided');
    }

    const [type_, token] = authorization.split(' ');

    if (type_ !== 'Bearer' || !token) {
      throw new UnauthorizedException('Token not provided');
    }

    const access = await this.tokenService.verifyAccess(token);

    if (!access) {
      throw new UnauthorizedException('Invalid token provided');
    }

    const payload = this.tokenService.decodeToken(token);

    req.uid = payload.uid;

    return true;
  }
}
