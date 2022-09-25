/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  findAll() {
    return this.userService.findAll();
  }

  @Get('me')
  findUserById(@Req() req: Request) {
    const id = req.user['id'];
    console.log(id);
    
    return this.userService.findUserById(id);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('checkEmail')
  async checkEmail(@Body() data: { email: string }) {
    let isDuplicate: boolean;
    if ((await this.userService.checkEmail(data)).length == 0) {
      isDuplicate = false;
    } else {
      isDuplicate = true;
    }

    return { isDuplicate: isDuplicate };
  }
}
