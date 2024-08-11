import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Error } from 'src/exception/error';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const result = (await super.canActivate(context)) as boolean;

      if (!result) {
        throw new UnauthorizedException(Error.AUTH.OAUTH_FAILED);
      }

      return result;
    } catch (error) {
      throw new UnauthorizedException(Error.AUTH.GENERAL_OAUTH_FAILED);
    }
  }
}
