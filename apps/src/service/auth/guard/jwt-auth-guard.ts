import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Reflector } from '@nestjs/core'
import { IS_AUTHENTICATION_KEY, AuthenticationType } from '../../../../shared/decorator/authentication.decorator'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }
  canActivate(context: ExecutionContext) {
    const authenticationType = this.reflector.getAllAndOverride<AuthenticationType | string>(IS_AUTHENTICATION_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (authenticationType === AuthenticationType.PUBLIC) {
      return true
    }

    return super.canActivate(context)
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException()
    }
    return user
  }
}
