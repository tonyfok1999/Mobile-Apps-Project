/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { Message } from './dto/message.dto';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { Attendees } from './dto/attendees.dto';
@Injectable()
export class ChatroomService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async createChatroom(attendees: Attendees, orderId: number) {
    const txn = await this.knex.transaction();
    try {
      const workerId = attendees.workerId;
      const userId = attendees.userId;

      const result: Array<{ id: number }> = await txn('chatrooms').returning('id').insert([{}])
      const chatroomId = result[0].id;

      // create a new chatroom
      await txn('attendees').insert([
        { user_id: workerId, chatroom_id: chatroomId },
        { user_id: userId, chatroom_id: chatroomId },
      ]);
      Logger.log(`A new chatroom ${chatroomId} with worker id ${workerId} and user id ${userId} has been created`, 'ChatroomService//createChatroom');

      // update the workers_of_order table for further handling
      await txn('workers_of_order').insert([{ user_id: userId, worker_id: workerId, order_id: orderId, chatroom_id: chatroomId}])
      Logger.log(`A new worker ${workerId} has taken the order id ${orderId} of user id ${userId}`, 'ChatroomService//createChatroom');
      
      await txn.commit();

      return chatroomId;
    } catch {
      await txn.rollback();
      Logger.error("chatroom can't be created", 'ChatroomService//createChatroom');
    }
  }

  async getSpecificChatroombyUserId(chatroomId: number, userId: number) {
    const chatroom = await this.knex.raw(
      `
    SELECT chatrooms.id as chatroom_id, chatroom_records.created_at as lastUpdateTime, text, sender_id, is_favourite FROM attendees
    LEFT JOIN chatrooms ON chatrooms.id = attendees.chatroom_id 
    LEFT JOIN (SELECT text, sender_id, chatroom_id, created_at FROM chatroom_records ORDER BY created_at DESC LIMIT 1) as chatroom_records
    ON chatroom_records.chatroom_id = chatrooms.id
    WHERE (chatrooms.id = ? AND attendees.user_id = ?);
    `,
      [chatroomId, userId]
    );

    return chatroom.rows;
  }

  async getAllChatroomsbyUserId(userId: number) {
    Logger.debug(`use ID ${userId} getting all chatrooms`, 'ChatroomService//getAllChatroomsbyUserId');
    const result = await this.knex.raw(
      `
    SELECT chatrooms.id as chatroom_id, array_agg(chatroom_records.created_at ORDER BY chatroom_records.created_at DESC) as lastUpdateTime, array_agg(text ORDER BY chatroom_records.created_at DESC) as text, array_agg(sender_id ORDER BY chatroom_records.created_at DESC) as sender_id, array_agg(is_favourite ORDER BY chatroom_records.created_at DESC) as is_favourite FROM attendees
    LEFT JOIN chatrooms ON chatrooms.id = attendees.chatroom_id 
    LEFT JOIN chatroom_records ON chatroom_records.chatroom_id = chatrooms.id 
    WHERE user_id = ? GROUP BY chatrooms.id ORDER BY lastUpdateTime DESC;
    `,
      userId
    );

    const chatrooms = result.rows;

    const newChatrooms: any = [];

    for (let i = 0; i < chatrooms.length; i++) {
      // Get the latest msg of each room
      const chatroom = { chatroom_id: 1, lastUpdateTime: '', text: '', sender_id: 0, is_favourite: false };
      chatroom['chatroom_id'] = chatrooms[i].chatroom_id;
      chatroom['lastUpdateTime'] = chatrooms[i].lastupdatetime[0];
      chatroom['text'] = chatrooms[i].text[0];
      chatroom['sender_id'] = chatrooms[i].sender_id[0];
      chatroom['is_favourite'] = chatrooms[i].is_favourite[0];
      console.log({ chatroom: chatroom });
      newChatrooms.push(chatroom);
    }

    Logger.debug(`Chatrooms: ${JSON.stringify(newChatrooms)}`, 'ChatroomService//getAllChatroomsbyUserId');

    return newChatrooms;
  }

  async getOneChatroombyUserIds(attendees: Attendees) {
    const result = await this.knex.raw(`SELECT chatroom_id FROM workers_of_order WHERE worker_id = ? AND user_id = ? LIMIT 1`, [attendees.workerId, attendees.userId]);
    return result.rows[0].chatroom_id;
  }

  async getAllUserIdByChatroomId(chatroomId: number) {
    try {
      Logger.debug(chatroomId, 'ChatroomService//getAllUserIdByChatroomId');
      const allUserIds = await this.knex.raw(`SELECT attendees.user_id, users.nickname FROM attendees INNER JOIN users ON users.id = attendees.user_id WHERE chatroom_id = ?`, [
        chatroomId,
      ]);
      return allUserIds.rows;
    } catch {
      Logger.error('the user id cannot be searched', 'ChatroomService//getAllUserIdByChatroomId');
      return [];
    }
  }

  async checkWorkersOfOrder(workerId: number, userId: number) {
    const result = await this.knex.raw('SELECT * FROM workers_of_order WHERE worker_id = ? AND user_id = ?', [workerId, userId]);
    Logger.debug({ result: result }, 'ChatroomService//checkWorkersOfOrder');
    return result.rows;
  }

  async deleteChat(chatroomId: number) {
    const txn = await this.knex.transaction();
    try {
      await txn('attendees').where('chatroom_id', chatroomId).del();
      await txn('chatroom_records').where('chatroom_id', chatroomId).del();
      await txn('workers_of_order').where('chatroom_id', chatroomId).del();
      await txn('chatrooms').where('id', chatroomId).del();

      await txn.commit();
    } catch {
      await txn.rollback();
    }
  }

  async bookmarkChat(chatroomId: number, userId: number) {
    await this.knex.raw('UPDATE attendees SET is_favourite = NOT is_favourite WHERE (chatroom_id = ? AND user_id = ?)', [chatroomId, userId]);
    Logger.debug('bookmarked', 'ChatroomService//bookmarkChat');
  }

  async getMessage(chatroomId: number) {
    return await this.knex.raw(`SELECT sender_id, text FROM chatroom_records WHERE chatroom_id = ? ORDER BY created_at ASC`, chatroomId);
  }

  async postMessage(message: Message) {
    await this.knex('chatroom_records').insert({ chatroom_id: message.chatroom_id, sender_id: message.sender_id, text: message.text });
  }
}
