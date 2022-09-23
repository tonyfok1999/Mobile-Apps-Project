import { Injectable, Logger } from '@nestjs/common';

import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';

@Injectable()
export class ConnectedUserService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async createUser({ socketId: socketId, userId: userId }) {
    try {
      await this.knex('connected_users').insert({ socket_id: socketId, user_id: userId });
      Logger.log(`Created connected user of user id ${userId}`, 'SocketUser');
    } catch {
      Logger.error(`Fail to create connected user of user id ${userId}`, 'SocketUser');
    }
  }

  async getSocketIdByUserId(userId: number) {
    return await this.knex.select('socket_id').from('connected_users').where('user_id', userId);
  }

  async deleteByUserId(userId: number) {
    try{
      await this.knex('connected_users').where('user_id', userId).del();
      Logger.warn(`userId ${userId} is delete from table`, 'ConnectedUser');
    } catch{
      Logger.error('the disconnected user cannot be deleted from connected table')
    }
  }

  async deleteAll() {
    await this.knex.raw('TRUNCATE TABLE connected_users');
    Logger.log(`Connected user table is empty now`, 'SocketUser');
  }
}
