import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.cookies && 'token' in req.cookies && req.cookies.user_token.length > 0) {
      console.log(req.cookies);
    }
    console.log('no cookies');

    next();
  }
}
