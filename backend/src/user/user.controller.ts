import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ParseIntPipe
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { LoginUserDto } from './dto/login.dto'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('/register_user')
	register(@Body() createUserDto: CreateUserDto) {
		return this.userService.register(createUserDto)
	}

	@Get('/findUser')
	findAll() {
		return this.userService.findAll()
	}

	@Get('/find_user_byid')
	findOne(@Param('id', ParseIntPipe) id: string) {
		return this.userService.findOne(+id)
	}

	@Post('/login')
	login(@Body() loginUserDto: LoginUserDto) {
		return this.userService.login(loginUserDto)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(+id, updateUserDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.userService.remove(+id)
	}
}
