import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { Request, Response } from 'express';
import { WorkerAuthService } from './worker-auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('worker-auth')
export class WorkerAuthController {
  constructor(private readonly authService: WorkerAuthService, private readonly userService: UserService) {}

  @Post('register')
  register(@Body() user: CreateUserDto) {
    return this.userService.register(user);
  }
  @Post('webGoogleLogin')
  async webGoogleLogin(@Body() user: CreateUserDto) {
    const logInOrRegister = await this.userService.webGoogleLogin(user);
    if (logInOrRegister.message == 'login') {
      const { access_token } = this.authService.generateJwt(logInOrRegister.user);
      return { access_token: access_token };
    }
    return logInOrRegister;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: Request) {
    const { access_token } = this.authService.generateJwt(request.user as { id: number; email: string; is_worker: boolean });
    return {
      user: {
        id: request.user['id'],
        email: request.user['email'],
        nickname: request.user['nickname'],
        phone: request.user['phone'],
        gender_id: request.user['gender_id'],
        profile_photo: request.user['profile_photo'],
        is_worker: request.user['is_worker'],
        worker_info_id: request.user['worker_info_id'],
        score: request.user['score'],
      },
      access_token: access_token,
    };
  }
}
