import { Injectable } from '@nestjs/common'
import { InjectKnex, Knex } from 'nestjs-knex'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from './dto/login.dto'

@Injectable()
export class UserService {
	constructor(@InjectKnex() private readonly knex: Knex) {}

	async register(createUserDto: CreateUserDto) {
		let result = await this.knex
			.select('email')
			.from('users')
			.where('email', createUserDto.email)

		if (typeof result[0] == 'undefined') {
			const hash = await bcrypt.hash(createUserDto.password, 1)
			console.log(hash)
			await this.knex('users').insert({
				email: createUserDto.email,
				password: hash,
				nickname: createUserDto.nickname,
				phone: createUserDto.phone,
				gender_id: createUserDto.gender_id,
				profile_photo: createUserDto.profile_photo,
				is_worker: createUserDto.is_worker
			})
		} else {
			return 'used email'
		}
		return 'register_user_success'
	}

	async findAll() {
		let result = await this.knex.select('*').from('users')

		return result
	}

	async login(user: LoginUserDto) {
		let result = await this.knex
			.select('password')
			.from('users')
			.where('email', user.email)

		if (typeof result[0] != 'undefined') {
			const isMatch = await bcrypt.compare(
				user.password,
				result[0].password
			)

			return { loginState: isMatch }
		}

		return { loginState: false }
	}

	async getUserById(id: number) {
		let result = await this.knex
			.select([
				'id',
				'email',
				'nickname',
				'phone',
				'gender_id',
				'profile_photo',
				'is_worker',
				'worker_info_id',
				'score'
			])
			.from('users')
			.where('id', id)

		return result
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`
	}

	remove(id: number) {
		return `This action removes a #${id} user`
	}
}
