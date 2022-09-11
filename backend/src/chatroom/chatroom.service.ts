/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateChatroomDto } from './dto/create-chatroom.dto';
import { UpdateChatroomDto } from './dto/update-chatroom.dto';
import { Message } from './dto/message.dto';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
@Injectable()
export class ChatroomService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async getMessage(chatroomId: number) {
    return await this.knex.raw('select sender_id, text from chatroom_records where chatroom_id = ?', chatroomId)
  }

  async postMessage(chatroomId: number, message: Message, file?: Express.Multer.File) {
    await this.knex('chatroom_records').insert({ chatroom_id: chatroomId, sender_id: message.sender_id, text: message.text, image: file?.filename });
  }

  create(createChatroomDto: CreateChatroomDto) {
    return 'This action adds a new chatroom';
  }

  findAll() {
    return `This action returns all chatroom`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chatroom`;
  }

  update(id: number, updateChatroomDto: UpdateChatroomDto) {
    return `This action updates a #${id} chatroom`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatroom`;
  }
}
