import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { WorkerAuthService } from '../worker-auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly workerAuthService: WorkerAuthService) {
    super();
  }

  async validate(email: string, password: string) {
    const user = await this.workerAuthService.validateUser(email, password);
    if (!user[0]) {
      throw new UnauthorizedException();
    }
    return user[0];
  }
}
