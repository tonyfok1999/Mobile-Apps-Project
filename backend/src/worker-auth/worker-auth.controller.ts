import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { Request } from 'express';
import { WorkerAuthService } from './worker-auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('worker-auth')
export class WorkerAuthController {
  constructor(private readonly authService: WorkerAuthService, private readonly userService: UserService) {}

  @Post('register')
  register(@Body() user: CreateUserDto) {
    return this.userService.register(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: Request) {
    return this.authService.generateJwt(request.user as { id: number; email: string });
  }
}
