import {
  Controller,
  Get,
  Post,
  Param,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  Query,
  Logger,
} from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { UserService } from 'src/user/user.service';
import { Attendees } from './dto/attendees.dto';

@Controller('chatroom')
export class ChatroomController {
  constructor(private readonly chatroomService: ChatroomService, private readonly userService: UserService) {}

  @Get('/:userId')
  async getAllChatrooms(@Param('userId', ParseIntPipe) userId: number) {
    if (typeof userId !== 'number') {
      throw new HttpException('user_id need to be a number', HttpStatus.BAD_REQUEST);
    }

    try {
      const result = await this.chatroomService.getAllChatroomsbyUserId(userId);

      for(let i = 0; i < result.length; i++) {
      const attendees = await this.chatroomService.getAllUserIdByChatroomId(result[i].chatroom_id)
      
      result[i]['attendees'] = attendees
      }

      return result;
    } catch {
      throw new HttpException('chatrooms cannot be found', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/orderChatroom')
  async createChatroom(@Query() query: { orderId: string; userId: string; workerId: string }) {
    const orderId = parseInt(query.orderId)
    const userId = parseInt(query.userId)
    const workerId = parseInt(query.workerId)

    if (typeof(orderId) !== 'number' || typeof(userId) !== 'number' || typeof(workerId) !== 'number') {
      throw new HttpException('query params need to be a number', HttpStatus.NOT_FOUND);
    }

    try {
      const result = await this.chatroomService.checkWorkersOfOrder(workerId, userId); 
      Logger.debug({result: result}, 'ChatroomController//createChatroom')
      const attendees: Attendees = { workerId: workerId, userId: userId };
      if (result.length > 0) {
        const chatroomId = await this.chatroomService.getOneChatroombyUserIds(attendees);
        Logger.warn(`chat id ${chatroomId} has been created before`,'ChatroomController//createChatroom')
        return  { chatroomId: chatroomId, isNew: false }
      } else {
        const chatroomId = await this.chatroomService.createChatroom(attendees, orderId);
        Logger.log(`chatroom id ${chatroomId}has been created`,'ChatroomController//createChatroom')
        return { chatroomId: chatroomId, isNew: true };
      }
    } catch {
      throw new HttpException("chatroom can't be created", HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:chatroomId/message')
  async getMessage(@Param('chatroomId', ParseIntPipe) chatroomId: number) {
    if (typeof chatroomId !== 'number') {
      throw new HttpException('chatroom_id need to be a number', HttpStatus.NOT_FOUND);
    }

    try {
      const result = await this.chatroomService.getMessage(chatroomId);

      return result.rows;
    } catch {
      throw new HttpException('message cannot be found', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/find-by-nickname')
  async findAllByNickname(@Query() query: { nickname: string }) {
    const nickname = query.nickname;
    const user = await this.userService.findAllByNickname(nickname);
    Logger.debug(`searched user ${JSON.stringify(user)}`, 'ChatroomService');
    if ((user.length = 0)) {
      throw new HttpException('user cannot be found', HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}
