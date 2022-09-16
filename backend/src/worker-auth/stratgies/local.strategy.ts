import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { WorkerAuthService } from '../worker-auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly workerAuthService: WorkerAuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(email: string, password: string) {
    const user = await this.workerAuthService.validateUser(email, password);
    if (user.length == 0) {
      throw new UnauthorizedException('incorrect email or password');
    }
    return user[0];
  }
}
