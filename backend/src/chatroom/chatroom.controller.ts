import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseInterceptors, UploadedFile, ParseIntPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { ChatroomService } from './chatroom.service';
import { CreateChatroomDto } from './dto/create-chatroom.dto';
import { UpdateChatroomDto } from './dto/update-chatroom.dto';
import { Message } from './dto/message.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { get } from 'http';
import console from 'console';

@Controller('/chatroom')
export class ChatroomController {
  constructor(private readonly chatroomService: ChatroomService) {}

  @Get('/:chatroomId/message')
  async getMessage(@Param('chatroomId', ParseIntPipe) chatroomId: number) {
    
    if (typeof(chatroomId) !== 'number') {
      throw new HttpException('chatroom_id need to be a number', HttpStatus.NOT_FOUND);
    }

    try {
      const result= await this.chatroomService.getMessage(chatroomId);

      console.log('result')

      if (result.rowCount === 0) {
        throw new HttpException('chatroom_id is out of range', HttpStatus.NOT_FOUND);
      }

      return result.rows
    } catch {
      throw new HttpException('message cannot be found', HttpStatus.BAD_REQUEST);;
    }
  }

  @Post('/:chatroomId/message')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './uploads',
    })
  )
  async postMessage(@Param('chatroomId', ParseIntPipe) chatroomId: number, @Body() message: Message, @UploadedFile() file?:Express.Multer.File) {

    if (chatroomId === undefined || message.sender_id === undefined) {
      throw new HttpException('sender_id and chatroom_id are required', HttpStatus.NOT_FOUND);
    } else if (message.text === undefined || message.text === '' && file === undefined) {
      throw new HttpException('both message and file are missing', HttpStatus.NOT_FOUND);
    }

    try {
      await this.chatroomService.postMessage(chatroomId, message, file);
      return {'message': 'message is posted'}
    } catch {
      throw new HttpException('message cannot be posted', HttpStatus.BAD_REQUEST);;
    }
  }

  // @Get()
  // findAll(@Req() req: Request, @Res() res: Response) {
  //   req.params;
  //   req.header;
  //   res.send;
  //   return this.chatroomService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.chatroomService.findOne(+id);
  // }

  // @Get(':id')
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.chatroomService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateChatroomDto: UpdateChatroomDto) {
  //   return this.chatroomService.update(+id, updateChatroomDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.chatroomService.remove(+id);
}
