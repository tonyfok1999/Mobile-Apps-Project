import { Module } from '@nestjs/common';
import { WebsocketService } from './notinuse/websocket.service';
import { WebsocketController } from './notinuse/websocket.controller';
import { MyWebSocket } from '../chatroom/websocketgateway';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { ChatroomModule } from 'src/chatroom/chatroom.module';

@Module({
  imports: [AuthModule, UserModule, ChatroomModule],
  controllers: [],
  providers: [MyWebSocket]
})
export class WebsocketModule {}
