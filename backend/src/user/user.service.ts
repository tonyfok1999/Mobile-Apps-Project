/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login.dto';
// import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(@InjectKnex() private readonly knex: Knex /*, private authenticationService: AuthService*/) {}

  async register(user: CreateUserDto) {
    let result = await this.knex.select('email').from('users').where('email', user.email);

    let gender_id: number | null;
    user.gender_id == undefined ? (gender_id = null) : (gender_id = user.gender_id);

    let profile_photo: string | null;
    user.profile_photo == undefined ? (profile_photo = null) : (profile_photo = user.profile_photo);

    if (typeof result[0] == 'undefined') {
      const hash = await bcrypt.hash(user.password, 1);
      let workerId = await this.knex('users')
        .insert({
          email: user.email,
          password: hash,
          nickname: user.nickname,
          phone: user.phone,
          gender_id: gender_id,
          profile_photo: profile_photo,
          is_worker: true,
        })
        .returning('id');

      for (let subtype_id of user.workerSubtypeId) {
        await this.knex('worker_service_subtypes').insert({
          worker_id: workerId[0].id,
          subtype_id: subtype_id,
        });
      }
    } else {
      return { message: 'used email' };
    }
    return { message: 'register_success' };
  }

  async webGoogleLogin(user: CreateUserDto) {
    let result = await this.knex.select('*').from('users').where('email', user.email);

    if (typeof result[0] == 'undefined') {
      return { message: 'register' };
    } else return { message: 'login', user: { id: parseInt(result[0].id), email: result[0].email, is_worker: true } };
  }

  async findAll() {
    let result = await this.knex.select(['id', 'email', 'nickname', 'phone', 'gender_id', 'profile_photo', 'is_worker', 'worker_info_id', 'score']).from('users');
    return result;
  }

  async login(user: LoginUserDto) {
    let result = await this.knex.select('password').from('users').where('email', user.email);

    if (typeof result[0] != 'undefined') {
      const isMatch = await bcrypt.compare(user.password, result[0].password);

      return { loginState: isMatch };
    }

    return { loginState: false };
  }

  async getUserById(id: number) {
    try {
      let result = await this.knex.select(['id', 'email', 'nickname', 'phone', 'gender_id', 'profile_photo', 'is_worker', 'worker_info_id', 'score']).from('users').where('id', id);
      return result;
    } catch {
      Logger.error(`the searched user id ${id} does not exist`, 'UserService');
      return [];
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async checkEmail(data: { email: string }) {
    let result = await this.knex.select('email').from('users').where('email', data.email);

    return result;
  }

  async findUser(email: string) {
    let result = await this.knex.select('*').from('users').where('email', email);

    return result;
  }

  async findUserById(id: string) {
    let result = await this.knex.select(['id', 'email', 'nickname', 'phone', 'gender_id', 'profile_photo', 'is_worker', 'worker_info_id', 'score']).from('users').where('id', id);

    return result;
  }

  async getNicknameById(userId: number) {
    const result = await this.knex.raw(
      `select nickname from users where id =?`, userId
    );

    return result.rows
  }

  async findAllByNickname(nickname: string) {
    try {
      const result = await this.knex.raw(
        `select id, email, nickname, phone, gender_id, profile_photo, is_worker, worker_info_id, score from users where nickname Like '%${nickname}%'`
      );
      return result.rows;
    } catch {
      return undefined;
    }
  }
}
