/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @Post('login')
  login(@Body() user: LoginUserDto) {
    return this.userService.login(user);
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
