import { Injectable, Logger, NestMiddleware, UseGuards } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';
import { InjectKnex, Knex } from 'nestjs-knex';
import { nextTick } from 'process';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import '../models';

@Injectable()
export class AllUserJwtMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  async use(req: Request, res: Response, next: NextFunction) {
    Logger.log('inside alluserjwt middleware', 'Middleware');
    const { authorization } = req.headers;
    console.log(authorization);

    // check if the token exists
    if (!authorization) {
      const { jwt, userId } = await this.authService.generateJwt();
      Logger.log(`the new user has been assigned to new token: ${jwt}`, 'Middleware');
      req.user = { id: '' + userId };
      res.json({ Authorization: jwt });
      next();
    } else {
      const payload = await this.authService.verifyJwt(authorization.slice(7, authorization.length));
      Logger.log(payload);
      Logger.log('the user has token already', 'Middleware');
      try {
        req.user = { id: '' + payload.id };
      } catch (error) {
        Logger.log('nothing in the payload', 'Middleware');
      }
      next();
    }
  }
}
