import { Module } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { ChatroomController } from './chatroom.controller';
import { MyWebSocket } from 'src/chatroom/websocketgateway';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { WebsocketModule } from 'src/websocket/websocket.module';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [ChatroomController],
  providers: [ChatroomService, MyWebSocket]
})
export class ChatroomModule {}
