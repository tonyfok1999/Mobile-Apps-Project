import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WorkerAuthService {
  constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

  async validateUser(email: string, password: string) {
    let user = await this.userService.findUser(email);
    if (user.length == 0) {
      return (user = []);
    }

    const isSamePassword = await bcrypt.compare(password, user[0].password);

    // console.log(user[0], isSamePassword);
    if (!user[0] || !isSamePassword) {
      return (user = []);
    }
    return user;
  }

  generateJwt(user: { id: number; email: string }) {
    const { id, email } = user;
    const payload = { id, email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
