import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, @InjectKnex() private readonly knex: Knex) {}

  async verifyJwt(jwt: string) {
    try {
      const verifiedJwt = this.jwtService.verify(jwt, { secret: 'secretKey' });
      return verifiedJwt;
    } catch {
      return undefined;
    }
  }

  async generateJwt() {
    const newUser = await this.knex('users')
      .insert({
        email: uuidv4(),
        password: '',
      })
      .returning(['id', 'email']);

    const payload = { id: newUser[0].id, email: newUser[0].email };
    const jwt = this.jwtService.sign(payload, { secret: 'secretKey' });
    return { jwt: jwt, userId: newUser[0].id };
  }
}
