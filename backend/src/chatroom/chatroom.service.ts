/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { Chatroom } from './dto/chatroom.dto';
import { Message } from './dto/message.dto';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { Attendees } from './dto/attendees.dto';
import { FileLogger } from 'typeorm';
@Injectable()
export class ChatroomService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async createChatroom(attendees: Attendees, orderId: number){
    try{
      const workerId = attendees.workerId;
    const userId = attendees.userId;
    
    const result = await this.knex.raw(`INSERT INTO chatrooms VALUES (default) RETURNING id;`)
    const chatroomId = result.rows[0].id
    
    // create a new chatroom
    await this.knex('attendees').insert([{ user_id: workerId, chatroom_id: chatroomId},{ user_id: userId, chatroom_id: chatroomId}])
    Logger.log(`A new chatroom ${chatroomId} with worker id ${workerId} and user id ${userId} has been created`, 'ChatroomService')
    
    // update the workers_of_order table for further handling
    // await this.knex('workers_of_order').insert({ user_id: userId, worker_id: workerId, order_id: orderId, chatroom_id: chatroomId})
    await this.knex.raw('INSERT INTO workers_of_order (user_id, worker_id, order_id, chatroom_id) VALUES (?, ?, ?, ?)', [userId, workerId, orderId, chatroomId])
    Logger.log(`A new worker ${workerId} has taken the order id ${orderId} of user id ${userId}`, 'ChatroomService')

    return chatroomId
    }catch{
      Logger.error("chatroom can't be created", 'ChatroomService')
    }
  }

  async getAllChatroomsbyUserId(userId: number) {
    
    const chatrooms = await this.knex.raw(`
    SELECT chatrooms.id as chatroom_id, chatroom_records.created_at as lastUpdateTime, text, sender_id FROM attendees
    LEFT JOIN chatrooms ON chatrooms.id = attendees.chatroom_id 
    LEFT JOIN (SELECT text, sender_id, chatroom_id, created_at FROM chatroom_records ORDER BY created_at DESC LIMIT 1) as chatroom_records
    ON chatroom_records.chatroom_id = chatrooms.id
    WHERE user_id = ?;
    `, userId)
    
    return chatrooms.rows
  }

  async getOneChatroombyUserIds(attendees: Attendees){
    const result = await this.knex.raw(`SELECT chatroom_id FROM workers_of_order WHERE worker_id = ? AND user_id = ?`, [attendees.workerId, attendees.userId])
    // Logger.debug({result: result}, 'ChatroomService')
    return result.rows[0].chatroom_id
  }

  async getAllUserIdByChatroomId(chatroomId: number){
    try{
      Logger.debug(chatroomId, 'ChatroomService')
      const allUserIds = await this.knex.raw(`SELECT attendees.user_id, users.nickname FROM attendees INNER JOIN users ON users.id = attendees.user_id WHERE chatroom_id = ?`, [chatroomId])
      return allUserIds.rows
    }catch{
      Logger.error("the user id cannot be searched", 'ChatroomService')
      return []
    }
  }

  async checkWorkersOfOrder(workerId: number, orderId: number){
    const result = await this.knex.raw('SELECT * FROM workers_of_order WHERE worker_id = ? AND order_id = ?', [workerId, orderId])
    Logger.debug({result: result}, 'ChatroomService')
    return result.rows
  }

  async deleteChat(chatroomId: number){
    await this.knex.raw('DELETE FROM attendees WHERE chatroom_id = ?', [chatroomId])
    await this.knex.raw('DELETE FROM chatroom_records WHERE chatroom_id = ?', [chatroomId])
    await this.knex.raw('DELETE FROM workers_of_order WHERE chatroom_id = ?', [chatroomId])
    await this.knex.raw('DELETE FROM chatrooms WHERE id = ?', [chatroomId])
  }

  async getMessage(chatroomId: number) {
    return await this.knex.raw(`SELECT sender_id, text FROM chatroom_records WHERE chatroom_id = ?`, chatroomId)
  }

  async postMessage(chatroomId: number, message: Message, file?: Express.Multer.File) {
    await this.knex('chatroom_records').insert({ chatroom_id: chatroomId, sender_id: message.sender_id, text: message.text, image: file?.filename });
  }

  findAll() {
    return `This action returns all chatroom`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chatroom`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatroom`;
  }
}
