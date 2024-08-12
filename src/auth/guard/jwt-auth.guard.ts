import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Error } from 'src/exception/error';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    if (!authorization) {
      throw new UnauthorizedException(Error.AUTH.NO_TOKEN);
    }

    const token = authorization.replace('Bearer ', '');
    const tokenValidate = this.authService.validateToken(token);
    request.user = tokenValidate.user || tokenValidate;

    return true;
  }
}
