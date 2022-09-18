import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, @InjectKnex() private readonly knex: Knex) {}

  async verifyJwt(jwt: string){
    try{
    const verifiedJwt = this.jwtService.verify(jwt, {secret:'secretKey'})
    Logger.log(`the token is decoded: ${JSON.stringify(verifiedJwt)}`, 'Authorization');
    return verifiedJwt
  }catch{
    return undefined;
  }
  }  

  async generateJwt() {
    const nextUserId= await this.knex.select('last_value').from('users_id_seq')

    const newUser = await this.knex('users')
      .insert({
        email: uuidv4(),
        nickname: `未註冊用戶${(parseInt(nextUserId[0].last_value)+1)}`,
        password: '',
      })
      .returning(['id', 'email']);

    const payload = { id: newUser[0].id, email: newUser[0].email };
    const jwt = this.jwtService.sign(payload, { secret: 'secretKey' });
    return { jwt: jwt, userId: newUser[0].id };
  }
}
