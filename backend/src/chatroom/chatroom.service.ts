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

  async createChatroom(attendees: Attendees){
    const chatroomId = await this.knex.raw(`INSERT INTO chatrooms VALUES (default) RETURNING id;`)
    await this.knex('attendees').insert([{ user_id: attendees.workerId, chatroom_id: chatroomId},{ user_id: attendees.userId, chatroom_id: chatroomId}])
    Logger.log(`A new chatroom ${chatroomId} with worker id ${attendees.workerId} and user id ${attendees.userId} has been created`, 'Chatroom')
  }

  async getAllChatroomsbyUserId(userId: number) {
    
    const chatrooms = await this.knex.raw(`
    SELECT chatrooms.id as chatroomId, chatroom_records.created_at as lastUpdateTime, text, sender_id FROM attendees
    LEFT JOIN chatrooms ON chatrooms.id = attendees.chatroom_id 
    LEFT JOIN (SELECT text, sender_id, chatroom_id, created_at FROM chatroom_records ORDER BY created_at DESC LIMIT 1) as chatroom_records
    ON chatroom_records.chatroom_id = chatrooms.id
    WHERE user_id = ?;
    `, userId)
    
    return chatrooms.rows 
  }

  async getAllUserIdByChatroomId(chatroomId: number){
    const allUserIds = await this.knex.raw(`SELECT user_id from attendees where chatroom_id = 1;`, chatroomId)
    return allUserIds
  }

  async getMessage(chatroomId: number) {
    return await this.knex.raw(`SELECT sender_id, text FROM chatroom_records WHERE chatroom_id = ?`, chatroomId)
  }

  async postMessage(chatroomId: number, message: Message, file?: Express.Multer.File) {
    await this.knex('chatroom_records').insert({ chatroom_id: chatroomId, sender_id: message.senderId, text: message.text, image: file?.filename });
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
